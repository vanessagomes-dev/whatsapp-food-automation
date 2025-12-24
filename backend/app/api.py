from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

from .sender import enviar_mensagem
from .messages import listar_mensagens

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)


# =========================
# Schemas
# =========================
class MessageResponse(BaseModel):
    nome: str
    horario: str
    texto: str
    imagem: str


class SendMessageRequest(BaseModel):
    destinatario: str
    mensagem: str
    imagem: Optional[str] = None


# =========================
# Health
# =========================
@app.get("/")
@app.get("/health")
def health_check():
    return {"status": "ok"}


# =========================
# Messages — LIST
# =========================
@app.get(
    "/v1/messages",
    response_model=List[MessageResponse],
    tags=["Messages"],
)
def get_messages():
    return listar_mensagens()


@app.get(
    "/messages",
    response_model=List[MessageResponse],
    tags=["Messages"],
)
def get_messages_alias():
    return listar_mensagens()


# =========================
# Messages — DETAIL
# =========================
@app.get(
    "/v1/messages/{tipo}",
    response_model=MessageResponse,
    tags=["Messages"],
)
def get_message_by_tipo(tipo: str):
    mensagens = listar_mensagens()

    for mensagem in mensagens:
        if mensagem["nome"] == tipo:
            return mensagem

    raise HTTPException(
        status_code=404,
        detail="Mensagem não encontrada",
    )


@app.get(
    "/messages/{tipo}",
    response_model=MessageResponse,
    tags=["Messages"],
)
def get_message_by_tipo_alias(tipo: str):
    mensagens = listar_mensagens()

    for mensagem in mensagens:
        if mensagem["nome"] == tipo:
            return mensagem

    raise HTTPException(
        status_code=404,
        detail="Mensagem não encontrada",
    )


# =========================
# Send — TEST / MANUAL
# =========================
@app.post(
    "/v1/send/test-now",
    tags=["Send"],
)
def send_test_message(payload: SendMessageRequest):
    enviar_mensagem(
        destinatario=payload.destinatario,
        mensagem=payload.mensagem,
        imagem=payload.imagem,
    )

    return {
        "status": "success",
        "message": "Mensagem enviada com sucesso",
    }


@app.post(
    "/send/test-now",
    tags=["Send"],
)
def send_test_message_alias(payload: SendMessageRequest):
    enviar_mensagem(
        destinatario=payload.destinatario,
        mensagem=payload.mensagem,
        imagem=payload.imagem,
    )

    return {
        "status": "success",
        "message": "Mensagem enviada com sucesso",
    }
