import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MessagesByTypeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Sem dados para exibir o gráfico
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-sm font-semibold mb-4">
        Mensagens por tipo
      </h3>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="tipo" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
