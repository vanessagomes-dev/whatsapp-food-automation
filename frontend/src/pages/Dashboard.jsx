import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchHistory } from "../services/history";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState("all");

  useEffect(() => {
    fetchHistory()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  const filteredMessages =
    filterTipo === "all"
      ? messages
      : messages.filter((m) => m.tipo === filterTipo);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Histórico de Mensagens
        </h2>

        <select
          className="border rounded px-3 py-2 text-sm"
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="cafe">Café da Manhã</option>
          <option value="almoco">Almoço</option>
          <option value="lanche">Lanche</option>
          <option value="jantar">Jantar</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Carregando dados...
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
              {filteredMessages.map((item, index) => (
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
    </DashboardLayout>
  );
}
