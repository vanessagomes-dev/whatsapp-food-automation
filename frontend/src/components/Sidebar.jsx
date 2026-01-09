import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, History, Settings as SettingsIcon, LogOut, X } from "lucide-react";
import toast from "react-hot-toast";


export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { role: "guest", permissions: [] };

  const handleLogout = () => {
    localStorage.removeItem("@WhatsAppFood:user");
    toast.success("Você saiu do sistema.");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white flex flex-col h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      
      <div className="pt-10 pb-6 px-6 flex justify-between items-start"> 
        <div>
          <h1 className="text-sm font-black text-slate-600 dark:text-indigo-400 uppercase tracking-tighter leading-none">
            WhatsApp 📲 Automation
          </h1>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">
              Dashboard • MVP v1.0
            </span>
          </div>
        </div>

        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          className="lg:hidden p-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navegação - Fecha o menu ao clicar em um link no mobile */}
      <nav 
        className="flex-1 p-4 space-y-2 mt-4" 
        onClick={() => window.innerWidth < 1024 && onClose()}
      >
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

      {/* Botão Sair */}
      <div className="px-4 py-2">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold text-sm uppercase tracking-wider"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>

      {/* Rodapé */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1">
          Desenvolvido por
        </p>
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
          Vanessa Gomes © 2026
        </p>
      </div>
    </aside>
  );
}