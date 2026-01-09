import { X } from "lucide-react";

export function CreateUserModal({ isOpen, onClose, newUser, setNewUser, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-transparent dark:border-slate-800 animate-in fade-in zoom-in duration-200">
                {/* Cabeçalho */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-white">Cadastrar Colaborador</h3>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={onSave} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">Nome Completo</label>
                        <input 
                            required 
                            type="text" 
                            placeholder="Ex: João Silva" 
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={newUser.name} 
                            onChange={e => setNewUser({ ...newUser, name: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">E-mail</label>
                        <input 
                            required 
                            type="email" 
                            placeholder="email@empresa.com" 
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={newUser.email} 
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">Senha Inicial</label>
                        <input 
                            required 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={newUser.password} 
                            onChange={e => setNewUser({ ...newUser, password: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 ml-1">Nível de Acesso</label>
                        <select 
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none" 
                            value={newUser.role} 
                            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="employee" className="dark:bg-slate-800">Funcionário (Apenas Histórico)</option>
                            <option value="admin" className="dark:bg-slate-800">Administrador (Acesso Total)</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none mt-2 active:scale-[0.98]"
                    >
                        Salvar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
}