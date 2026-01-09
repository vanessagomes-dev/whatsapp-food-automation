import json
import os
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apscheduler.schedulers.background import BackgroundScheduler

# Importações internas do seu projeto
from .storage import load_messages
from .sender import enviar_mensagem

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)

# Caminhos de arquivos
USERS_FILE = "app/data/users.json"
SETTINGS_FILE = "app/data/settings.json"
LOG_FILE = "app/logs/automation.log"

# ----------------------------------------------------------------
# CONFIGURAÇÃO DO SCHEDULER (AGENDADOR)
# ----------------------------------------------------------------
scheduler = BackgroundScheduler()


def executar_envio_agendado(tipo: str):
    """Função chamada pelo agendador nos horários definidos"""
    data_hora = datetime.now()
    print(f"\n--- ⏰ DISPARO AGENDADO: {tipo.upper()} em {data_hora} ---")
    try:
        enviar_mensagem(tipo=tipo, origem="scheduler")
        print(f"--- ✅ SUCESSO NO DISPARO AGENDADO: {tipo} ---\n")
    except Exception as e:
        print(f"--- ❌ ERRO NO DISPARO AGENDADO: {e} ---\n")


def carregar_agendamentos():
    """Lê o JSON e configura os horários no Scheduler"""
    if scheduler.running:
        scheduler.remove_all_jobs()

    horarios_padrao = {
        "cafe_da_manha": "08:00",
        "almoco": "12:00",
        "lanche_tarde": "16:00",
        "jantar": "19:00"
    }

    try:
        horarios = horarios_padrao
        if os.path.exists(SETTINGS_FILE):
            with open(SETTINGS_FILE, "r") as f:
                dados = json.load(f)
                if isinstance(dados, dict) and dados:
                    horarios = dados.get("horarios", dados)

        for tipo, valor in horarios.items():
            if isinstance(valor, str) and ":" in valor:
                h, m = valor.split(":")
                scheduler.add_job(
                    executar_envio_agendado,
                    "cron",
                    hour=int(h),
                    minute=int(m),
                    args=[tipo]
                )
        print("📅 Horários de disparo sincronizados!")
    except Exception as e:
        print(f"⚠️ Erro ao sincronizar horários: {e}")


@app.on_event("startup")
def iniciar_agendador():
    if not scheduler.running:
        scheduler.start()
        carregar_agendamentos()
        print("🚀 Scheduler iniciado!")


@app.on_event("shutdown")
def parar_agendador():
    if scheduler.running:
        scheduler.shutdown()
        print("🛑 Scheduler finalizado.")

# ----------------------------------------------------------------
# ROTAS DE SISTEMA
# ----------------------------------------------------------------


@app.get("/v1/system/schedule")
async def get_schedule():
    if not os.path.exists(SETTINGS_FILE):
        return {"horarios": {}}

    try:
        with open(SETTINGS_FILE, "r") as f:
            dados = json.load(f)
            # Se o arquivo já tiver a chave "horarios", retorna direto
            if isinstance(dados, dict) and "horarios" in dados:
                return dados
            # Caso contrário, envelopa os dados
            return {"horarios": dados}
    except Exception:
        return {"horarios": {}}


@app.post("/v1/system/schedule")
async def update_schedule(data: dict):
    with open(SETTINGS_FILE, "w") as f:
        json.dump(data.get("horarios", data), f, indent=4)
    carregar_agendamentos()
    return {"status": "success"}


@app.get("/v1/system/logs")
async def get_logs():
    if not os.path.exists(LOG_FILE):
        return {"logs": "Nenhum log gerado ainda."}
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        linhas = f.readlines()
        return {"logs": "".join(linhas[-50:])}

# ----------------------------------------------------------------
# AUTENTICAÇÃO E USUÁRIOS
# ----------------------------------------------------------------


class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/v1/auth/login")
async def login(request: LoginRequest):
    if not os.path.exists(USERS_FILE):
        raise HTTPException(status_code=500, detail="Database missing")
    with open(USERS_FILE, "r") as f:
        users = json.load(f)
    user = next(
        (u for u in users if u["email"] == request.email
         and u["password"] == request.password),
        None,
    )
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
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

# ----------------------------------------------------------------
# HISTÓRICO E DISPAROS (CORRIGIDO)
# ----------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/v1/history")
def get_history(
    tipo: Optional[str] = Query(None),
    origem: Optional[str] = Query(None),
    modo: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
):
    """Retorna o histórico com paginação corrigida"""
    # 1. Busca as mensagens
    resultado = load_messages(tipo=tipo, origem=origem, modo=modo)

    # 2. GARANTIA: Se o resultado não for uma lista, transformamos em uma
    # Isso evita o erro "unhashable type: slice"
    if isinstance(resultado, dict):
        todas_mensagens = resultado.get("items", list(resultado.values()))
    else:
        todas_mensagens = resultado if isinstance(resultado, list) else []

    # 3. Agora o fatiamento (slice) vai funcionar com segurança
    total = len(todas_mensagens)
    inicio = (page - 1) * limit
    fim = inicio + limit
    items_paginados = todas_mensagens[inicio:fim]

    return {
        "total": total,
        "items": items_paginados
    }


@app.post("/v1/send/test-now")
def send_test_message():
    enviar_mensagem(tipo="teste_now", origem="api")
    return {"status": "success"}


@app.get("/")
def root():
    return {"status": "ok", "message": "API está rodando perfeitamente!"}
