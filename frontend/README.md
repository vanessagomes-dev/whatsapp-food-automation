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
- **🌓 Sistema de Temas**: Alternância entre modo Light e Dark persistente, utilizando Context API e Tailwind CSS.
- **📱 Navegação Responsiva**: Sidebar inteligente com modo Drawer para dispositivos móveis.
- **🎨 UX Otimizada**: Cabeçalho clean com degradês sutis e Sidebar organizada com controle de sessão (Logout) no rodapé.

## 🎨 Identidade Visual
O projeto utiliza uma estética **SaaS Moderna**:
- **Cores**: Indigo & Slate.
- **UI**: Componentes arredondados (2xl), sombras leves e tipografia clara.
- **Responsividade**: Adaptado para Desktop e Mobile.

## 🛠️ Tecnologias
- React.js 18 (Vite)
- Context API (Gestão de Estado Global de Tema)
- Tailwind CSS (Estilização SaaS e Dark Mode)
- Recharts (Gráficos Multi-cores)
- Lucide React (Ícones e Navegação)
- React Router Dom (Navegação Protegida)
- ExcelJS (Relatórios)
- Axios (Integração com API)

## 🚀 Execução
```bash
npm install
npm run dev
```