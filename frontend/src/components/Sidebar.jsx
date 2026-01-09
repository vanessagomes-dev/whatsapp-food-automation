import { NavLink } from "react-router-dom";
import { LayoutDashboard, History, Settings as SettingsIcon } from "lucide-react";

export default function Sidebar() {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { role: "guest", permissions: [] };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white flex flex-col h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <span className="bg-indigo-600 p-1.5 rounded-lg text-sm text-white">🍽️</span>
          <span className="tracking-tight">WhatsApp Food</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
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

        <NavLink to="/settings" className={navLinkClass}>
          <SettingsIcon size={20} />
          <span>Configurações</span>
        </NavLink>
      </nav>

      {/* Rodapé */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
          Desenvolvido por
        </p>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
          Vanessa Gomes | Full Stack © 2026
        </p>
      </div>
    </aside>
  );
}