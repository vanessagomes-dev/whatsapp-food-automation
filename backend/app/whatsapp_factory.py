from .config import TEST_MODE
from .whatsapp_mock import WhatsAppClientMock
from .whatsapp_prod import WhatsAppClientProd


def get_whatsapp_client():
    if TEST_MODE:
        return WhatsAppClientMock()

    return WhatsAppClientProd()
