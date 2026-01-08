# 💻 WhatsApp Food Automation - Frontend

Painel administrativo profissional desenvolvido para gestão de disparos e controle de equipe.

## ✨ Funcionalidades Implementadas

- **🔒 Gestão de Acesso**: Sistema de login com persistência em `localStorage`.
- **🛡️ Controle de Permissões**: 
    - Atribuição dinâmica de permissões (Visualizar Dashboard, Executar Teste Manual).
    - Proteção de rotas com `AuthGuard` e navegação inteligente.
- **👥 Gestão de Equipe**: Criação, edição de permissões e exclusão de colaboradores (Exclusivo Admin).
- **📊 Dashboard Dinâmico**: Gráficos interativos (Recharts) que respeitam o nível de acesso do usuário.
- **⚡ Envio Manual Interativo**: Botão de disparo imediato integrado à API com feedback via `react-hot-toast`.
- **📂 Exportação Profissional**: Relatórios em Excel (.xlsx) integrando filtros avançados.

## 🎨 Identidade Visual
O projeto utiliza uma estética **SaaS Moderna**:
- **Cores**: Indigo & Slate.
- **UI**: Componentes arredondados (2xl), sombras leves e tipografia clara.
- **Responsividade**: Adaptado para Desktop e Mobile.

## 🛠️ Tecnologias
- React.js 18 + Vite
- Tailwind CSS (Estilização SaaS)
- Recharts (Gráficos)
- Lucide React (Ícones)
- React Router Dom (Navegação Protegida)
- ExcelJS (Relatórios)
- Axios (Integração com API)

## 🚀 Execução
```bash
npm install
npm run dev
```