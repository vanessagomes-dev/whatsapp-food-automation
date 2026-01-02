from datetime import datetime

from .config import WHATSAPP_GROUP_ID, TEST_MODE
from .messages import montar_mensagem
from .whatsapp_factory import get_whatsapp_client
from .storage import save_message


def enviar_mensagem(
    tipo: str,
    origem: str = "scheduler",
) -> None:
    agora = datetime.now().strftime("%H:%M:%S")
    print(f"[SENDER] Disparo de mensagem tipo: {tipo}")

    client = get_whatsapp_client()

    if tipo == "teste_now":
        mensagem = "🚀 TESTE NOW — Automação WhatsApp"
        imagem = "teste_now.jpg"
    else:
        mensagem, imagem = montar_mensagem(tipo)

    client.send_message(
        group_id=WHATSAPP_GROUP_ID,
        message=mensagem,
        image_path=imagem,
    )

    save_message(
        {
            "tipo": tipo,
            "mensagem": mensagem,
            "imagem": imagem,
            "grupo": WHATSAPP_GROUP_ID,
            "origem": origem,
            "modo": "mock" if TEST_MODE else "prod",
        }
    )

    print("=" * 60)
    print(f"[{agora}] ENVIO WHATSAPP ({type(client).__name__})")
    print(f"Mensagem enviada: {mensagem}")
    print(f"Grupo destino: {WHATSAPP_GROUP_ID}")
    print(f"Origem: {origem}")
    print("Status: ENVIADO")
    print("=" * 60)
