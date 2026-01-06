import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHistory } from "../services/history";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function History() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    let isMounted = true;
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchHistory();
        if (isMounted) {
          setMessages(data.items || []);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadHistory();
    return () => { isMounted = false; };
  }, []);

  // Lógica de filtro em tempo real
  const filteredMessages = messages.filter((msg) => {
    const search = searchTerm.toLowerCase();
    return (
      msg.mensagem?.toLowerCase().includes(search) ||
      msg.tipo?.toLowerCase().includes(search) ||
      msg.origem?.toLowerCase().includes(search)
    );
  });

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Histórico");
    
    worksheet.columns = [
      { header: "Data/Hora", key: "timestamp", width: 25 },
      { header: "Tipo", key: "tipo", width: 15 },
      { header: "Mensagem", key: "mensagem", width: 50 },
      { header: "Origem", key: "origem", width: 15 },
    ];

    // Exporta apenas o que está filtrado na tela!
    filteredMessages.forEach((msg) => {
      worksheet.addRow({
        timestamp: new Date(msg.timestamp).toLocaleString(),
        tipo: msg.tipo,
        mensagem: msg.mensagem,
        origem: msg.origem.toUpperCase(),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `historico_filtrado_${Date.now()}.xlsx`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Carregando...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      {/* Topo e Navegação */}
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-2">
          ← Voltar ao Dashboard
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Histórico de Mensagens</h1>
          <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            📊 Exportar {searchTerm && "Filtrados"}
          </button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar por mensagem, tipo ou origem..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-slate-500 self-center">
          Exibindo <strong>{filteredMessages.length}</strong> de {messages.length} registros
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Data/Hora</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Mensagem</th>
              <th className="px-6 py-4 text-center">Origem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {new Date(msg.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[11px] font-medium">
                      {msg.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 max-w-md truncate">
                    {msg.mensagem}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-black ${
                      msg.origem === 'api' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {msg.origem.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                  Nenhum resultado encontrado para "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}