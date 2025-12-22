from whatsapp_base import WhatsAppClientBase


class WhatsAppClientProd(WhatsAppClientBase):
    """
    Cliente WhatsApp em modo PRODUÇÃO (placeholder).
    Integração real será adicionada futuramente.
    """

    def send_message(
        self,
        group_id: str,
        message: str,
        image_path: str | None = None,
    ) -> None:
        print("[WHATSAPP PROD]")
        print("⚠️ Integração real ainda não configurada")
        print(f"Grupo: {group_id}")
        print(f"Mensagem: {message}")
        print(f"Imagem: {image_path}")
