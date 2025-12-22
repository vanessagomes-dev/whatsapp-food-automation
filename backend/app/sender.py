from datetime import datetime


def enviar_mensagem(mensagem):
    agora = datetime.now().strftime("%H:%M:%S")

    print("=" * 60)
    print(f"[{agora}] ENVIO SIMULADO")
    print(f"Mensagem: {mensagem.nome}")
    print(f"Horário programado: {mensagem.horario}")
    print(f"Imagem: {mensagem.imagem}")
    print("Texto:")
    print(mensagem.texto)
    print("=" * 60)
