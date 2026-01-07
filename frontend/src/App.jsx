import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";

export default function App() {
  return (
    <BrowserRouter>
      {/* Configuração de notificações flutuantes */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#334155',
            color: '#fff',
            fontSize: '14px',
          },
        }}
      />

      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota do Dashboard: Apenas para Administradores */}
        <Route 
          path="/" 
          element={
            <AuthGuard roleRequired="admin">
              <Dashboard />
            </AuthGuard>
          } 
        />

        {/* Rota do Histórico: Acesso Geral (ADM e Funcionário) */}
        <Route 
          path="/history" 
          element={
            <AuthGuard>
              <History />
            </AuthGuard>
          } 
        />

        {/* Redirecionamento de rotas inexistentes para o Dashboard ou Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
