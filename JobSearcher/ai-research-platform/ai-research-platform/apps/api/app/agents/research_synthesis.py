from sqlalchemy.orm import Session

from app.llm.base import LLMProvider
from app.models.models import DocumentChunk
from app.rag.retrieval import retrieve_relevant_chunks

SYNTHESIS_SYSTEM_PROMPT = """You are the Synthesis Agent. You are given a user
question and a set of retrieved evidence chunks, each tagged with a source id.
Write a grounded answer using ONLY the provided evidence. For every factual
claim, reference the source id it came from, like [source: <id>]. If the
evidence is insufficient to answer part of the question, say so explicitly —
never fabricate information not present in the evidence."""


def research(db: Session, llm: LLMProvider, user_id, query: str) -> list[DocumentChunk]:
    """Research Agent: Phase 1 scope is retrieval-only (no web search yet)."""
    return retrieve_relevant_chunks(db=db, llm=llm, user_id=user_id, query=query)


def synthesize(llm: LLMProvider, query: str, chunks: list[DocumentChunk]) -> str:
    if not chunks:
        return "I couldn't find relevant information in your uploaded documents to answer this question."

    evidence_block = "\n\n".join(f"[source: {c.id}] {c.content}" for c in chunks)
    prompt = f"Question: {query}\n\nEvidence:\n{evidence_block}"
    return llm.generate(prompt=prompt, system=SYNTHESIS_SYSTEM_PROMPT)
