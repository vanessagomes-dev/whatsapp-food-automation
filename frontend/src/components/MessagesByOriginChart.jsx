import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  api: "#22c55e",
  scheduler: "#3b82f6",
};

export default function MessagesByOriginChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Sem dados para exibir
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-sm font-semibold mb-4">
        Mensagens por origem
      </h3>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="origem"
              label
            >
              {data.map((entry) => (
                <Cell
                  key={entry.origem}
                  fill={COLORS[entry.origem] || "#64748b"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
