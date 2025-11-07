import { useState, useEffect } from 'react';
import apiClient from '@/api.js';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError('يجب عليك تسجيل الدخول أولاً لعرض المنتجات.');
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
        
        // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ هذا هو السطر الجديد للتأكد من وصول البيانات ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
        console.log("Products received from API:", response.data);
        // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

      } catch (err) {
        setError('فشل في جلب المنتجات. حاول مرة أخرى.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <p>جاري تحميل المنتجات...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>جميع المنتجات</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;