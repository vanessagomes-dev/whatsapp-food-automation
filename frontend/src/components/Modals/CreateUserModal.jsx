import React from "react";
import { X } from "lucide-react";

export function CreateUserModal({ isOpen, onClose, newUser, setNewUser, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                {/* Cabeçalho */}
                <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Cadastrar Colaborador</h3>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={onSave} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Nome Completo</label>
                        <input 
                            required 
                            type="text" 
                            placeholder="Ex: João Silva" 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={newUser.name} 
                            onChange={e => setNewUser({ ...newUser, name: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">E-mail</label>
                        <input 
                            required 
                            type="email" 
                            placeholder="email@empresa.com" 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={newUser.email} 
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Senha Inicial</label>
                        <input 
                            required 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={newUser.password} 
                            onChange={e => setNewUser({ ...newUser, password: e.target.value })} 
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Nível de Acesso</label>
                        <select 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                            value={newUser.role} 
                            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="employee">Funcionário (Apenas Histórico)</option>
                            <option value="admin">Administrador (Acesso Total)</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 mt-2"
                    >
                        Salvar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
}