import time

from scheduler import iniciar_scheduler


def main():
    print("🚀 Automação de WhatsApp - PROTÓTIPO INICIADO")
    print("⏰ Aguardando horários programados...\n")

    iniciar_scheduler()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Automação finalizada manualmente.")


if __name__ == "__main__":
    main()
