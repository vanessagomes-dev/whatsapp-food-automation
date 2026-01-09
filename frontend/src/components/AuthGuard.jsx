import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children, roleRequired, permissionRequired }) {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') {
    return children;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/history" replace />; 
  }

  if (permissionRequired) {
    const hasPermission = user.permissions && user.permissions.includes(permissionRequired);
    
    if (!hasPermission) {
       
      return <Navigate to="/history" replace />;
    }
  }

  return children;
}