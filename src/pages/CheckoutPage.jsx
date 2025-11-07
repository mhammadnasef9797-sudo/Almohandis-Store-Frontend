import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api.js'; // <-- 1. استيراد الملف المركزي الجديد

function CheckoutPage() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // 2. استخدام apiClient بدلاً من axios وحذف الرابط الطويل
      const response = await apiClient.post(
        `/orders?shippingAddress=${encodeURIComponent(address)}`
      );
      
      setMessage(`تم إنشاء طلبك بنجاح! رقم الطلب: ${response.data.orderId}. سيتم توجيهك للصفحة الرئيسية...`);
      
      e.target.style.display = 'none';

      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (err) {
      setMessage('فشل في إنشاء الطلب. قد تكون السلة فارغة أو حدث خطأ ما.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>إتمام الطلب</h2>
      <form onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label htmlFor="address">عنوان الشحن الكامل</label>
          <textarea
            id="address"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="الرجاء إدخال المدينة، الشارع، ورقم المبنى"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'جاري إنشاء الطلب...' : 'تأكيد الطلب'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', fontWeight: 'bold', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default CheckoutPage;