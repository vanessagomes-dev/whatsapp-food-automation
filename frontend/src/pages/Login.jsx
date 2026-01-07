import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de autenticação (Mock)
    if (email === "adm@food.com" && password === "123456") {
      const user = { id: 1, name: "Vanessa ADM", role: "admin", loginAt: new Date().toISOString() };
      localStorage.setItem("@WhatsAppFood:user", JSON.stringify(user));
      toast.success("Bem-vinda, Administradora!");
      navigate("/");
    } else if (email === "user@food.com" && password === "123456") {
      const user = { id: 2, name: "Funcionario Silva", role: "employee", loginAt: new Date().toISOString() };
      localStorage.setItem("@WhatsAppFood:user", JSON.stringify(user));
      toast.success("Login realizado com sucesso!");
      navigate("/history");
    } else {
      toast.error("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Logo/Icon */}
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg shadow-indigo-200">
            <span className="text-2xl">🍽️</span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Acesse o Painel</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Insira suas credenciais para continuar</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">E-mail</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm bg-slate-50"
                placeholder="exemplo@food.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Senha</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm bg-slate-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
            >
              Entrar no Sistema
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 py-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-medium">Vanessa Gomes © 2026</p>
        </div>
      </div>
    </div>
  );
}