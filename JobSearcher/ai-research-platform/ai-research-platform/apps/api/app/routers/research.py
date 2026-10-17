import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.agents.planner import plan
from app.agents.research_synthesis import research, synthesize
from app.core.database import get_db
from app.core.deps import get_current_user
from app.llm.gemini_provider import get_llm_provider
from app.models.models import AgentExecution, ResearchSession, Source, User
from app.schemas.schemas import ResearchCreate, ResearchOut, SourceOut

router = APIRouter(prefix="/api/research", tags=["research"])


def _log_execution(db: Session, session_id, agent_name: str, status: str, output_summary: str = ""):
    db.add(
        AgentExecution(
            session_id=session_id,
            agent_name=agent_name,
            status=status,
            finished_at=datetime.now(timezone.utc),
            output_summary=output_summary[:500],
        )
    )
    db.commit()


@router.post("", response_model=ResearchOut, status_code=201)
def create_research(
    payload: ResearchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Phase 1: synchronous Planner -> Research -> Synthesis chain, no
    Critic/Verification loop yet. See docs/architecture.md §4 for the
    full state machine this will grow into.
    """
    session = ResearchSession(user_id=current_user.id, query=payload.query, status="PLANNING")
    db.add(session)
    db.commit()
    db.refresh(session)

    llm = get_llm_provider()

    try:
        plan_result = plan(llm, payload.query)
        _log_execution(db, session.id, "planner", "COMPLETED", str(plan_result))

        session.status = "RESEARCHING"
        db.commit()
        chunks = research(db, llm, current_user.id, payload.query)
        for chunk in chunks:
            db.add(Source(session_id=session.id, document_id=chunk.document_id, chunk_id=chunk.id))
        db.commit()
        _log_execution(db, session.id, "research_agent", "COMPLETED", f"retrieved {len(chunks)} chunks")

        session.status = "SYNTHESIZING"
        db.commit()
        answer = synthesize(llm, payload.query, chunks)
        _log_execution(db, session.id, "synthesis_agent", "COMPLETED", answer)

        session.status = "COMPLETED"
        session.answer = answer
        session.completed_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(session)
        return session

    except Exception as e:
        session.status = "FAILED"
        db.commit()
        _log_execution(db, session.id, "orchestrator", "FAILED", str(e))
        raise HTTPException(status_code=500, detail=f"Research session failed: {e}") from e


@router.get("/{session_id}", response_model=ResearchOut)
def get_research(session_id: uuid.UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.get(ResearchSession, session_id)
    if not session or session.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Research session not found")
    return session


@router.get("/{session_id}/sources", response_model=list[SourceOut])
def get_sources(session_id: uuid.UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    session = db.get(ResearchSession, session_id)
    if not session or session.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Research session not found")

    results = []
    for s in session.sources:
        out = SourceOut.model_validate(s)
        out.snippet = s.chunk_id and s.document_id and None  # placeholder; join chunk content if needed
        results.append(out)
    return results
