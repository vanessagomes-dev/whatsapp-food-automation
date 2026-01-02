import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Mensagens enviadas" value="12" />
        <StatCard title="Último envio" value="02/01 10:04" />
        <StatCard title="Modo ativo" value="Mock" />
      </div>
    </DashboardLayout>
  );
}
