import { useState } from "react";
import { User, Shield, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";
import { INITIAL_USERS } from "../data/users";

export default function Settings() {
    const userJson = localStorage.getItem("@WhatsAppFood:user");
    const currentUser = userJson ? JSON.parse(userJson) : null;

    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem("@WhatsAppFood:employees");
      
        return saved ? JSON.parse(saved) : INITIAL_USERS.filter(u => u.role === 'employee');
    });
    const togglePermission = (empId, permission) => {
        const updated = employees.map(emp => {
            if (emp.id === empId) {
                const hasPermission = emp.permissions.includes(permission);
                const newPerms = hasPermission
                    ? emp.permissions.filter(p => p !== permission)
                    : [...emp.permissions, permission];
                return { ...emp, permissions: newPerms };
            }
            return emp;
        });
        setEmployees(updated);
        localStorage.setItem("@WhatsAppFood:employees", JSON.stringify(updated));
        toast.success("Permissão atualizada!");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* SEÇÃO 1: DADOS PESSOAIS (Todos vêem) */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <User className="text-indigo-600" size={20} />
                    <h2 className="font-bold text-slate-800">Meus Dados</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Nome</label>
                        <p className="text-sm font-semibold text-slate-700">{currentUser.name}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">ID Usuário</label>
                        <p className="text-sm font-mono text-slate-500">#{currentUser.id}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Último Login</label>
                        <p className="text-sm text-slate-500">{new Date(currentUser.loginAt).toLocaleString()}</p>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2: ALTERAR SENHA (Todos vêem) */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 text-slate-800">
                    <Lock size={20} className="text-indigo-600" />
                    <h2 className="font-bold">Segurança</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Nova Senha</label>
                        <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    </div>
                    <button className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-900 transition-all">
                        Atualizar Senha
                    </button>
                </div>
            </section>

            {/* SEÇÃO 3: GESTÃO DE PERMISSÕES (Apenas ADM) */}
            {currentUser.role === 'admin' && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                        <Shield className="text-indigo-600" size={20} />
                        <h2 className="font-bold text-slate-800">Permissões de Funcionários</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                                    <th className="px-6 py-4">Funcionário</th>
                                    <th className="px-6 py-4 text-center">Dashboard</th>
                                    <th className="px-6 py-4 text-center">Envio Manual</th>
                                    <th className="px-6 py-4 text-center">Editar Conteúdo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {employees.map(emp => (
                                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-700">{emp.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {emp.id}</p>
                                        </td>
                                        {['dashboard', 'send_manual', 'edit_content'].map(perm => (
                                            <td key={perm} className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={emp.permissions.includes(perm)}
                                                    onChange={() => togglePermission(emp.id, perm)}
                                                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}