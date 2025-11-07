import { useState } from 'react';
import apiClient from '../api.js';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/users/register', formData);
      alert('تم إنشاء الحساب بنجاح! سيتم توجيهك لصفحة تسجيل الدخول.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'فشل في إنشاء الحساب.');
    }
  };

  return (
    <div className="form-container">
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">الاسم الأول</label>
          <input type="text" id="firstName" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">الاسم الأخير</label>
          <input type="text" id="lastName" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input type="email" id="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">رقم الهاتف</label>
          <input type="tel" id="phoneNumber" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input type="password" id="password" onChange={handleChange} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn">إنشاء الحساب</button>
      </form>
    </div>
  );
}

export default RegisterPage;