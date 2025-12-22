from apscheduler.schedulers.background import BackgroundScheduler

from .config import TEST_MODE
from .messages import MENSAGENS
from .sender import enviar_mensagem


def iniciar_scheduler() -> None:
    aps_scheduler = BackgroundScheduler()

    for mensagem in MENSAGENS:
        aps_scheduler.add_job(
            enviar_mensagem,
            "cron",
            hour=mensagem.horario.split(":")[0],
            minute=mensagem.horario.split(":")[1],
            args=[mensagem.nome],
            id=mensagem.nome,
            replace_existing=True,
        )

        print(
            f"[SCHEDULER] Mensagem '{mensagem.nome}' "
            f"agendada para {mensagem.horario}"
        )

    aps_scheduler.start()

    if TEST_MODE:
        print("[TEST MODE] Envio imediato habilitado")
        enviar_mensagem("teste_now")

    print("⏰ Scheduler iniciado com sucesso")
