from datetime import datetime

from whatsapp_client import WhatsAppClientMock


GROUP_ID = "GROUP_MOCK_123"


def enviar_mensagem(mensagem):
    client = WhatsAppClientMock()

    response = client.send_image_message(
        group_id=GROUP_ID,
        image_url=mensagem.imagem,
        caption=mensagem.texto,
    )

    agora = datetime.now().strftime("%H:%M:%S")

    print("=" * 60)
    print(f"[{agora}] ENVIO MOCK WHATSAPP")
    print(f"Mensagem: {mensagem.nome}")
    print(f"Grupo: {GROUP_ID}")
    print(f"Status: {response['status']}")
    print(f"Message ID: {response['messages'][0]['id']}")
    print("=" * 60)
