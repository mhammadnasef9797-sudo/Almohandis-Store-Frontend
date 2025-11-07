import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

// ▼▼▼ 1. استيراد المكونات والـ CSS من المكتبة ▼▼▼
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // ▼▼▼ 2. استخدم Fragment (<>) للسماح بوجود ToastContainer بجانب div الرئيسي ▼▼▼
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main className="container" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />

            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<h1>404: الصفحة غير موجودة</h1>} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* ▼▼▼ 3. أضف حاوية التنبيهات هنا (خارج الـ div الرئيسي) ▼▼▼ */}
      <ToastContainer
       position="bottom-left"
        autoClose={3000} // تقليل المدة قليلاً
        hideProgressBar={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // يمكنك تجربة "dark" أو "colored"
        transition={Slide} // <-- 2. أضف هذه الخاصية
      />
    </>
  );
}

export default App;