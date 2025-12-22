# WhatsApp Food Automation 🍽️📲

Automação de envio de mensagens no WhatsApp para estabelecimentos de alimentação,
com agendamento por horário, envio de texto e imagem, e arquitetura preparada
para ambiente de produção.

---

## 🎯 Objetivo do Projeto

Automatizar a comunicação com clientes via WhatsApp, reduzindo trabalho manual
e garantindo mensagens padronizadas em horários estratégicos
(café da manhã, almoço, lanche e jantar).

---

## 🧠 Visão de Negócio

- Redução de esforço operacional
- Comunicação padronizada
- Aumento de conversão de pedidos
- Escalável para múltiplos clientes
- Preparado para integração com WhatsApp API oficial

---

## 🏗️ Arquitetura

- Python 3
- Scheduler com APScheduler
- Arquitetura desacoplada
- Factory Pattern para troca de clientes WhatsApp
- Modo MOCK e PROD via variável de ambiente
- Pronto para evolução como API (FastAPI)

---

## ⚙️ Estrutura do Projeto

```text
backend/
 ├── app/
 │    ├── main.py              # Inicialização da aplicação
 │    ├── scheduler.py         # Agendamento das mensagens
 │    ├── sender.py            # Disparo de mensagens
 │    ├── messages.py          # Conteúdo das mensagens
 │    ├── whatsapp_factory.py  # Factory de clientes WhatsApp
 │    ├── whatsapp_mock.py     # Cliente mock
 │    ├── whatsapp_prod.py     # Cliente produção (placeholder)
 │    └── whatsapp_base.py     # Interface base
```
---

## 🧪 Modos de Execução

Mock (teste)

```env
TEST_MODE=true
```

Produção (simulado)
```env
TEST_MODE=false
```
---

## ▶️ Como Executar

```bash
cd backend
python -m app.main
```
---

## 🗺️ Roadmap

-API REST com FastAPI

-Integração WhatsApp Cloud API

-Dashboard administrativo

-Multi-clientes

-Persistência em banco de dados

-Deploy em cloud

```mardown

📌 **Isso sozinho já eleva seu projeto de nível.**

👉 Faça um **commit**:
```

---

# WhatsApp Food Automation API

API para automação de pedidos via WhatsApp, com foco em pequenos comércios
como cafeterias, lanchonetes e restaurantes.

## 🎯 Objetivo
Automatizar respostas, pedidos e fluxos básicos de atendimento,
reduzindo tempo operacional e erros humanos.

## 🧱 Arquitetura
- FastAPI (API REST)
- Scheduler desacoplado
- Estrutura modular e escalável
- Pronto para integração com WhatsApp Cloud API ou Twilio

## 🚀 Como executar

### Criar ambiente virtual
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

Instalar dependências
```bash
pip install fastapi uvicorn
```

Subir API
```bash
uvicorn app.api:app --reload
```

---

## 🔎 Endpoints

- GET /health → status da API

- POST /send/test-now → simula envio de mensagem

- GET /messages → histórico de mensagens

## 💼 Visão Comercial

Este projeto pode ser utilizado por estabelecimentos para:

- Atendimento automático

- Confirmação de pedidos

- Redução de tempo de resposta

- Padronização de mensagens

- Modelo ideal para MVPs e SaaS white-label.

