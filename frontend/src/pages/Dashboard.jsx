import { useEffect, useMemo, useState } from "react";
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

  // filtros
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterOrigem, setFilterOrigem] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Busca de dados (Integração com Backend)
  useEffect(() => {
    let isMounted = true;
    // Função interna para gerenciar a busca
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory(currentPage, itemsPerPage, filterTipo, filterOrigem);
      if (isMounted) {
        setMessages(data.items);
        setTotalItems(data.total);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadData();

  // Função de limpeza (cleanup)
  return () => {
    isMounted = false;
  };
}, [currentPage, filterTipo, filterOrigem]);

  // Cálculos para o Dashboard
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedMessages = messages;

  // Filtros de interface 
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchSearch = msg.mensagem
        ?.toLowerCase()
        .includes(searchText.toLowerCase());

      const msgDate = new Date(msg.timestamp);
      const matchStartDate = !startDate || msgDate >= new Date(startDate);
      const matchEndDate = !endDate || msgDate <= new Date(`${endDate}T23:59:59`);

      return matchSearch && matchStartDate && matchEndDate;
    });
  }, [messages, searchText, startDate, endDate]);

  // KPIs
  const totalApi = messages.filter((m) => m.origem === "api").length;
  const totalScheduler = messages.filter((m) => m.origem === "scheduler").length;
  const today = new Date().toDateString();
  const todayCount = messages.filter(
    (m) => new Date(m.timestamp).toDateString() === today
  ).length;

  // Gráficos
  const chartByType = useMemo(() => {
    return Object.values(
      filteredMessages.reduce((acc, msg) => {
        acc[msg.tipo] = acc[msg.tipo] || { tipo: msg.tipo, total: 0 };
        acc[msg.tipo].total += 1;
        return acc;
      }, {})
    );
  }, [filteredMessages]);

  const chartByOrigin = useMemo(() => {
    return Object.values(
      filteredMessages.reduce((acc, msg) => {
        acc[msg.origem] = acc[msg.origem] || { origem: msg.origem, total: 0 };
        acc[msg.origem].total += 1;
        return acc;
      }, {})
    );
  }, [filteredMessages]);

  const handleTestSend = async () => {
  try {
    setLoading(true);
    await sendTestMessage();
    
    // Pequena pausa para o backend processar o arquivo JSON
    setTimeout(async () => {
      const data = await fetchHistory(currentPage, itemsPerPage, filterTipo, filterOrigem);
      setMessages(data.items);
      setTotalItems(data.total);
      setLoading(false);
      alert("🚀 Mensagem de teste disparada com sucesso!");
    }, 500);

  } catch (error) {
    console.error("Erro ao disparar teste:", error);
    setLoading(false);
    alert("❌ Falha ao disparar mensagem.");
  }
};

  return (
    <DashboardLayout>
      {/* Cabeçalho com Botão de Ação */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Visão Geral</h1>
      <p className="text-slate-500 text-sm">Monitore e teste seus disparos automáticos.</p>
    </div>
    
    <button
      onClick={handleTestSend}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      <span>{loading ? "Processando..." : "Disparar Teste Agora"}</span>
      <span role="img" aria-label="rocket">🚀</span>
    </button>
  </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total no Banco" value={totalItems} />
        <StatCard title="Via API (nesta página)" value={totalApi} />
        <StatCard title="Via Scheduler (nesta página)" value={totalScheduler} />
        <StatCard title="Hoje (nesta página)" value={todayCount} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MessagesByTypeChart data={chartByType} />
        <MessagesByOriginChart data={chartByOrigin} />
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={filterTipo}
              onChange={(e) => {
                setFilterTipo(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos</option>
              <option value="cafe_da_manha">Café</option>
              <option value="almoco">Almoço</option>
              <option value="lanche_tarde">Lanche</option>
              <option value="jantar">Jantar</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Origem</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={filterOrigem}
              onChange={(e) => {
                setFilterOrigem(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todas</option>
              <option value="api">API</option>
              <option value="scheduler">Scheduler</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Buscar por Mensagem</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Digite..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Data Inicial</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Data Final</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Carregando dados...</div>
      ) : paginatedMessages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Nenhuma mensagem.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Horário</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Mensagem</th>
                <th className="px-4 py-3 text-left">Origem</th>
                <th className="px-4 py-3 text-left">Modo</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((item, index) => (
                <tr key={index} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">{item.tipo}</td>
                  <td className="px-4 py-3">{item.mensagem}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.origem} type="origem" />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.modo} type="modo" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginação */}
      {!loading && totalItems > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-gray-500">
            Página {currentPage} de {totalPages} (Total: {totalItems} registros)
          </span>

          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}