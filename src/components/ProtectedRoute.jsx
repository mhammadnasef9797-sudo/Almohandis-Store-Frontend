import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // إذا لم يكن هناك توكن، وجه المستخدم إلى صفحة تسجيل الدخول
    return <Navigate to="/login" replace />;
  }

  // إذا كان هناك توكن، اعرض الصفحة المطلوبة
  return children;
}

export default ProtectedRoute;