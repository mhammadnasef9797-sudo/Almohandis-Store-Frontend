import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api.js'; // <-- 1. استيراد الملف المركزي الجديد
import { useAuth } from './AuthContext'; // <-- 2. استيراد سياق المصادقة

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth(); // <-- 3. الحصول على معلومات المستخدم الحالي

  // 4. استخدام useCallback لتجنب إعادة إنشاء الوظيفة بدون داعٍ
  const refreshCart = useCallback(async () => {
    // لا تحاول جلب البيانات إذا لم يكن المستخدم مسجلاً دخوله
    if (!user) {
      setCart(null);
      setWishlist([]);
      return;
    }

    try {
      // 5. استخدام apiClient بدلاً من axios وحذف الروابط الطويلة
      // نستخدم Promise.all لجلب البيانات بالتوازي لتحسين الأداء
      const [cartRes, wishlistRes] = await Promise.all([
        apiClient.get('/shoppingcart'),
        apiClient.get('/wishlist')
      ]);
      
      setCart(cartRes.data);
      setWishlist(wishlistRes.data);
    } catch (error) {
      console.error("Failed to refresh cart and wishlist:", error);
      // في حالة حدوث خطأ (مثل انتهاء صلاحية التوكن)، قم بإفراغ البيانات
      setCart(null);
      setWishlist([]);
    }
  }, [user]); // <-- 6. إعادة تنفيذ الوظيفة فقط عند تغيير المستخدم (تسجيل دخول/خروج)

  // 7. جلب البيانات عند تحميل التطبيق لأول مرة أو عند تغيير المستخدم
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value = {
    cart,
    wishlist,
    refreshCart, // توفير الوظيفة لباقي المكونات لتتمكن من تحديث السلة
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 8. إنشاء "هوك" مخصص لتسهيل استخدام السياق في المكونات الأخرى
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};