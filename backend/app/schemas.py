from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MessageHistoryResponse(BaseModel):
    tipo: str
    mensagem: str
    imagem: Optional[str]
    grupo: str
    origem: str
    modo: str
    timestamp: datetime
