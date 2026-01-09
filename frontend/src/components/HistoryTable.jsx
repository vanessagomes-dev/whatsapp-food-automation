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
    <div className="overflow-x-auto bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
          <tr>
            <th className="px-6 py-4 text-left font-bold uppercase text-[10px] tracking-widest">Horário</th>
            <th className="px-6 py-4 text-left font-bold uppercase text-[10px] tracking-widest">Tipo</th>
            <th className="px-6 py-4 text-left font-bold uppercase text-[10px] tracking-widest">Mensagem</th>
            <th className="px-6 py-4 text-left font-bold uppercase text-[10px] tracking-widest">Origem</th>
            <th className="px-6 py-4 text-left font-bold uppercase text-[10px] tracking-widest">Modo</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {mockHistory.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{item.horario}</td>
              <td className="px-6 py-4 capitalize font-bold text-slate-700 dark:text-slate-200">{item.tipo}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400 italic">"{item.mensagem}"</td>
              <td className="px-6 py-4">
                <StatusBadge type="origem" value={item.origem} />
              </td>
              <td className="px-6 py-4">
                <StatusBadge type="modo" value={item.modo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}