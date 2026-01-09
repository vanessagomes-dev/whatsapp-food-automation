import { X, AlertTriangle } from "lucide-react";

// MODAL DE EDIÇÃO
export function EditUserModal({ isOpen, onClose, onSave, user, setUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-transparent dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 dark:text-white">Editar Usuário</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Nome</label>
            <input 
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={user.name} 
              onChange={e => setUser({ ...user, name: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">E-mail</label>
            <input 
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={user.email} 
              onChange={e => setUser({ ...user, email: e.target.value })} 
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={onSave} 
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
export function DeleteConfirmModal({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center border border-transparent dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="font-black text-slate-800 dark:text-white text-lg">Excluir Usuário?</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Tem certeza que deseja remover <b>{userName}</b>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95"
          >
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
}