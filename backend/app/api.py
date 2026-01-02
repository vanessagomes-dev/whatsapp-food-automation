from fastapi import FastAPI, Query
from typing import List, Optional

from .schemas import MessageHistoryResponse
from .storage import load_messages
from .sender import enviar_mensagem

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)


# --------------------
# Health
# --------------------
@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


# --------------------
# Histórico (versão oficial)
# --------------------
@app.get(
    "/v1/history",
    response_model=List[MessageHistoryResponse],
)
def get_history(
    tipo: Optional[str] = Query(None),
    origem: Optional[str] = Query(None),
    modo: Optional[str] = Query(None),
):
    return load_messages(tipo=tipo, origem=origem, modo=modo)


# --------------------
# Aliases DX (frontend-friendly)
# --------------------
@app.get(
    "/history",
    response_model=List[MessageHistoryResponse],
)
def get_history_alias(
    tipo: Optional[str] = Query(None),
    origem: Optional[str] = Query(None),
    modo: Optional[str] = Query(None),
):
    return load_messages(tipo=tipo, origem=origem, modo=modo)


# --------------------
# Envio manual (teste)
# --------------------
@app.post("/v1/send/test-now")
def send_test_message():
    enviar_mensagem(tipo="teste_now", origem="api")
    return {"status": "success"}
