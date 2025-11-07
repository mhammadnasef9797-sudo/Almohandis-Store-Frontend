import { useState } from 'react';
import apiClient from '@/api.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiClient.post('/users/login', {
        email: email,
        password: password
      });
      
      // -- التعديل هنا --
      // 1. حفظ التوكن في الذاكرة (AuthContext)
      login(response.data.token);
      
      // 2. توجيه المستخدم إلى صفحة المنتجات بعد نجاح الدخول
      navigate('/products');

    } catch (err) {
      console.error('Login failed:', err);
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="form-container">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn">تسجيل الدخول</button>
      </form>

      
      {/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ أضف هذا الجزء الجديد هنا ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        ليس لديك حساب؟ <Link to="/register" style={{ color: '#ff8716', textDecoration: 'none' }}>أنشئ حساباً جديداً</Link>
      </p>
      {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ نهاية الجزء الجديد ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
    </div>
  );
}

export default LoginPage;