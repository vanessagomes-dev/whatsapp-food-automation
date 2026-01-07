import { useState } from "react";
import { User, Shield, Lock, UserPlus, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { INITIAL_USERS } from "../data/users";

export default function Settings() {
    const userJson = localStorage.getItem("@WhatsAppFood:user");
    const currentUser = userJson ? JSON.parse(userJson) : null;

    // ESTADO DE USUÁRIOS: Garante que carregue do storage para persistir novos cadastros
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("@WhatsAppFood:all_users");
        if (saved) return JSON.parse(saved);
        return INITIAL_USERS;
    });

    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "employee" });
    const [newPassword, setNewPassword] = useState("");

    // FUNÇÃO QUE SALVA NO "BANCO" LOCAL
    const saveToDatabase = (updatedList) => {
        setUsers(updatedList);
        localStorage.setItem("@WhatsAppFood:all_users", JSON.stringify(updatedList));
    };

    // 1. ADICIONAR NOVO USUÁRIO
    const handleAddUser = (e) => {
        e.preventDefault();
        const newId = (Math.max(...users.map(u => parseInt(u.id || 0))) + 1).toString().padStart(3, '0');

        const userToAdd = {
            ...newUser,
            id: newId,
            permissions: newUser.role === 'admin' ? ['all'] : ['history']
        };

        const updated = [...users, userToAdd];
        saveToDatabase(updated);
        setShowModal(false);
        setNewUser({ name: "", email: "", password: "", role: "employee" });
        toast.success(`Usuário ${userToAdd.name} criado com sucesso!`);
    };

    // 2. ALTERAR PERMISSÕES
    const togglePermission = (userId, perm) => {
        // 1.  lista de usuários com a permissão alterada
        const updatedUsers = users.map(u => {
            if (u.id === userId) {
                const currentPerms = u.permissions || [];
                const newPerms = currentPerms.includes(perm)
                    ? currentPerms.filter(p => p !== perm)
                    : [...currentPerms, perm];             

                return { ...u, permissions: newPerms };
            }
            return u;
        });

        // 2. ATUALIZAÇÃO CRUCIAL: Salva no estado e no localStorage simultaneamente
        saveToDatabase(updatedUsers);

        // 3. Feedback visual para o usuário
        toast.success("Permissões atualizadas com sucesso!");
    };

    // 3. ALTERAR SENHA DO USUÁRIO LOGADO
    const handleUpdatePassword = () => {
        if (!newPassword) return toast.error("Digite a nova senha.");
        const updated = users.map(u => u.id === currentUser.id ? { ...u, password: newPassword } : u);
        saveToDatabase(updated);
        setNewPassword("");
        toast.success("Senha atualizada!");
    };

    // 4. REMOVER USUÁRIO
    const handleDelete = (id) => {
        if (id === currentUser.id) return toast.error("Você não pode se excluir.");
        if (confirm("Deseja realmente excluir este usuário?")) {
            const updated = users.filter(u => u.id !== id);
            saveToDatabase(updated);
            toast.success("Usuário removido.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-10">
            {/* SEÇÃO 1: MEU PERFIL */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <User className="text-indigo-600" size={20} />
                    <h2 className="font-bold text-slate-800">Meu Perfil</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Nome</label>
                        <p className="text-sm font-semibold text-slate-700">{currentUser?.name}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">ID</label>
                        <p className="text-sm font-mono text-slate-500">#{currentUser?.id}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Último Login</label>
                        <p className="text-sm text-slate-500">{currentUser?.loginAt ? new Date(currentUser.loginAt).toLocaleString() : 'Primeiro acesso'}</p>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2: ALTERAR SENHA */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4 text-slate-800">
                    <Lock size={20} className="text-indigo-600" />
                    <h2 className="font-bold">Segurança</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-600 mb-2">Nova Senha</label>
                        <input
                            type="password"
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <button onClick={handleUpdatePassword} className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all">
                        Atualizar Senha
                    </button>
                </div>
            </section>

            {/* SEÇÃO 3: GESTÃO DE EQUIPE (Apenas ADM) */}
            {currentUser?.role === 'admin' && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Shield className="text-indigo-600" size={20} />
                            <h2 className="font-bold text-slate-800">Gestão de Usuários</h2>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                        >
                            <UserPlus size={16} /> Novo Usuário
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b">
                                <tr>
                                    <th className="px-6 py-4">Usuário</th>
                                    <th className="px-6 py-4 text-center">Dashboard</th>
                                    <th className="px-6 py-4 text-center">Envio Manual</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                            {u.name} <br /><span className="text-[10px] font-normal text-slate-400">{u.email}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox"
                                                checked={u.role === 'admin' || u.permissions?.includes('dashboard')}
                                                disabled={u.role === 'admin'}
                                                onChange={() => togglePermission(u.id, 'dashboard')}
                                                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <input type="checkbox"
                                                checked={u.role === 'admin' || u.permissions?.includes('manual_test')}
                                                disabled={u.role === 'admin'}
                                                onChange={() => togglePermission(u.id, 'manual_test')}
                                                className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(u.id)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* MODAL DE CADASTRO */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Cadastrar Colaborador</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAddUser} className="p-6 space-y-4">
                            <input required type="text" placeholder="Nome" className="w-full p-3 bg-slate-50 border rounded-xl"
                                value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                            <input required type="email" placeholder="E-mail" className="w-full p-3 bg-slate-50 border rounded-xl"
                                value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                            <input required type="password" placeholder="Senha Inicial" className="w-full p-3 bg-slate-50 border rounded-xl"
                                value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                            <select className="w-full p-3 bg-slate-50 border rounded-xl" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                <option value="employee">Funcionário</option>
                                <option value="admin">Administrador</option>
                            </select>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all">Salvar Usuário</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}