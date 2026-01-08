import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Autenticando...");

    try {
      // 1. CHAMADA À API: Envia para o Backend Python
      const userData = await loginUser(email, password);

      // 2. SALVA SESSÃO: Se a API respondeu 200 OK, salvamos o usuário logado
      // O userData já vem com id, name, role e permissions do backend
      localStorage.setItem("@WhatsAppFood:user", JSON.stringify({
        ...userData,
        loginAt: new Date().toISOString()
      }));

      toast.success(`Bem-vindo(a), ${userData.name}!`, { id: loadingToast });

      // 3. REDIRECIONAMENTO POR CARGO
      if (userData.role === 'admin') {
        navigate("/");
      } else {
        // Se for funcionário, verificamos se ele tem permissão de dashboard
        // caso contrário, vai direto para o histórico
        const canSeeDashboard = userData.permissions?.includes('dashboard');
        navigate(canSeeDashboard ? "/" : "/history");
      }

    } catch (err) {
      // 4. TRATAMENTO DE ERRO: Exibe a mensagem vinda do Python (E-mail ou senha incorretos)
      const errorMsg = err.response?.data?.detail || "Erro ao conectar com o servidor.";
      toast.error(errorMsg, { id: loadingToast });
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Logo */}
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