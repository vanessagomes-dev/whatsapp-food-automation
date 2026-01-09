import os
from datetime import datetime
from .config import WHATSAPP_GROUP_ID, TEST_MODE
from .messages import montar_mensagem
from .whatsapp_factory import get_whatsapp_client
from .storage import save_message

# Definimos o caminho do log para o sender saber onde gravar
LOG_PATH = os.path.join("app", "logs", "automation.log")


def logger(mensagem: str):
    """Função auxiliar para printar no terminal e gravar no arquivo"""
    data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    texto_final = f"[{data_hora}] {mensagem}"

    print(texto_final)

    # Garante que a pasta logs exista
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)

    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(texto_final + "\n")


def enviar_mensagem(tipo: str, origem: str = "scheduler") -> None:
    logger(f"🚀 Iniciando processo de envio | Tipo: {tipo} | Origem: {origem}")

    client = get_whatsapp_client()

    if tipo == "teste_now":
        mensagem = "🚀 TESTE NOW — Automação WhatsApp"
        imagem = "teste_now.jpg"
    else:
        mensagem, imagem = montar_mensagem(tipo)

    try:
        client.send_message(
            group_id=WHATSAPP_GROUP_ID,
            message=mensagem,
            image_path=imagem,
        )
        logger(f"✅ Mensagem enviada para o grupo: {WHATSAPP_GROUP_ID}")
    except Exception as e:
        logger(f"❌ ERRO no envio: {str(e)}")

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
