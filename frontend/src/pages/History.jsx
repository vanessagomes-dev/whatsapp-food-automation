import DashboardLayout from "../layouts/DashboardLayout";

export default function History() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Histórico de Mensagens</h2>

        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Mensagem</th>
              <th className="p-2 border">Horário</th>
              <th className="p-2 border">Modo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">teste_now</td>
              <td className="p-2 border">🚀 TESTE NOW — Automação WhatsApp</td>
              <td className="p-2 border">10:04</td>
              <td className="p-2 border">mock</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
