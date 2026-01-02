import { useEffect, useState } from "react";
import { fetchHistory } from "../services/history";

export default function History() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4">Carregando histórico...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Histórico de Mensagens
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Mensagem</th>
            <th className="border p-2">Origem</th>
            <th className="border p-2">Modo</th>
            <th className="border p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td className="border p-2">{msg.tipo}</td>
              <td className="border p-2">{msg.mensagem}</td>
              <td className="border p-2">{msg.origem}</td>
              <td className="border p-2">{msg.modo}</td>
              <td className="border p-2">
                {new Date(msg.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
