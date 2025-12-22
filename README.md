# WhatsApp Food Automation 🍽️📲

Automação de envio de mensagens via WhatsApp para estabelecimentos de alimentação, com agendamento inteligente, envio de texto e imagem e arquitetura preparada para ambiente de produção e evolução como API.

Projeto desenvolvido com foco em MVP, escalabilidade e uso comercial real.

---

## 🎯 Objetivo do Projeto

Automatizar a comunicação entre estabelecimentos e clientes via WhatsApp, reduzindo trabalho manual e garantindo mensagens padronizadas em horários estratégicos, como:

- Café da manhã

- Almoço

- Lanche

- Jantar

---

## 🧠 Visão de Negócio

Este projeto resolve um problema operacional comum em pequenos e médios comércios:

- Redução de esforço operacional
- Padronização de comunicação
- Aumento de conversão de pedidos
- Menos erros manuais
- Escalável para múltiplos clientes
- Arquitetura preparada para integração com WhatsApp API oficial

---

## 🏗️ Arquitetura Técnica

- Python 3
- Scheduler com APScheduler
- Arquitetura modular desacoplada
- Factory Pattern para troca de clientes WhatsApp
- Separação clara entre domínio, infraestrutura e execução
- Suporte a modo MOCK e PROD via variável de ambiente
- Preparado para evolução como API REST com FastAPI

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

## 🗺️ Roadmap Técnico

- API REST com FastAPI

- Integração WhatsApp Cloud API ou Twilio

- Dashboard administrativo

- Suporte a múltiplos clientes

- Persistência em banco de dados

- Deploy em cloud (Docker-ready)

---

# WhatsApp Food Automation API

API para automação de mensagens via WhatsApp, com foco em pequenos comércios
do setor alimentício.

## 🎯 Objetivo

Automatizar respostas, pedidos e fluxos básicos de atendimento,
reduzindo tempo operacional e erros humanos.

## 🧱 Arquitetura da API

- FastAPI 
- Scheduler desacoplado da API
- Estrutura modular e escalável
- Pronto para integração com serviços externos

## 🚀 Como executar a API

### Criar ambiente virtual
```bash
python -m venv venv
source venv/bin/activate 
# Windows: venv\Scripts\activate
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

## 🔎 Endpoints (iniciais)

- GET /health → status da API

- POST /send/test-now → simula envio de mensagem

- GET /messages → histórico de mensagens

## 💼 Visão Comercial

Este projeto pode ser utilizado para:

- Atendimento automático via WhatsApp

- Confirmação e lembrete de pedidos

- Comunicação em horários estratégicos

- Redução de tempo de resposta

- Base sólida para MVPs e solução SaaS

## 🧩 Status do Projeto

🟢 Em desenvolvimento ativo
🧪 Mock funcional
🏗️ Arquitetura pronta para produção

