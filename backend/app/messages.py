from dataclasses import dataclass


@dataclass
class MensagemProgramada:
    nome: str
    horario: str
    texto: str
    imagem: str


LINK_PEDIDO = "https://wa.me/5511999999999"


MENSAGENS = [
    MensagemProgramada(
        nome="cafe_da_manha",
        horario="08:00",
        texto=(
            "☕ *Bom dia!* Confira as opções de café da manhã:\n\n"
            "1️⃣ Pão na chapa + café\n"
            "2️⃣ Tapioca recheada\n"
            "3️⃣ Combo fitness\n\n"
            f"📲 Faça seu pedido aqui: {LINK_PEDIDO}"
        ),
        imagem="https://via.placeholder.com/600x400?text=Cafe+da+Manha"
    ),
    MensagemProgramada(
        nome="almoco",
        horario="11:00",
        texto=(
            "🍽️ *Almoço do dia*:\n\n"
            "1️⃣ Prato executivo\n"
            "2️⃣ Prato vegetariano\n"
            "3️⃣ Prato fitness\n\n"
            f"📲 Faça seu pedido aqui: {LINK_PEDIDO}"
        ),
        imagem="https://via.placeholder.com/600x400?text=Almoco"
    ),
    MensagemProgramada(
        nome="lanche_tarde",
        horario="15:00",
        texto=(
            "☕ *Hora do lanche da tarde!* 🥐\n\n"
            "1️⃣ Café + bolo\n"
            "2️⃣ Suco natural + salgado\n\n"
            f"📲 Faça seu pedido aqui: {LINK_PEDIDO}"
        ),
        imagem="https://via.placeholder.com/600x400?text=Lanche+da+Tarde"
    ),
    MensagemProgramada(
        nome="jantar",
        horario="18:00",
        texto=(
            "🍲 *Jantar servido!* Confira as opções:\n\n"
            "1️⃣ Prato caseiro\n"
            "2️⃣ Sopa\n"
            "3️⃣ Opção leve\n\n"
            f"📲 Faça seu pedido aqui: {LINK_PEDIDO}"
        ),
        imagem="https://via.placeholder.com/600x400?text=Jantar"
    ),
]
