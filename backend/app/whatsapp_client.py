import uuid
from datetime import datetime


class WhatsAppClientMock:
    def send_image_message(
        self,
        group_id: str,
        image_url: str,
        caption: str,
    ) -> dict:
        """
        Simula envio de mensagem via WhatsApp Cloud API
        """

        fake_response = {
            "messaging_product": "whatsapp",
            "contacts": [
                {
                    "input": group_id,
                    "wa_id": group_id,
                }
            ],
            "messages": [
                {
                    "id": str(uuid.uuid4())
                }
            ],
            "status": "sent",
            "timestamp": datetime.now().isoformat(),
        }

        return fake_response
