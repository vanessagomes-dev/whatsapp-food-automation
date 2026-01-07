import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./layouts/DashboardLayout";

function HomeRedirect() {
  const storedUser = localStorage.getItem("@WhatsAppFood:user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user?.role === "admin") {
    return <Dashboard />;
  }
  return <Navigate to="/history" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={
          <AuthGuard>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </AuthGuard>
        }>
          {/* Rota Raiz: Protegida pela permissão dashboard */}
          <Route path="/" element={
            <AuthGuard permissionRequired="dashboard">
              <Dashboard />
            </AuthGuard>
          } />

          {/* Rota Configurações: Acesso livre para Perfil/Senha*/}
          <Route path="/settings" element={<Settings />} />

          <Route path="/history" element={<History />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}