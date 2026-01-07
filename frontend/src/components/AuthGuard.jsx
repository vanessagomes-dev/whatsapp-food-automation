import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children, roleRequired }) {
  const userJson = localStorage.getItem("@WhatsAppFood:user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />; 
  }

  return children;
}