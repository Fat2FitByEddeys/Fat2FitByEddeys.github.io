import os
import tempfile
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.llm.gemini_provider import get_llm_provider
from app.models.models import Document, DocumentChunk, User
from app.rag.ingestion import chunk_text, extract_text
from app.schemas.schemas import DocumentOut

router = APIRouter(prefix="/api/documents", tags=["documents"])

SUPPORTED_MIME_TYPES = {"text/plain", "text/markdown"}  # PDF/DOCX added once extractors are wired in


@router.post("", response_model=DocumentOut, status_code=201)
def upload_document(
    file: UploadFile,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if file.content_type not in SUPPORTED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type {file.content_type}. Phase 1 supports: {SUPPORTED_MIME_TYPES}",
        )

    document = Document(
        user_id=current_user.id,
        filename=file.filename,
        mime_type=file.content_type,
        status="pending",
    )
    db.add(document)
    db.commit()
    db.refresh(document)

    # Phase 1: ingest synchronously inline. Move behind a Celery worker
    # once documents/ research volume makes this block requests too long.
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            tmp.write(file.file.read())
            tmp_path = tmp.name

        text = extract_text(tmp_path, file.content_type)
        chunks = chunk_text(text)

        llm = get_llm_provider()
        for i, chunk_content in enumerate(chunks):
            embedding = llm.embed(chunk_content)
            db.add(DocumentChunk(document_id=document.id, chunk_index=i, content=chunk_content, embedding=embedding))

        document.status = "embedded"
        db.commit()
    except Exception as e:
        document.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {e}") from e
    finally:
        if "tmp_path" in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)

    db.refresh(document)
    return document


@router.get("", response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Document).filter(Document.user_id == current_user.id).order_by(Document.created_at.desc()).all()


@router.delete("/{document_id}", status_code=204)
def delete_document(document_id: uuid.UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    document = db.get(Document, document_id)
    if not document or document.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(document)
    db.commit()
