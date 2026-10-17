from abc import ABC, abstractmethod
from typing import Any


class LLMProvider(ABC):
    """
    Every concrete provider (Gemini, OpenAI, Groq) implements this interface.
    Agents and routers depend only on this abstraction, never on a specific
    vendor SDK, so switching LLM_PROVIDER in config swaps the backend with
    no code changes elsewhere.
    """

    @abstractmethod
    def generate(self, prompt: str, system: str | None = None) -> str:
        """Free-form text generation."""
        raise NotImplementedError

    @abstractmethod
    def generate_structured(self, prompt: str, schema: dict[str, Any], system: str | None = None) -> dict[str, Any]:
        """Generation constrained to a JSON schema. Used by the Planner Agent."""
        raise NotImplementedError

    @abstractmethod
    def embed(self, text: str) -> list[float]:
        """Return an embedding vector for a piece of text."""
        raise NotImplementedError

    @abstractmethod
    def estimate_tokens(self, text: str) -> int:
        raise NotImplementedError
