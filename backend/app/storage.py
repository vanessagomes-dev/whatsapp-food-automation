import json
from datetime import datetime
from pathlib import Path
from typing import Optional


DATA_DIR = Path(__file__).parent / "data"
DATA_DIR.mkdir(exist_ok=True)

FILE_PATH = DATA_DIR / "messages_history.json"


def save_message(payload: dict) -> None:
    payload["timestamp"] = datetime.utcnow().isoformat()

    if FILE_PATH.exists():
        with open(FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    data.append(payload)

    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def load_messages(
    tipo: Optional[str] = None,
    origem: Optional[str] = None,
    modo: Optional[str] = None,
    skip: int = 0,
    limit: int = 10,
) -> dict:  # Mudamos para retornar um dicionário com metadados
    if not FILE_PATH.exists():
        return {"total": 0, "items": []}

    with open(FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Inverter para que as mensagens mais recentes apareçam primeiro
    data.reverse()

    def filtro(mensagem: dict) -> bool:
        if tipo and tipo != "all" and mensagem["tipo"] != tipo:
            return False
        if origem and origem != "all" and mensagem["origem"] != origem:
            return False
        if modo and mensagem["modo"] != modo:
            return False
        return True

    filtered_data = list(filter(filtro, data))
    total = len(filtered_data)

    # Aplicar paginação
    paginated_items = filtered_data[skip: skip + limit]

    return {"total": total, "items": paginated_items}
