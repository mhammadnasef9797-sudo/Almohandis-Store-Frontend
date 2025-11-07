import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '@/api.js'; // استيراد الملف المركزي
import { useCart } from '../context/CartContext'; // <-- 1. استيراد سياق السلة
import { toast } from 'react-toastify'; // <-- 2. استيراد إشعارات التوست
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. الحصول على معلومات السلة ووظيفة تحديثها من السياق
  const { cart, refreshCart } = useCart();
  const isInCart = cart?.items?.some(item => item.productId === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('فشل في جلب تفاصيل المنتج.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 4. وظيفة كاملة لإضافة المنتج إلى السلة
  const handleAddToCart = async () => {
    if (isInCart) {
        toast.info('المنتج موجود بالفعل في السلة.');
        return;
    }
    if (!product) return; // التأكد من أن المنتج قد تم تحميله

    try {
      await apiClient.post(`/shoppingcart/items?productId=${product.id}&quantity=1`);
      refreshCart(); // تحديث حالة السلة في كل التطبيق (لتحديث الأيقونة في الهيدر مثلاً)
      toast.success(`"${product.name}" تمت إضافته إلى السلة بنجاح!`);
    } catch (err) {
      toast.error("فشل في إضافة المنتج إلى السلة.");
    }
  };

  if (loading) return <p>جاري تحميل المنتج...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>لم يتم العثور على المنتج.</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toFixed(2)} دينار</p>
        <div className="description">
          <h3>الوصف:</h3>
          <p>{product.description}</p>
        </div>
        
        {/* 5. الزر الآن مربوط بالوظيفة وحالته تتغير ديناميكياً */}
        <button 
          onClick={handleAddToCart} 
          className={`btn add-to-cart-btn ${isInCart ? 'disabled' : ''}`}
          disabled={isInCart}
        >
          {isInCart ? 'موجود في السلة' : 'أضف إلى السلة'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;