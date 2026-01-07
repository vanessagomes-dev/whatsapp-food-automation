import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children, roleRequired, permissionRequired }) {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : null;

  // 1. Se não houver usuário logado, vai para o login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Lógica de Administrador: Adm sempre tem acesso a tudo
  if (user.role === 'admin') {
    return children;
  }

  // 3. Verificação de CARGO (ex: se a rota exigir apenas 'admin')
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/history" replace />; 
  }

  // 4. Verificação de PERMISSÃO (ex: 'dashboard' ou 'manual_test')
  if (permissionRequired) {
    const hasPermission = user.permissions && user.permissions.includes(permissionRequired);
    
    if (!hasPermission) {
       
      return <Navigate to="/history" replace />;
    }
  }

  return children;
}