# WhatsApp Food Automation 🍽️📲

Sistema de automação de envio de mensagens via WhatsApp para estabelecimentos
do setor alimentício, com agendamento inteligente, histórico de mensagens
e API REST preparada para evolução comercial.

Projeto desenvolvido com foco em MVP, escalabilidade e uso real em produção.



## 🎯 Objetivo do Projeto

Automatizar a comunicação entre estabelecimentos e clientes via WhatsApp,
reduzindo trabalho manual e garantindo mensagens padronizadas em horários estratégicos, como:

- Café da manhã
- Almoço
- Lanche
- Jantar


## 🧠 Visão de Negócio

Este projeto resolve um problema operacional comum em pequenos e médios comércios:

- Redução de esforço operacional
- Padronização de comunicação
- Aumento de conversão de pedidos
- Menos erros manuais
- Escalável para múltiplos clientes
- Base sólida para MVP e futura solução SaaS



## 🏗️ Arquitetura Técnica

- Python 3
- FastAPI (API REST)
- APScheduler (agendamentos)
- Arquitetura modular desacoplada
- Factory Pattern para clientes WhatsApp
- Separação clara entre domínio, infraestrutura e API
- Suporte a modo MOCK e PROD via variável de ambiente
- Persistência local com possibilidade de evolução para banco de dados



## ⚙️ Estrutura do Projeto

```text
backend/
 ├── app/
 │    ├── api.py                # API FastAPI
 │    ├── main.py               # Inicialização geral
 │    ├── scheduler.py          # Agendamentos
 │    ├── sender.py             # Disparo e registro das mensagens
 │    ├── storage.py            # Persistência de histórico
 │    ├── schemas.py            # Schemas de resposta da API
 │    ├── messages.py           # Conteúdo das mensagens
 │    ├── whatsapp_factory.py   # Factory de clientes WhatsApp
 │    ├── whatsapp_mock.py      # Cliente mock
 │    ├── whatsapp_prod.py      # Cliente produção (placeholder)
 │    ├── whatsapp_base.py      # Interface base
 │    └── data/
 │         └── messages_history.json
````


## 🧪 Modos de Execução

Mock (teste)

```env
TEST_MODE=true
```

Produção (simulado)
```env
TEST_MODE=false
```

## ▶️ Como Executar
Ambiente local

```bash
cd backend
python -m app.main
```

Executar API
```bash
uvicorn app.api:app --reload
```

# Acesse

- http://localhost:8000/docs

- http://localhost:8000/health


## 🔎 Endpoints Disponíveis

Saúde

- GET /health

Envio de mensagem (teste)

- POST /v1/send/test-now

Histórico de mensagem

- GET /v1/history

- GET /v1/history?tipo=almoco

- GET /v1/history?origem=scheduler

- GET /v1/history?modo=mock

Alias DX (frontend-friendly):

- **GET /history**: Agora suporta filtros de `tipo`, `origem`, `start_date`, `end_date` e `search`.
- **POST /v1/send/test-now**: Disparo manual imediato para testes.


## 📊 Histórico e Auditoria

Todas as mensagens enviadas são persistidas em storage local,
permitindo auditoria, filtros e integração direta com dashboards frontend.


## 🗺️ Roadmap Técnico

- Dashboard administrativo (frontend)

- Filtros avançados e métricas

- Persistência em banco de dados (PostgreSQL)

- Integração com WhatsApp Cloud API / Twilio

- Suporte a múltiplos clientes

- Deploy em cloud (Docker-ready)


## 📊 Evolução
O histórico agora persiste dados de `modo` (MOCK/PROD) para garantir que o Dashboard exiba métricas reais separadas de testes.
