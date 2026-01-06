import { useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchHistory, sendTestMessage } from "../services/history";

import MessagesByTypeChart from "../components/MessagesByTypeChart";
import MessagesByOriginChart from "../components/MessagesByOriginChart";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";

export default function Dashboard() {
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

  // 1. Busca de dados
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

  // 2. Filtros locais (Search e Datas)
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchSearch = !searchText || msg.mensagem?.toLowerCase().includes(searchText.toLowerCase());
      const msgDate = new Date(msg.timestamp);
      const matchStartDate = !startDate || msgDate >= new Date(startDate);
      const matchEndDate = !endDate || msgDate <= new Date(`${endDate}T23:59:59`);
      return matchSearch && matchStartDate && matchEndDate;
    });
  }, [messages, searchText, startDate, endDate]);

  // 3. Formatação de Dados para os Gráficos (RESOLVE O GRÁFICO EM BRANCO)
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

  // 4. KPIs
  const totalApi = useMemo(() => messages.filter((m) => m.origem === "api").length, [messages]);
  const totalScheduler = useMemo(() => messages.filter((m) => m.origem === "scheduler").length, [messages]);

  const handleTestSend = async () => {
    const loadingToast = toast.loading("Enviando mensagem de teste...");
    try {
      await sendTestMessage();
      setTimeout(async () => {
        const data = await fetchHistory(currentPage, itemsPerPage, filterTipo, filterOrigem);
        setMessages(data.items || []);
        setTotalItems(data.total || 0);
        toast.success("Mensagem disparada!", { id: loadingToast });
      }, 1000);
    } catch (err) {
      console.error("Erro no disparo:", err);
      toast.error("Falha ao enviar.", { id: loadingToast });
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 5. Limpar Filtros
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
    <DashboardLayout>
      {/* Header Modernizado */}
      <div className="bg-white border-b border-slate-200 -mt-8 -mx-8 mb-8 px-8 py-5 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Painel de Automação</h1>
          <p className="text-slate-500 text-xs">Monitore e teste seus disparos automáticos.</p>
        </div>
        <button
          onClick={handleTestSend}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <span>Disparar Teste Agora</span>
          <span className="bg-indigo-500 rounded-full p-1 text-[10px]">🚀</span>
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total no Banco" value={totalItems} color="blue" />
        <StatCard title="Via API" value={totalApi} color="indigo" />
        <StatCard title="Via Scheduler" value={totalScheduler} color="orange" />
        <StatCard title="Filtrados (pág)" value={filteredMessages.length} color="green" />
      </div>

      {/* Seção de Gráficos */}
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

      {/* Seção de Filtros */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
        {/* Cabeçalho dos Filtros com Botão de Reset */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Filtros de Busca</h3>

          {/* Botão de Limpar (Exibição condicional) */}
          {(filterTipo !== "all" || filterOrigem !== "all" || searchText || startDate || endDate) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full shadow-sm"
            >
              <span>✕</span> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid de Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Tipo */}
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

          {/* Origem */}
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

          {/* Busca por Mensagem */}
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

          {/* Data Início */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Início</label>
            <input
              type="date"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* Data Fim */}
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

      {/* Tabela */}
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

      {/* Paginação */}
      <div className="flex justify-between items-center mt-6 px-2">
        <p className="text-xs text-slate-500">Página {currentPage} de {totalPages || 1}</p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 border rounded-xl text-xs disabled:opacity-30">Anterior</button>
          <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 bg-white border rounded-xl text-xs disabled:opacity-30">Próxima</button>
        </div>
      </div>
    </DashboardLayout>
  );
}