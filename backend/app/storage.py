import json
from datetime import datetime
from pathlib import Path
from typing import Optional, List


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
) -> List[dict]:
    if not FILE_PATH.exists():
        return []

    with open(FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    def filtro(mensagem: dict) -> bool:
        if tipo and mensagem["tipo"] != tipo:
            return False
        if origem and mensagem["origem"] != origem:
            return False
        if modo and mensagem["modo"] != modo:
            return False
        return True

    return list(filter(filtro, data))
