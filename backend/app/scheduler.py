from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from pytz import timezone

from messages import MENSAGENS
from sender import enviar_mensagem


def iniciar_scheduler():
    scheduler = BackgroundScheduler(
        timezone=timezone("America/Sao_Paulo")
    )

    for mensagem in MENSAGENS:
        hora, minuto = mensagem.horario.split(":")

        scheduler.add_job(
            enviar_mensagem,
            trigger=CronTrigger(
                hour=int(hora),
                minute=int(minuto),
            ),
            args=[mensagem],
            id=mensagem.nome,
            replace_existing=True,
        )

        log_msg = (
            f"[SCHEDULER] Mensagem '{mensagem.nome}' "
            f"agendada para {mensagem.horario}"
        )
        print(log_msg)

    scheduler.start()
    return scheduler
