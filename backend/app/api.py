from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

from .sender import enviar_mensagem
from .messages import listar_mensagens

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)


# Schema de entrada (Request Body)
class SendMessageRequest(BaseModel):
    destinatario: str
    mensagem: str
    imagem: Optional[str] = None


# Healthcheck
@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/messages")
def get_messages():
    """
    Lista todas as mensagens programadas
    (café da manhã, almoço, lanche, jantar)
    """
    return listar_mensagens()


# Envio manual (API)
@app.post("/send/test-now")
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
