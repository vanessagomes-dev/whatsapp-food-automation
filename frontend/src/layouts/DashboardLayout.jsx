import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Container da Sidebar que inclui a assinatura no rodapé */}
      <div className="flex flex-col bg-slate-900 w-64">
        <Sidebar />

        {/* Assinatura de Autoria */}
        <div className="mt-auto p-6 border-t border-slate-700/50 bg-slate-900">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
            Desenvolvido por
          </p>
          <p className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Vanessa Gomes © 2026
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
