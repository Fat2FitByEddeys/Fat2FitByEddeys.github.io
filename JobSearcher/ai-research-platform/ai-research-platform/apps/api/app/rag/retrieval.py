from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.llm.base import LLMProvider
from app.models.models import DocumentChunk


def retrieve_relevant_chunks(
    db: Session, llm: LLMProvider, user_id, query: str, top_k: int | None = None
) -> list[DocumentChunk]:
    """
    Phase 1 retrieval: pure vector cosine similarity, scoped to the user's own
    documents. Hybrid (FTS + vector) and reranking are Phase 2 additions —
    see docs/architecture.md §5 for why they're deferred.
    """
    k = top_k or settings.retrieval_top_k
    query_embedding = llm.embed(query)

    stmt = (
        select(DocumentChunk)
        .join(DocumentChunk.document)
        .where(DocumentChunk.document.has(user_id=user_id))
        .order_by(DocumentChunk.embedding.cosine_distance(query_embedding))
        .limit(k)
    )
    return list(db.execute(stmt).scalars().all())
