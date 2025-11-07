import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css'; // سننشئه بعد قليل

function ProductDetailPage() {
  const { id } = useParams(); // Hook لقراءة البارامترات من الرابط (مثل id)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5297/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('فشل في جلب تفاصيل المنتج.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // أعد جلب البيانات كلما تغير الـ id في الرابط

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
        <button className="btn add-to-cart-btn">أضف إلى السلة</button>
      </div>
    </div>
  );
}

export default ProductDetailPage;