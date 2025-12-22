from datetime import datetime

from .config import WHATSAPP_GROUP_ID
from .messages import montar_mensagem
from .whatsapp_factory import get_whatsapp_client


def enviar_mensagem(tipo: str) -> None:
    agora = datetime.now().strftime("%H:%M:%S")
    print(f"[SENDER] Disparo de mensagem tipo: {tipo}")

    client = get_whatsapp_client()

    if tipo == "teste_now":
        mensagem = "🚀 TESTE NOW — Automação WhatsApp em ambiente PROD"
        imagem = "teste_now.jpg"
    else:
        mensagem, imagem = montar_mensagem(tipo)

    client.send_message(
        group_id=WHATSAPP_GROUP_ID,
        message=mensagem,
        image_path=imagem,
    )

    print("=" * 60)
    print(f"[{agora}] ENVIO WHATSAPP ({type(client).__name__})")
    print(f"Mensagem enviada: {mensagem}")
    print(f"Grupo destino: {WHATSAPP_GROUP_ID}")
    print("Status: ENVIADO (mock/prod)")
    print("=" * 60)
