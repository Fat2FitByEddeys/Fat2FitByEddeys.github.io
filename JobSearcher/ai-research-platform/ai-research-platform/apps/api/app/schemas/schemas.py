import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class DocumentOut(BaseModel):
    id: uuid.UUID
    filename: str
    mime_type: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ResearchCreate(BaseModel):
    query: str


class SourceOut(BaseModel):
    id: uuid.UUID
    document_id: uuid.UUID | None
    chunk_id: uuid.UUID | None
    relevance_score: float | None
    snippet: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ResearchOut(BaseModel):
    id: uuid.UUID
    query: str
    status: str
    answer: str | None
    created_at: datetime
    completed_at: datetime | None

    model_config = ConfigDict(from_attributes=True)
