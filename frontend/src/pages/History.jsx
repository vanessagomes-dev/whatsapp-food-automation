import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHistory } from "../services/history";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import StatusBadge from "../components/StatusBadge";
import toast from 'react-hot-toast';

export default function History() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    let isMounted = true;
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchHistory(currentPage, itemsPerPage);
        if (isMounted) {
          setMessages(data.items || []);
          setTotalItems(data.total || 0);
        }
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
        toast.error("Erro ao carregar dados.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHistory();
    return () => { isMounted = false; };
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    filteredMessages.forEach((msg) => {
      worksheet.addRow({
        timestamp: new Date(msg.timestamp).toLocaleString(),
        tipo: msg.tipo,
        mensagem: msg.mensagem,
        origem: msg.origem?.toUpperCase(),
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `historico_${Date.now()}.xlsx`);
    toast.success("Excel gerado!");
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-5 px-6 mb-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center gap-1 mb-1">
            ← Dashboard
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Histórico de Mensagens</h1>
          <p className="text-slate-500 text-xs">Consulta e exportação de logs</p>
        </div>
        <button
          onClick={exportToExcel}
          disabled={filteredMessages.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <span>📊 Exportar Excel</span>
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg whitespace-nowrap">
          {filteredMessages.length} registros nesta página
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Mensagem</th>
                <th className="px-6 py-4 text-center">Origem</th>
                <th className="px-6 py-4 text-center">Modo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 animate-pulse font-medium">Carregando dados...</td></tr>
              ) : filteredMessages.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Nenhum dado encontrado.</td></tr>
              ) : (
                filteredMessages.map((msg, index) => (
                  <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(msg.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700 capitalize">{msg.tipo?.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-slate-600 italic">"{msg.mensagem}"</td>
                    <td className="px-6 py-4 text-center"><StatusBadge value={msg.origem} type="origem" /></td>
                    <td className="px-6 py-4 text-center"><StatusBadge value={msg.modo || 'mock'} type="modo" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação Padronizada (Igual ao Dashboard) */}
      <div className="flex justify-between items-center mt-6 px-2">
        <p className="text-xs text-slate-500">Página {currentPage} de {totalPages || 1}</p>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1} 
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="px-4 py-2 border rounded-xl text-xs disabled:opacity-30"
          >
            Anterior
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0} 
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="px-4 py-2 bg-white border rounded-xl text-xs disabled:opacity-30"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
}