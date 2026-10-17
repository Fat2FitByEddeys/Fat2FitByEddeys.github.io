# AI Research & Intelligence Platform — Architecture & Phase 1 Plan

Following the spec's own rule (§53): architecture and MVP scope first, no implementation code yet.

---

## 1. Final Architecture (target state)

```
Next.js 16 (apps/web)
      │  REST + SSE
      ▼
FastAPI (apps/api)  ──────────────► PostgreSQL + pgvector
      │                                   ▲
      │  enqueue job                      │
      ▼                                   │
Redis (queue + cache + rate limit)        │
      │                                   │
      ▼                                   │
Worker (apps/worker, Celery)              │
      │                                   │
      ▼                                   │
Agent Runtime (services/agent-runtime)────┘
   ├─ Planner Agent
   ├─ Research Agent
   ├─ RAG Agent ──────► services/retrieval (pgvector + FTS + rerank)
   ├─ Web Search Agent ──► external search API
   ├─ Data Analysis Agent ──► pandas sandbox
   ├─ Verification Agent
   ├─ Critic Agent
   └─ Synthesis Agent
      │
      ▼
Evaluation Layer (services/evaluation) + Observability (structured logs/metrics)
```

**Why this shape:**
- FastAPI owns orchestration because it's a natural fit for async LLM/tool calls and Pydantic structured outputs — not because Django is being avoided out of habit. Django REST Framework stays in your toolbox for conventional CRUD services if one is ever split out, but there's no such service in Phase 1, so it's not introduced.
- Redis does three jobs (queue broker, cache, rate-limit counters), not because "use Redis everywhere," but because all three need sub-millisecond ephemeral state and none needs durability.
- pgvector inside Postgres, not a dedicated vector DB — at this project's scale (thousands, not tens of millions, of chunks) a second database adds operational cost (another connection pool, another backup story, another failure mode) without a retrieval-quality win. This is the answer to "why pgvector not Pinecone/Weaviate" in interviews.

---

## 2. MVP vs. Production Feature Split

**Phase 1 MVP (this document's actual deliverable target):**
- Auth (JWT, bcrypt)
- One research flow: Planner → Research Agent → RAG Agent → Synthesis Agent (no Critic loop yet)
- Document upload → chunk → embed → pgvector retrieval → cited answer
- Single LLM provider (Gemini, since it's already in your stack) behind the `LLMProvider` abstraction — OpenAI/Groq providers stubbed but not required to work day 1
- Synchronous request/response (no SSE streaming yet) — add streaming once the core loop is correct, not before
- Minimal observability: log agent name, duration, token count per session to Postgres (no dashboard UI yet)

**Deferred to later phases (explicitly out of MVP scope):**
- Critic/revision loop, contradiction detection, source-trust scoring
- Web Search Agent (start with document-only RAG; adding an uncontrolled external-content ingestion path before verification exists is a prompt-injection risk)
- Streaming events, execution trace UI, evaluation dashboard
- Human-in-the-loop approvals
- Multi-provider hot-swap in production

This ordering matters: the spec's own Phase 5/6 (Verification, Critic) genuinely depend on Phase 2/3 (RAG, basic agent loop) working correctly first. Building verification against an unreliable retrieval layer just produces confidently-wrong confidence scores.

---

## 3. Database Schema (Phase 1 subset)

Only the tables the MVP actually touches — the full 17-entity list from §39 gets built incrementally as each phase needs it.

```sql
-- Identity
users (id, email, hashed_password, created_at)

-- Research
research_sessions (id, user_id, query, status, created_at, completed_at)
research_tasks (id, session_id, description, required_tool, priority, status)
agent_executions (id, session_id, agent_name, status, started_at, finished_at,
                   input_summary, output_summary, tokens_used, model_used)

-- Documents / RAG
documents (id, user_id, filename, mime_type, status, created_at)
document_chunks (id, document_id, chunk_index, content, page,
                  embedding vector(768), created_at)

-- Evidence / citations (minimal Phase 1 version — full Claim/Evidence
-- separation from §14 arrives with the Verification Agent in a later phase)
sources (id, session_id, document_id, chunk_id, relevance_score)
citations (id, session_id, claim_text, source_id)

-- Ops
usage_records (id, user_id, session_id, tokens_used, cost_estimate, created_at)
```

`status` enums (sessions, tasks, agent_executions) map directly to the state machine in §4 below. Indexes: `document_chunks (document_id)`, an IVFFlat/HNSW index on `embedding`, and `research_sessions (user_id, created_at)` for history pagination.

---

## 4. Agent State Machine (Phase 1 scope)

```
QUEUED → PLANNING → RESEARCHING → SYNTHESIZING → COMPLETED
                                              ↘ FAILED / TIMEOUT
```

The Critic/Verification states (`ANALYZING`, `VERIFYING`, `CRITIQUING`, `REVISING`) from the full spec are added in Phase 5/6 — introducing them now with no agent behind them would be exactly the "fake functionality" §47 rule 1 prohibits.

Every transition writes a row to `agent_executions` (or a lightweight `session_events` table if you want transition history separate from per-agent runs). `MAX_AGENT_ITERATIONS` isn't meaningful yet since there's no revision loop — it becomes relevant starting Phase 6.

---

## 5. RAG Pipeline (Phase 1 = Phase 1+2 of §19)

```
Upload → validate → extract text → clean → chunk (~500 tokens, ~50 overlap)
       → embed (gemini-embedding-001) → store in document_chunks

Query → embed query → pgvector cosine similarity (top-k=10)
      → (Phase 1: stop here) → pass chunks + provenance to Synthesis Agent
```

Hybrid search (Postgres FTS + vector), reranking, and query expansion (§19 Phases 3–5) are real quality improvements but add complexity that's wasted if basic retrieval isn't proven correct first. Ship vector-only, measure recall on a small hand-labeled eval set (even 15–20 question/answer pairs), *then* decide if hybrid search is worth it — this is the "optimize only after measuring" rule (§47 rule 17) in practice.

---

## 6. API Contract (Phase 1)

```
POST   /api/auth/register
POST   /api/auth/login

POST   /api/documents              (upload, triggers ingestion)
GET    /api/documents
DELETE /api/documents/{id}

POST   /api/research                (create session, runs synchronously in Phase 1)
GET    /api/research/{id}
GET    /api/research/{id}/sources
```

`POST /api/research` returns synchronously in Phase 1 (acceptable since there's no external web search yet, so latency is bounded by embed + retrieve + one LLM call — realistically 3–8s). It moves behind the Celery worker + `GET /api/research/{id}/events` (SSE) once the Research/Verification/Critic loop makes a single request potentially take 30s+ (Phase 7 in the spec).

---

## 7. Monorepo Structure (Phase 1 subset)

```
apps/
  web/        Next.js 16, TypeScript, Tailwind
  api/        FastAPI — routers, Pydantic schemas, LLMProvider abstraction
packages/
  shared/     shared types between web/api (or generated OpenAPI client)
infra/
  docker/     docker-compose.yml (postgres+pgvector, redis, api, web)
docs/
  architecture.md   (this document, expanded as phases land)
tests/
  unit/
  integration/
```

`apps/worker` and `services/agent-runtime` as separate top-level dirs are deferred until Phase 3 introduces the actual agent loop — right now the "agent runtime" is a few functions called directly inside the FastAPI request handler. Splitting it out earlier is premature structure for code that doesn't exist yet.

---

## 8. Risks & Trade-offs

| Decision | Trade-off | Why it's acceptable for Phase 1 |
|---|---|---|
| Synchronous research endpoint | Blocks on LLM latency, won't scale past a few concurrent users | No load requirement yet; revisit before Phase 7 |
| Single LLM provider live | No real proof of provider-swap claim yet | Abstraction exists in code even if only one impl is exercised |
| No Critic/Verification loop | Answers aren't self-corrected or contradiction-checked | Honest Phase 1 scope — don't claim grounding guarantees you haven't built |
| pgvector over dedicated vector DB | Ceiling on ANN performance at very large scale | Not your scale; documented reasoning survives the interview question |
| No web search agent yet | Research limited to uploaded documents | Avoids untrusted external content before prompt-injection defenses (§26) exist |

---

## 9. Phase 1 Implementation Tasks

1. Monorepo scaffold (`apps/web`, `apps/api`, `infra/docker`), `docker-compose.yml` with Postgres+pgvector and Redis.
2. Postgres schema + migrations for the 8 tables above; enable `pgvector` extension.
3. FastAPI: JWT auth (register/login), Pydantic schemas for all Phase 1 endpoints.
4. `LLMProvider` abstraction (`generate`, `generate_structured`, `embed`) with a Gemini implementation.
5. Document ingestion: upload → parse (PDF/TXT/MD) → chunk → embed → store.
6. Retrieval function: query embed → pgvector top-k → return chunks with provenance.
7. Planner Agent (structured JSON output) → Research Agent (calls retrieval) → Synthesis Agent (produces cited answer) as three sequential function calls, no loop yet.
8. `POST /api/research` wiring the above end-to-end, synchronous.
9. Minimal Next.js UI: login, document upload, research query box, answer + sources display.
10. Unit tests: chunking, embedding call, retrieval ranking. Integration test: full ingest→query→answer flow against a real test document.
11. Basic GitHub Actions: lint, type-check, unit tests on PR.

**Definition of done for Phase 1:** a logged-in user uploads a PDF, asks a question, and gets back an answer with correct source citations pointing to actual chunks — end to end, no mocked AI responses (§47 rule 3).

---

*Next step once Phase 1 is verified working: Phase 2 hardens the RAG pipeline itself (hybrid search, reranking, retrieval eval metrics) before Phase 3 introduces the multi-agent loop, per the spec's own incremental-build rule (§46).*
