import { useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';
import { fetchHistory, sendTestMessage } from "../services/history";

import MessagesByTypeChart from "../components/MessagesByTypeChart";
import MessagesByOriginChart from "../components/MessagesByOriginChart";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  // 1. DADOS DO USUÁRIO PARA PERMISSÕES
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [messages, setMessages] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filtros de Estado
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterOrigem, setFilterOrigem] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. BUSCA DE DADOS
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchHistory(currentPage, itemsPerPage, filterTipo, filterOrigem);
        if (isMounted) {
          setMessages(data.items || []);
          setTotalItems(data.total || 0);
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        toast.error("Erro ao conectar com o servidor.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [currentPage, filterTipo, filterOrigem]);

  // 3. FILTROS LOCAIS (Search e Datas)
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchSearch = !searchText || msg.mensagem?.toLowerCase().includes(searchText.toLowerCase());
      const msgDate = new Date(msg.timestamp);
      const matchStartDate = !startDate || msgDate >= new Date(startDate);
      const matchEndDate = !endDate || msgDate <= new Date(`${endDate}T23:59:59`);
      return matchSearch && matchStartDate && matchEndDate;
    });
  }, [messages, searchText, startDate, endDate]);

  // 4. FORMATAÇÃO DE DADOS PARA OS GRÁFICOS
  const chartByTypeData = useMemo(() => {
    const counts = filteredMessages.reduce((acc, msg) => {
      const label = msg.tipo?.replace('_', ' ').toUpperCase() || "OUTROS";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredMessages]);

  const chartByOriginData = useMemo(() => {
    const counts = filteredMessages.reduce((acc, msg) => {
      const label = msg.origem?.toUpperCase() || "N/A";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredMessages]);

  // 5. KPIs
  const totalApi = useMemo(() => messages.filter((m) => m.origem === "api").length, [messages]);
  const totalScheduler = useMemo(() => messages.filter((m) => m.origem === "scheduler").length, [messages]);

  // 6. FUNÇÃO DE DISPARO MANUAL (Refinada para o Backend Python)
const handleManualSend = async () => {
  const loadingToast = toast.loading("Iniciando motor de envio no servidor...");
  try {
    // Dispara o POST /v1/send/test-now no seu api.py
    await sendTestMessage();
    
    // Aguarda 1.5s para o Python terminar de escrever no arquivo e o front atualizar
    setTimeout(async () => {
      try {
        const data = await fetchHistory(currentPage, itemsPerPage, filterTipo, filterOrigem);
        setMessages(data.items || []);
        setTotalItems(data.total || 0);
        toast.success("Mensagem disparada e registrada com sucesso!", { id: loadingToast });
      } catch (err) {
         console.error("Erro ao atualizar histórico:", err);
         toast.dismiss(loadingToast);
      }
    }, 1500);
  } catch (err) {
    console.error("Erro no disparo:", err);
    toast.error("Servidor Offline ou Erro no Motor.", { id: loadingToast });
  }
};

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClearFilters = () => {
    setFilterTipo("all");
    setFilterOrigem("all");
    setSearchText("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    toast.success("Filtros limpos!");
  };

  return (
    <div className="p-6">
      {/* HEADER COM TRAVA DE PERMISSÃO NO BOTÃO */}
      <div className="bg-white border-b border-slate-200 py-5 px-6 mb-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Painel de Automação</h1>
          <p className="text-slate-500 text-xs">Visão geral do sistema de disparos</p>
        </div>

        {/* BOTÃO SÓ APARECE SE FOR ADMIN OU TIVER A PERMISSÃO manual_test */}
        {(user?.role === 'admin' || user?.permissions?.includes('manual_test')) ? (
          <button 
            onClick={handleManualSend}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            🚀 Disparar Teste Manual
          </button>
        ) : (
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Envio Manual Bloqueado</p>
          </div>
        )}
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total no Banco" value={totalItems} color="blue" />
        <StatCard title="Via API" value={totalApi} color="indigo" />
        <StatCard title="Via Scheduler" value={totalScheduler} color="orange" />
        <StatCard title="Filtrados (pág)" value={filteredMessages.length} color="green" />
      </div>

      {/* SEÇÃO DE GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[350px]">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Mensagens por Tipo</h3>
          <div className="h-[250px] w-full">
            <MessagesByTypeChart data={chartByTypeData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[350px]">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Distribuição de Origem</h3>
          <div className="h-[250px] w-full">
            <MessagesByOriginChart data={chartByOriginData} />
          </div>
        </div>
      </div>

      {/* SEÇÃO DE FILTROS */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Filtros de Busca</h3>
          {(filterTipo !== "all" || filterOrigem !== "all" || searchText || startDate || endDate) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full shadow-sm"
            >
              <span>✕</span> Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Tipo</label>
            <select
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              value={filterTipo}
              onChange={(e) => { setFilterTipo(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">Todos</option>
              <option value="cafe_da_manha">☕ Café</option>
              <option value="almoco">🍲 Almoço</option>
              <option value="lanche_tarde">🥪 Lanche</option>
              <option value="jantar">🥗 Jantar</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Origem</label>
            <select
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              value={filterOrigem}
              onChange={(e) => { setFilterOrigem(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">Todas</option>
              <option value="api">API</option>
              <option value="scheduler">Scheduler</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Busca por mensagem</label>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              placeholder="Digite algo..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Início</label>
            <input
              type="date"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fim</label>
            <input
              type="date"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Data/Hora</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Mensagem</th>
              <th className="px-6 py-4">Origem</th>
              <th className="px-6 py-4">Modo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400 animate-pulse">Carregando...</td></tr>
            ) : filteredMessages.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Nenhum dado encontrado.</td></tr>
            ) : (
              filteredMessages.map((item, index) => (
                <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 text-slate-500">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 capitalize font-semibold">{item.tipo.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-slate-600 italic">"{item.mensagem}"</td>
                  <td className="px-6 py-4"><StatusBadge value={item.origem} type="origem" /></td>
                  <td className="px-6 py-4"><StatusBadge value={item.modo} type="modo" /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-between items-center mt-6 px-2">
        <p className="text-xs text-slate-500">Página {currentPage} de {totalPages || 1}</p>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)} 
            className="px-4 py-2 border rounded-xl text-xs disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-slate-600"
          >
            Anterior
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0} 
            onClick={() => setCurrentPage(prev => prev + 1)} 
            className="px-4 py-2 bg-white border rounded-xl text-xs disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-slate-600"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}