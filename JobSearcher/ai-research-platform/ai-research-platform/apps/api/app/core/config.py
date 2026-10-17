from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://research:research@localhost:5432/research_platform"
    redis_url: str = "redis://localhost:6379/0"

    jwt_secret: str = "change-me-in-.env"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    gemini_api_key: str = ""
    llm_provider: str = "gemini"
    embedding_model: str = "gemini-embedding-001"
    generation_model: str = "gemini-flash-latest"

    max_upload_size_mb: int = 20
    chunk_size_tokens: int = 500
    chunk_overlap_tokens: int = 50
    retrieval_top_k: int = 10

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
