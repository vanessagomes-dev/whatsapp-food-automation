from .whatsapp_base import WhatsAppClientBase


class WhatsAppClientMock(WhatsAppClientBase):

    def send_message(
        self,
        group_id: str,
        message: str,
        image_path: str | None = None,
    ) -> None:
        print("[WHATSAPP MOCK]")
        print(f"Grupo: {group_id}")
        print(f"Mensagem: {message}")
        print(f"Imagem: {image_path}")
