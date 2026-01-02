import json
from datetime import datetime
from pathlib import Path

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


def load_messages():
    if not FILE_PATH.exists():
        return []

    with open(FILE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
