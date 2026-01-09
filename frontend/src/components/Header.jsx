import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const navigate = useNavigate();

  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { name: "Usuário", role: "guest" };

  const handleLogout = () => {
    localStorage.removeItem("@WhatsAppFood:user");
    toast.success("Você saiu do sistema.");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-800 h-20 px-8 flex items-center justify-between shadow-sm sticky top-0 z-10 transition-colors duration-300">

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <h1 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
            WhatsApp Food Automation
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">
              Dashboard • MVP v1.0
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <div className="flex items-center gap-3 pr-6 border-r border-slate-100 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none mb-1">
              {user.name}
            </p>
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${user.role === 'admin'
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}>
              {user.role === 'admin' ? 'Administrador' : 'Funcionário'}
            </span>
          </div>
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white dark:border-slate-700">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <button onClick={handleLogout} className="group flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-xl transition-all">
          <div className="text-slate-400 group-hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-500 group-hover:text-red-600 hidden lg:block uppercase tracking-wider">
            Sair
          </span>
        </button>
      </div>
    </header>
  );
}