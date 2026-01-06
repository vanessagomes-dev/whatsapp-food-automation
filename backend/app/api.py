from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from .schemas import MessageHistoryResponse
from .storage import load_messages
from .sender import enviar_mensagem

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)

# --------------------
# CORS (Frontend React)
# --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
# Histórico (oficial)
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
# Alias DX (frontend)
# --------------------


@app.get("/history")
def get_history_alias(
    tipo: Optional[str] = Query(None),
    origem: Optional[str] = Query(None),
    modo: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1)
):
    skip = (page - 1) * limit
    return load_messages(
        tipo=tipo,
        origem=origem,
        modo=modo,
        skip=skip,
        limit=limit
    )

# --------------------
# Envio manual (teste)
# --------------------


@app.post("/v1/send/test-now")
def send_test_message():
    enviar_mensagem(tipo="teste_now", origem="api")
    return {"status": "success"}
