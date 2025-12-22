from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(
    title="WhatsApp Food Automation API",
    version="1.0.0",
)


class TestMessage(BaseModel):
    phone: str
    message: str


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/send/test-now")
def send_test_message(data: TestMessage):
    return {
        "status": "queued",
        "phone": data.phone,
        "message": data.message,
        "timestamp": datetime.utcnow().isoformat()
    }
