import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0f172a] overflow-hidden transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}