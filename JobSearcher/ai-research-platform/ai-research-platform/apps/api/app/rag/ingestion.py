from app.core.config import settings


def chunk_text(text: str, chunk_size_tokens: int | None = None, overlap_tokens: int | None = None) -> list[str]:
    """
    Simple word-based chunking with overlap. Token counts here are approximated
    as words, which is close enough for chunk-sizing purposes; swap in a real
    tokenizer (tiktoken/model-specific) if chunk boundaries need to be exact.
    """
    chunk_size = chunk_size_tokens or settings.chunk_size_tokens
    overlap = overlap_tokens or settings.chunk_overlap_tokens

    words = text.split()
    if not words:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        if end >= len(words):
            break
        start = end - overlap
    return chunks


def extract_text(file_path: str, mime_type: str) -> str:
    """
    Phase 1 supports plain text and markdown natively. PDF/DOCX extraction
    should call into existing extraction libs (pypdf, python-docx) here —
    stubbed for now so ingestion tests can run without those deps.
    """
    if mime_type in ("text/plain", "text/markdown"):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    raise NotImplementedError(f"Text extraction for {mime_type} not yet implemented — add a parser in ingestion.py")
