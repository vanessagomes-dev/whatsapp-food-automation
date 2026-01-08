# WhatsApp Food Automation - Full Stack MVP

Este é um ecossistema completo para automação de disparos de mensagens para restaurante. O sistema conta com um motor de agendamento (Back-end) e um painel administrativo profissional (Front-end).

## Novidades da Versão (Jan/2026)
- **Sistema de Usuários**: Login seguro e persistente.
- **Controle de Acesso (RBAC)**: Permissões granulares por usuário (Dashboard, Envio Manual).
- **Segurança**: Rotas protegidas por AuthGuards e troca de senha de colaborador.

###  Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:

- Python 3.10+ (para rodar o backend manualmente).

- Node.js 18+ (para rodar o frontend manualmente).

- Docker & Docker Compose (opcional, para rodar tudo em containers).

## 🐳 Rodando com Docker (Recomendado)
A maneira mais rápida de subir o ecossistema completo:

- 1. Na raiz do projeto, execute:
```bash
docker-compose up --build
```
- 2. O Dashboard estará disponível em: http://localhost:5173.

- 3. A API estará disponível em: http://localhost:8000.

## 🐍 Instalação Manual (Backend)
Se preferir rodar sem Docker:

- 1. Entre na pasta: cd backend.
- 2. Instale as dependências:
```bash
pip install -r requirements.txt
```
(Este arquivo contém todas as bibliotecas necessárias como FastAPI e APScheduler).

- 3. Inicie o servidor:
```bash
python -m app.main
```

##  Estrutura do Repositório

- **/backend**: API em Python (FastAPI) com motor de agendamento e logs.
- **/frontend**: Dashboard Administrativo em React (Vite) + Tailwind CSS + Sistema de Permissões.

##  Como rodar o projeto completo

### 1. Iniciar o Backend
```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

### 2. Iniciar o Frontend
```bash
cd frontend
npm install
npm run dev
```

- Acesse o Dashboard em: http://localhost:5173

