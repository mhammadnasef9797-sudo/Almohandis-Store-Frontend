import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <-- 1. تم الاستيراد
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const { token, logout } = useAuth();
  const { cart, wishlist } = useCart(); // <-- 2. تم الحصول على البيانات
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 3. تم حساب عدد المنتجات
  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistItemCount = wishlist?.length || 0;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/img/Artboard 1.png" alt="شعار شركة المهندس" />
        </Link>

        <form className="search-box">
          <input type="text" placeholder="ابحث عن المنتجات..." />
          <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
        </form>

        <div className="desktop-nav">
            <nav className="main-nav">
                <Link to="/">الرئيسية</Link>
                <Link to="/products">المنتجات</Link>
            </nav>

            <div className="header-icons">
                <Link to="/wishlist" className="icon">
                    <FontAwesomeIcon icon={faHeart} />
                    {/* ▼▼▼ 4. تم عرض العدد الديناميكي للمفضلة ▼▼▼ */}
                    {wishlistItemCount > 0 && <span className="count">{wishlistItemCount}</span>}
                </Link>
                <Link to="/cart" className="icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {/* ▼▼▼ 5. تم عرض العدد الديناميكي للسلة ▼▼▼ */}
                    {cartItemCount > 0 && <span className="count">{cartItemCount}</span>}
                </Link>
            </div>

            {token ? (
                <button onClick={handleLogout} className="btn-logout">تسجيل الخروج</button>
            ) : (
                <Link to="/login" className="btn">تسجيل الدخول</Link>
            )}
        </div>

        <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
        </button>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-header">
                <h3>القائمة</h3>
                <button className="close-toggle" onClick={() => setIsMobileMenuOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <nav className="mobile-nav-links">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</Link>
                <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>المنتجات</Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>المفضلة</Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>السلة</Link>
            </nav>
            <div className="mobile-auth-buttons">
                {token ? (
                    <button onClick={handleLogout} className="btn">تسجيل الخروج</button>
                ) : (
                    <Link to="/login" className="btn" onClick={() => setIsMobileMenuOpen(false)}>تسجيل الدخول</Link>
                )}
            </div>
        </div>
        {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
      </div>
    </header>
  );
}
export default Header;