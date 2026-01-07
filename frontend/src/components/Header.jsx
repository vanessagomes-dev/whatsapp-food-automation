import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Header() {
  const navigate = useNavigate();
  
  // 1. Buscamos os dados do usuário logado que guardamos no Login
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : { name: "Usuário", role: "guest" };

  // 2. Função para sair do sistema
  const handleLogout = () => {
    localStorage.removeItem("@WhatsAppFood:user");
    toast.success("Você saiu do sistema.");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between shadow-sm sticky top-0 z-10">
      
      {/* Lado Esquerdo: Nome do Sistema e Status */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <h1 className="text-sm font-bold text-slate-800 leading-tight">
            WhatsApp Food Automation
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Dashboard • MVP v1.0
            </span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Perfil e Botão Sair */}
      <div className="flex items-center gap-6">
        
        {/* Bloco do Usuário */}
        <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-none mb-1">
              {user.name}
            </p>
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
              user.role === 'admin' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {user.role === 'admin' ? 'Administrador' : 'Funcionário'}
            </span>
          </div>
          
          {/* Avatar (Iniciais) */}
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100 border-2 border-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Botão Logout Profissional */}
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-2 hover:bg-red-50 p-2 rounded-xl transition-all duration-200"
          title="Sair do sistema"
        >
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