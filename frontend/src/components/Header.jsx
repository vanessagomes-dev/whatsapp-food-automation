import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";

export function Header({ onMenuClick }) {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { name: "Usuário", role: "guest" };

  return (
    <header className="bg-gradient-to-r from-white to-slate-50 dark:from-[#1e293b] dark:to-[#1e293b] border-b border-slate-200 dark:border-slate-800 h-20 px-4 md:px-10 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
      
      {/* Botão Hambúrguer - Visível apenas em Mobile/Tablet */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-4 md:gap-6">
        <ThemeToggle />

        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none mb-1">
              {user.name}
            </p>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {user.role === 'admin' ? 'Administrador' : 'Funcionário'}
            </span>
          </div>
          
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white dark:border-slate-700">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}