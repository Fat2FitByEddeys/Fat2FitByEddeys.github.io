# AI Research & Intelligence Platform — Phase 1

Phase 1 MVP: auth, document upload/embedding, and a synchronous
Planner → Research → Synthesis agent chain producing cited answers from
your uploaded documents. See `docs/architecture.md` for the full design
rationale and later-phase roadmap.

## What's built vs. what's a stub

**Working (once you add a Gemini key):**
- JWT auth (register/login)
- Document upload → chunk → embed → pgvector storage (`.txt` / `.md` only)
- `POST /api/research` running Planner → Research (retrieval) → Synthesis end-to-end
- Cited answers referencing actual retrieved chunk IDs

**Explicitly not built yet (by design — see architecture.md §2):**
- PDF/DOCX extraction (`extract_text` raises `NotImplementedError` — add `pypdf`/`python-docx` when you need it)
- Critic/Verification loop, contradiction detection
- Web Search Agent
- Streaming/SSE, background workers (currently synchronous)
- OpenAI/Groq providers (only the `LLMProvider` abstraction + Gemini impl exist)

## Prerequisites
- Docker + Docker Compose
- A Gemini API key ([aistudio.google.com](https://aistudio.google.com))

## Run it

```bash
cp .env.example .env
# edit .env — at minimum set GEMINI_API_KEY and a real JWT_SECRET

cd infra/docker
docker compose up --build
```

API comes up at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

## Try it end-to-end

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"testpass123"}'

# Login (form-encoded, OAuth2 password flow)
curl -X POST http://localhost:8000/api/auth/login \
  -d "username=you@example.com&password=testpass123"
# -> copy the access_token

# Upload a .txt document
curl -X POST http://localhost:8000/api/documents \
  -H "Authorization: Bearer <token>" \
  -F "file=@/path/to/some_notes.txt;type=text/plain"

# Ask a question against it
curl -X POST http://localhost:8000/api/research \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"query": "What does this document say about X?"}'
```

## Running tests locally (no Docker needed)

```bash
cd apps/api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pip install pytest
PYTHONPATH=. pytest tests/ -v
```

## What's next (Phase 2)
Hybrid retrieval (Postgres FTS + vector), reranking, and a small hand-labeled
retrieval eval set — see `docs/architecture.md` §5. Don't add the Critic/
Verification loop until retrieval quality is measured and trusted.
