from datetime import datetime
from typing import Optional

from .config import WHATSAPP_GROUP_ID
from .messages import montar_mensagem
from .whatsapp_factory import get_whatsapp_client


def enviar_mensagem(
    tipo: Optional[str] = None,
    destinatario: Optional[str] = None,
    mensagem: Optional[str] = None,
    imagem: Optional[str] = None,
) -> None:
    """
    Envia mensagem via WhatsApp (mock ou prod).

    - Usado pelo scheduler (por tipo)
    - Usado pela API (mensagem direta)
    """

    agora = datetime.now().strftime("%H:%M:%S")
    print(f"[SENDER] Disparo de mensagem | tipo={tipo}")

    client = get_whatsapp_client()

    # 🔹 Fluxo API (mensagem direta)
    if mensagem and destinatario:
        client.send_message(
            group_id=destinatario,
            message=mensagem,
            image_path=imagem,
        )

        print("=" * 60)
        print(f"[{agora}] ENVIO WHATSAPP ({type(client).__name__})")
        print(f"Mensagem enviada: {mensagem}")
        print(f"Destino: {destinatario}")
        print("Status: ENVIADO (api)")
        print("=" * 60)
        return

    # 🔹 Fluxo Scheduler
    if not tipo:
        raise ValueError("Tipo de mensagem não informado")

    if tipo == "teste_now":
        mensagem = "🚀 TESTE NOW — Automação WhatsApp em ambiente MOCK"
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
    print("Status: ENVIADO (scheduler)")
    print("=" * 60)
