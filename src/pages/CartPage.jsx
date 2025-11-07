import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api'; // <--- 1. استيراد الملف المركزي الجديد
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      // 2. استخدام apiClient بدلاً من axios وحذف الرابط الطويل
      const response = await apiClient.get('/shoppingcart');
      setCart(response.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      // 3. استخدام apiClient هنا أيضاً
      const response = await apiClient.put(`/shoppingcart/items/${itemId}?quantity=${newQuantity}`);
      setCart(response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("فشل في تحديث الكمية.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // 4. وهنا أيضاً
      await apiClient.delete(`/shoppingcart/items/${itemId}`);
      fetchCart();
    } catch (err) {
      alert('فشل في حذف المنتج.');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  if (loading) return <p>جاري تحميل السلة...</p>;
  if (!cart || cart.items.length === 0) return <h1 style={{ textAlign: 'center' }}>سلة التسوق فارغة</h1>;

  return (
    <div className="cart-container">
      <h1>سلة التسوق</h1>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.productName} />
            <div className="item-details">
              <h3>{item.productName}</h3>
              <p className="item-price">السعر للقطعة: {item.price.toFixed(2)} دينار</p>

              <div className="quantity-control">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn decrease-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn increase-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-total">
              <p>الإجمالي: {(item.price * item.quantity).toFixed(2)} دينار</p>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>الإجمالي النهائي: {calculateTotal().toFixed(2)} دينار</h2>
        <button className="btn checkout-btn" onClick={() => navigate('/checkout')}>
           والانتقال إلى الدفع
        </button>
      </div>
    </div>
  );
}

export default CartPage;