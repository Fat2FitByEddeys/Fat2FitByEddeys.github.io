from app.rag.ingestion import chunk_text


def test_chunk_text_empty_string_returns_no_chunks():
    assert chunk_text("") == []


def test_chunk_text_short_text_returns_single_chunk():
    text = "This is a short piece of text."
    chunks = chunk_text(text, chunk_size_tokens=500, overlap_tokens=50)
    assert len(chunks) == 1
    assert chunks[0] == text


def test_chunk_text_respects_chunk_size():
    text = " ".join(f"word{i}" for i in range(100))
    chunks = chunk_text(text, chunk_size_tokens=20, overlap_tokens=5)
    for chunk in chunks:
        assert len(chunk.split()) <= 20


def test_chunk_text_overlap_shares_words_between_chunks():
    text = " ".join(f"word{i}" for i in range(50))
    chunks = chunk_text(text, chunk_size_tokens=20, overlap_tokens=5)
    assert len(chunks) > 1
    first_chunk_end = chunks[0].split()[-5:]
    second_chunk_start = chunks[1].split()[:5]
    assert first_chunk_end == second_chunk_start
