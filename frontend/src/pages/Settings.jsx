import { useState, useEffect } from "react";
import { User, Shield, Lock, UserPlus, Trash2, X, Edit2 } from "lucide-react";
import { Clock, Terminal, RefreshCw } from "lucide-react";
import { fetchSchedules, updateSchedules, fetchLogs } from "../services/system";
import toast from "react-hot-toast";
import { fetchUsers, createUser, updateAllUsers } from "../services/auth";
import { EditUserModal, DeleteConfirmModal } from "../components/Modals/UserModals";
import { CreateUserModal } from "../components/Modals/CreateUserModal";

export default function Settings() {
    // 1. Pegamos o usuário logado para saber se é Admin
    const userJson = localStorage.getItem("@WhatsAppFood:user");
    const currentUser = userJson ? JSON.parse(userJson) : null;

    // 2. Estados
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "employee" });
    const [newPassword, setNewPassword] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const [schedules, setSchedules] = useState({
        cafe_da_manha: "08:00",
        almoco: "12:00",
        lanche_tarde: "16:00",
        jantar: "19:00"
    });
    const [logs, setLogs] = useState("Carregando logs...");
    const [isSavingSchedule, setIsSavingSchedule] = useState(false);

    // EFEITO PARA CARREGAR TUDO AO INICIAR
    useEffect(() => {
        const loadSystemData = async () => {
            try {
                const schedData = await fetchSchedules();
                if (schedData && Object.keys(schedData).length > 0) setSchedules(schedData);

                const logData = await fetchLogs();
                setLogs(logData);

                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                console.error("Erro ao carregar dados do sistema", err);
                toast.error("Erro ao sincronizar com o servidor.");
            } finally {
                setLoading(false);
            }
        };

        loadSystemData();

        const logInterval = setInterval(async () => {
            try {
                const latestLogs = await fetchLogs();
                setLogs(latestLogs);
            } catch { /* silencia */ }
        }, 5000);

        return () => clearInterval(logInterval);
    }, []);

    // FUNÇÕES DE MANIPULAÇÃO
    const handleSaveSchedules = async () => {
        setIsSavingSchedule(true);
        try {
            await updateSchedules(schedules);
            toast.success("Horários atualizados com sucesso!");
        } catch (err) {
            console.error("Erro ao salvar horários:", err);
            toast.error("Erro ao salvar horários.");
        } finally {
            setIsSavingSchedule(false);
        }
    };

    const saveToDatabase = async (updatedList) => {
        try {
            await updateAllUsers(updatedList);
            setUsers(updatedList);
            localStorage.setItem("@WhatsAppFood:all_users", JSON.stringify(updatedList));
        } catch (err) {
            console.error("Erro ao salvar:", err);
            toast.error("Erro ao gravar dados no servidor.");
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Salvando no servidor...");
        const newId = (Math.max(...users.map(u => parseInt(u.id || 0)), 0) + 1).toString().padStart(3, '0');

        const userToAdd = {
            ...newUser,
            id: newId,
            permissions: newUser.role === 'admin' ? ['dashboard', 'manual_test'] : ['history']
        };

        try {
            await createUser(userToAdd);
            setUsers([...users, userToAdd]);
            setShowModal(false);
            setNewUser({ name: "", email: "", password: "", role: "employee" });
            toast.success(`Usuário ${userToAdd.name} criado com sucesso!`, { id: loadingToast });
        } catch (err) {
            console.error("Erro ao criar usuário:", err);
            toast.error("Erro ao criar usuário no servidor.", { id: loadingToast });
        }
    };

    const togglePermission = async (userId, perm) => {
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
        await saveToDatabase(updatedUsers);
    };

    const handleUpdatePassword = async () => {
        if (!newPassword) return toast.error("Digite a nova senha.");
        const updated = users.map(u =>
            u.id === currentUser.id ? { ...u, password: newPassword } : u
        );
        const loadingToast = toast.loading("Atualizando senha...");
        try {
            await saveToDatabase(updated);
            setNewPassword("");
            toast.success("Senha atualizada!", { id: loadingToast });
        } catch {
            toast.error("Erro ao atualizar senha.", { id: loadingToast });
        }
    };

    const handleEditSave = async () => {
        const updated = users.map(u => u.id === editingUser.id ? editingUser : u);
        await saveToDatabase(updated);
        setEditingUser(null);
        toast.success("Usuário atualizado!");
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        const updated = users.filter(u => u.id !== userToDelete.id);
        await saveToDatabase(updated);
        setUserToDelete(null);
        toast.success("Usuário removido.");
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center flex-col gap-4">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Sincronizando com o servidor...</p>
            </div>
        );
    }

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
                        <p className="text-sm text-slate-500">
                            {currentUser?.loginAt ? new Date(currentUser.loginAt).toLocaleString() : 'Primeiro acesso'}
                        </p>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 2: SEGURANÇA */}
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

            {/* SEÇÃO 3: AGENDAMENTOS (ADM) */}
            {currentUser?.role === 'admin' && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                        <Clock className="text-indigo-600" size={20} />
                        <h2 className="font-bold text-slate-800">Agendamentos de Disparo</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        {Object.keys(schedules).map((key) => (
                            <div key={key}>
                                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                                    {key.replace(/_/g, ' ')}
                                </label>
                                <input
                                    type="time"
                                    className="w-full p-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={schedules[key]}
                                    onChange={(e) => setSchedules({ ...schedules, [key]: e.target.value })}
                                />
                            </div>
                        ))}
                        <div className="md:col-span-4 flex justify-end mt-2">
                            <button
                                onClick={handleSaveSchedules}
                                disabled={isSavingSchedule}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {isSavingSchedule ? "Salvando..." : "Salvar Agendamentos"}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* SEÇÃO 4: LOGS (ADM) */}
            {currentUser?.role === 'admin' && (
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Terminal className="text-indigo-600" size={20} />
                            <h2 className="font-bold text-slate-800">Logs da Automação</h2>
                        </div>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <RefreshCw size={10} className="animate-spin" /> Atualizando em tempo real
                        </span>
                    </div>
                    <div className="p-4 bg-slate-900 m-6 rounded-xl">
                        <pre className="text-xs text-green-400 font-mono h-48 overflow-y-auto whitespace-pre-wrap">
                            {logs}
                        </pre>
                    </div>
                </section>
            )}

            {/* SEÇÃO 5: GESTÃO DE USUÁRIOS (ADM) */}
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
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => setEditingUser(u)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => setUserToDelete(u)} className="p-2 text-red-400 hover:text-red-600 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* MODAL DE CADASTRO */}
            <CreateUserModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                newUser={newUser}
                setNewUser={setNewUser}
                onSave={handleAddUser}
            />

            {/* MODAL DE EDIÇÃO */}
            <EditUserModal
                isOpen={!!editingUser}
                onClose={() => setEditingUser(null)}
                user={editingUser || {}}
                setUser={setEditingUser}
                onSave={handleEditSave}
            />

            {/* MODAL DE EXCLUSÃO */}
            <DeleteConfirmModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={confirmDelete}
                userName={userToDelete?.name}
            />
        </div>
    );
}