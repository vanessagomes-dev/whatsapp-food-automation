from abc import ABC, abstractmethod


class WhatsAppClientBase(ABC):

    @abstractmethod
    def send_message(
        self,
        group_id: str,
        message: str,
        image_path: str | None = None,
    ) -> None:
        pass
