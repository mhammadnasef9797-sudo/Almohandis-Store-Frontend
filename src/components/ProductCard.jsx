import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faShare, faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import RatingStars from './RatingStars';
import apiClient from '../api'; // <--- 1. استيراد الملف المركزي الجديد
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cart, wishlist, refreshCart } = useCart();

  const isInCart = cart?.items?.some(item => item.productId === product.id);
  const isInWishlist = wishlist?.some(item => item.productId === product.id);

  const handleAddToCart = async () => {
    if (isInCart) return;
    try {
      // 2. استخدام apiClient بدلاً من axios وحذف الرابط الطويل
      await apiClient.post(`/shoppingcart/items?productId=${product.id}&quantity=1`);
      refreshCart();
      toast(
        <div className='toast-wrapper'>
          <img src={product.imageUrl} alt={product.name} className='toast-img'/>
          <div className="toast-content">
            <strong>{product.name}</strong>
            <span>تمت الإضافة إلى السلة!</span>
            <button className='btn' onClick={() => navigate('/cart')}>عرض السلة</button>
          </div>
        </div>
      );
    } catch (err) { toast.error("فشل في إضافة المنتج."); }
  };
  
  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        // 3. استخدام apiClient هنا أيضاً
        await apiClient.delete(`/wishlist/${product.id}`);
        toast.error('تم الحذف من المفضلة.');
      } else {
        // 4. وهنا أيضاً
        await apiClient.post(`/wishlist/${product.id}`);
        toast.success('تمت الإضافة إلى المفضلة!');
      }
      refreshCart();
    } catch (error) { toast.error('فشلت العملية.'); }
  };

  return (
    <div className={`product-card ${isInCart ? 'in-cart' : ''}`}>
      <span className="in-cart-status"><FontAwesomeIcon icon={faCheck} /> في السلة</span>

      <Link to={`/products/${product.id}`}>
        <div className="product-image-container">
            <img src={product.imageUrl || '/img/placeholder.png'} alt={product.name} className="product-image" />
        </div>
        <h3 className="product-name">{product.name}</h3>
         {product.rating > 0 && <RatingStars rating={product.rating} />} 
        <p className="product-price">{product.price.toFixed(2)} دينار</p>
      </Link>

      <div className="product-actions">
         <button onClick={handleAddToCart} className={`action-btn add-to-cart-btn`}>
            <FontAwesomeIcon icon={faCartPlus} />
         </button>
         <button onClick={handleWishlistToggle} className={`action-btn ${isInWishlist ? 'in-wishlist' : ''}`}>
            <FontAwesomeIcon icon={isInWishlist ? faHeartSolid : faHeartRegular} />
         </button>
         <button className="action-btn">
            <FontAwesomeIcon icon={faShare} />
         </button>
      </div>
    </div>
  );
}
export default ProductCard;