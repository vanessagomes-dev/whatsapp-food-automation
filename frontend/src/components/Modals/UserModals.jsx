import { X, AlertTriangle } from "lucide-react";

// MODAL DE EDIÇÃO
export function EditUserModal({ isOpen, onClose, onSave, user, setUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Editar Usuário</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Nome</label>
            <input 
              className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={user.name} 
              onChange={e => setUser({ ...user, name: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">E-mail</label>
            <input 
              className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={user.email} 
              onChange={e => setUser({ ...user, email: e.target.value })} 
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50">Cancelar</button>
            <button onClick={onSave} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Salvar Alterações</button>
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="font-black text-slate-800 text-lg">Excluir Usuário?</h3>
        <p className="text-slate-500 text-sm mt-2">
          Tem certeza que deseja remover <b>{userName}</b>? Esta ação não pode ser desfeita no servidor.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-200">Sim, Excluir</button>
        </div>
      </div>
    </div>
  );
}