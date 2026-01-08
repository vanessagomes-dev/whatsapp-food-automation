import json
import os
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apscheduler.schedulers.background import BackgroundScheduler

from .schemas import MessageHistoryResponse
from .storage import load_messages
from .sender import enviar_mensagem

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)

USERS_FILE = "app/data/users.json"

# ----------------------------------------------------------------
# CONFIGURAÇÃO DO SCHEDULER (AGENDADOR)
# ----------------------------------------------------------------
scheduler = BackgroundScheduler()


def executar_envio_agendado(tipo: str):
    """Função que o scheduler chama nos horários definidos"""
    data_hora = datetime.now()
    print(f"\n--- ⏰ DISPARO AGENDADO: {tipo.upper()} em {data_hora} ---")
    try:
        enviar_mensagem(tipo=tipo, origem="scheduler")
        print(f"--- ✅ SUCESSO NO DISPARO AGENDADO: {tipo} ---\n")
    except Exception as e:
        print(f"--- ❌ ERRO NO DISPARO AGENDADO: {e} ---\n")


# Agendando os horários das refeições
scheduler.add_job(
    executar_envio_agendado, "cron", hour=8, minute=0, args=["cafe_da_manha"]
)
scheduler.add_job(
    executar_envio_agendado, "cron", hour=11, minute=30, args=["almoco"]
)
scheduler.add_job(
    executar_envio_agendado, "cron", hour=16, minute=57, args=["lanche_tarde"]
)
scheduler.add_job(
    executar_envio_agendado, "cron", hour=19, minute=0, args=["jantar"]
)


@app.on_event("startup")
def iniciar_agendador():
    if not scheduler.running:
        scheduler.start()
        print("🚀 Scheduler iniciado: Monitorando horários de refeições...")


@app.on_event("shutdown")
def parar_agendador():
    if scheduler.running:
        scheduler.shutdown()
        print("🛑 Scheduler finalizado.")


class LoginRequest(BaseModel):
    email: str
    password: str


# --------------------
# Login e usuários
# --------------------

@app.post("/v1/auth/login")
async def login(request: LoginRequest):
    if not os.path.exists(USERS_FILE):
        raise HTTPException(
            status_code=500,
            detail="Base de usuários não encontrada"
        )

    with open(USERS_FILE, "r") as f:
        users = json.load(f)

    user = next(
        (u for u in users if u["email"] == request.email
         and u["password"] == request.password),
        None,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha incorretos"
        )

    return user


@app.get("/v1/users")
async def get_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as f:
        return json.load(f)


@app.put("/v1/users")
async def update_users(updated_users: List[dict]):
    with open(USERS_FILE, "w") as f:
        json.dump(updated_users, f, indent=4)
    return {"status": "success"}


@app.post("/v1/users")
async def add_user(user: dict):
    with open(USERS_FILE, "r") as f:
        users = json.load(f)

    users.append(user)

    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)
    return {"status": "success"}


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


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


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


@app.get("/history")
def get_history_alias(
    tipo: Optional[str] = Query(None),
    origem: Optional[str] = Query(None),
    modo: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
):
    skip = (page - 1) * limit
    return load_messages(
        tipo=tipo,
        origem=origem,
        modo=modo,
        skip=skip,
        limit=limit
    )


@app.post("/v1/send/test-now")
def send_test_message():
    enviar_mensagem(tipo="teste_now", origem="api")
    return {"status": "success"}