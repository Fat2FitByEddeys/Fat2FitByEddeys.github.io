import json
from typing import Any

from google import genai

from app.core.config import settings
from app.llm.base import LLMProvider


class GeminiProvider(LLMProvider):
    def __init__(self) -> None:
        self._client = genai.Client(api_key=settings.gemini_api_key)

    def generate(self, prompt: str, system: str | None = None) -> str:
        response = self._client.models.generate_content(
            model=settings.generation_model,
            contents=prompt,
            config={"system_instruction": system} if system else None,
        )
        return response.text

    def generate_structured(self, prompt: str, schema: dict[str, Any], system: str | None = None) -> dict[str, Any]:
        response = self._client.models.generate_content(
            model=settings.generation_model,
            contents=prompt,
            config={
                "system_instruction": system,
                "response_mime_type": "application/json",
                "response_schema": schema,
            },
        )
        return json.loads(response.text)

    def embed(self, text: str) -> list[float]:
        response = self._client.models.embed_content(model=settings.embedding_model, contents=text)
        return response.embeddings[0].values

    def estimate_tokens(self, text: str) -> int:
        # rough heuristic; swap for client.models.count_tokens() if precision matters
        return max(1, len(text) // 4)


def get_llm_provider() -> LLMProvider:
    if settings.llm_provider == "gemini":
        return GeminiProvider()
    raise ValueError(f"Unsupported LLM_PROVIDER: {settings.llm_provider}. Add a provider in app/llm/.")
