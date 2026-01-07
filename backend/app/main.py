# ---------------------------------------------------------
# Projeto: WhatsApp Food Automation
# Autor: Vanessa Gomes <vanessagomesdev@gmail.com>
# Descrição: Core de disparo e motor de agendamento.
# Direitos Reservados (c) 2026
# ---------------------------------------------------------

from .scheduler import iniciar_scheduler


def main():
    iniciar_scheduler()


if __name__ == "__main__":
    main()
