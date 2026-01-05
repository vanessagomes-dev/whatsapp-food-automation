import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchHistory } from "../services/history";

import MessagesByTypeChart from "../components/MessagesByTypeChart";
import MessagesByOriginChart from "../components/MessagesByOriginChart";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterOrigem, setFilterOrigem] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHistory()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  // --------------------
  // Filtros aplicados
  // --------------------
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchTipo =
        filterTipo === "all" || msg.tipo === filterTipo;

      const matchOrigem =
        filterOrigem === "all" || msg.origem === filterOrigem;

      const matchSearch =
        msg.mensagem
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

      const msgDate = new Date(msg.timestamp);

      const matchStartDate =
        !startDate || msgDate >= new Date(startDate);

      const matchEndDate =
        !endDate ||
        msgDate <= new Date(`${endDate}T23:59:59`);

      return (
        matchTipo &&
        matchOrigem &&
        matchSearch &&
        matchStartDate &&
        matchEndDate
      );
    });
  }, [
    messages,
    filterTipo,
    filterOrigem,
    searchText,
    startDate,
    endDate,
  ]);

  // --------------------
  // KPIs
  // --------------------
  const total = messages.length;
  const totalApi = messages.filter((m) => m.origem === "api").length;
  const totalScheduler = messages.filter(
    (m) => m.origem === "scheduler"
  ).length;

  const today = new Date().toDateString();
  const todayCount = messages.filter(
    (m) => new Date(m.timestamp).toDateString() === today
  ).length;

  // --------------------
  // Gráficos
  // --------------------
  const chartByType = useMemo(() => {
    return Object.values(
      filteredMessages.reduce((acc, msg) => {
        acc[msg.tipo] = acc[msg.tipo] || {
          tipo: msg.tipo,
          total: 0,
        };
        acc[msg.tipo].total += 1;
        return acc;
      }, {})
    );
  }, [filteredMessages]);

  const chartByOrigin = useMemo(() => {
    return Object.values(
      filteredMessages.reduce((acc, msg) => {
        acc[msg.origem] = acc[msg.origem] || {
          origem: msg.origem,
          total: 0,
        };
        acc[msg.origem].total += 1;
        return acc;
      }, {})
    );
  }, [filteredMessages]);

  // --------------------
  // Paginação
  // --------------------
  const totalPages = Math.ceil(
    filteredMessages.length / itemsPerPage
  );

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total de mensagens" value={total} />
        <StatCard title="Via API" value={totalApi} />
        <StatCard title="Via Scheduler" value={totalScheduler} />
        <StatCard title="Hoje" value={todayCount} />
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
            <label className="text-xs text-gray-500 mb-1 block">
              Tipo de mensagem
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={filterTipo}
              onChange={(e) => {
                setFilterTipo(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos</option>
              <option value="cafe">Café</option>
              <option value="almoco">Almoço</option>
              <option value="lanche">Lanche</option>
              <option value="jantar">Jantar</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Origem
            </label>
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
            <label className="text-xs text-gray-500 mb-1 block">
              Buscar mensagem
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Digite parte da mensagem..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Data inicial
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Data final
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Carregando dados...
        </div>
      ) : paginatedMessages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Nenhuma mensagem encontrada.
        </div>
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
              {paginatedMessages.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {item.tipo}
                  </td>
                  <td className="px-4 py-3">
                    {item.mensagem}
                  </td>
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
      {!loading && filteredMessages.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-gray-500">
            Página {currentPage} de {totalPages}
          </span>

          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
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
