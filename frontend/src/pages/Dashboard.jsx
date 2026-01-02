import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchHistory } from "../services/history";
import StatusBadge from "../components/StatusBadge";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterTipo, setFilterTipo] = useState("all");
  const [filterOrigem, setFilterOrigem] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHistory()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  // --------------------
  // Filtros
  // --------------------
  const filteredMessages = messages.filter((m) => {
    const messageDate = new Date(m.timestamp);

    if (filterTipo !== "all" && m.tipo !== filterTipo) return false;
    if (filterOrigem !== "all" && m.origem !== filterOrigem) return false;

    if (startDate && messageDate < new Date(startDate)) return false;
    if (endDate && messageDate > new Date(endDate + "T23:59:59"))
      return false;

    return true;
  });

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

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de mensagem
            </label>
            <select
              className="w-full border rounded px-3 py-2 pr-8 text-sm"
              value={filterTipo}
              onChange={(e) => {
                setFilterTipo(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos</option>
              <option value="cafe">Café da Manhã</option>
              <option value="almoco">Almoço</option>
              <option value="lanche">Lanche</option>
              <option value="jantar">Jantar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Origem
            </label>
            <select
              className="w-full border rounded px-3 py-2 pr-8 text-sm"
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
            <label className="block text-sm font-medium mb-1">
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
            <label className="block text-sm font-medium mb-1">
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
          Nenhuma mensagem encontrada com os filtros atuais.
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
