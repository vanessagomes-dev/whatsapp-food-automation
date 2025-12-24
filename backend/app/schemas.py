from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    destinatario: str
    mensagem: str
