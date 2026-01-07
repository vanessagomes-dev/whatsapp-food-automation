import { NavLink } from "react-router-dom";
import { LayoutDashboard, History } from "lucide-react";
import { Settings as SettingsIcon } from "lucide-react";

export default function Sidebar() {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { role: "guest", permissions: [] };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      {/* Logo e Nome do Sistema */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-indigo-600 p-1.5 rounded-lg text-sm">🍽️</span>
          <span className="tracking-tight">WhatsApp Food</span>
        </h1>
      </div>

      {/* Menu de Navegação Dinâmico */}
      <nav className="flex-1 p-4 space-y-2">
        
        {/* Dashboard: Aparece se for Admin OU tiver permissão 'dashboard' */}
        {(user.role === "admin" || user.permissions?.includes("dashboard")) && (
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        )}

        <NavLink to="/history" className={navLinkClass}>
          <History size={20} />
          <span>Histórico</span>
        </NavLink>

        {/* Configurações: Sempre visível para todos (para poderem trocar senha), 
            mas o conteúdo interno será bloqueado pelo AuthGuard se não for admin */}
        <NavLink to="/settings" className={navLinkClass}>
          <SettingsIcon size={20} />
          <span>Configurações</span>
        </NavLink>

      </nav>

      {/* Rodapé da Sidebar com Assinatura */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">
          Desenvolvido por
        </p>
        <p className="text-xs text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
          Vanessa Gomes | Full Stack © 2026
        </p>
      </div>
    </aside>
  );
}