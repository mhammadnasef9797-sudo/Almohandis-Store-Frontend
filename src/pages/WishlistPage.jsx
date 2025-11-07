import { useState, useEffect } from 'react';
import apiClient from '../api';
import ProductCard from '../components/ProductCard'; // سنعيد استخدام بطاقة المنتج
import './ProductsPage.css'; // سنعيد استخدام نفس تنسيق شبكة المنتجات

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiClient.get('/wishlist');
        // الـ API يعيد قائمة WishlistItem، ونحن نحتاج فقط للمنتج بداخلها
        const products = response.data.map(item => item.product);
        setWishlistItems(products);
      } catch (err) {
        setError('فشل في جلب قائمة المفضلة.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) return <p>جاري تحميل المفضلة...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>قائمة المفضلة</h1>
      {wishlistItems.length > 0 ? (
        <div className="products-grid">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>قائمة المفضلة فارغة حالياً.</p>
      )}
    </div>
  );
}

export default WishlistPage;