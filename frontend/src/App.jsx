import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas que USAM o Layout */}
        <Route
          element={
            <AuthGuard>
              <DashboardLayout>
                <Outlet /> {/* O Outlet renderiza a página atual aqui dentro */}
              </DashboardLayout>
            </AuthGuard>
          }
        >
          {/* O Dashboard exige ser Admin */}
          <Route path="/" element={
            <AuthGuard roleRequired="admin">
              <Dashboard />
            </AuthGuard>
          } />
          
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}