const mockHistory = [
  {
    id: 1,
    tipo: "almoco",
    mensagem: "🍛 Cardápio do dia disponível!",
    origem: "scheduler",
    modo: "mock",
    horario: "2026-01-02 11:30",
  },
  {
    id: 2,
    tipo: "jantar",
    mensagem: "🍕 Promoção especial hoje à noite",
    origem: "api",
    modo: "mock",
    horario: "2026-01-02 18:45",
  },
];

export function HistoryTable() {
  return (
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
          {mockHistory.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-3">{item.horario}</td>
              <td className="px-4 py-3 capitalize">{item.tipo}</td>
              <td className="px-4 py-3">{item.mensagem}</td>
              <td className="px-4 py-3">{item.origem}</td>
              <td className="px-4 py-3">{item.modo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
