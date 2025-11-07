import { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '@/api.js';

// 1. إنشاء الـ Context
const AuthContext = createContext(null);

// 2. إنشاء الـ Provider (المكون الذي سيلف التطبيق)
export function AuthProvider({ children }) {
  // عند بدء التطبيق، نحاول قراءة التوكن من الـ localStorage
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  // حالة تحميل للتأكد من أننا انتهينا من التحقق من التوكن قبل عرض أي شيء
  const [loading, setLoading] = useState(true);

  // هذا الـ Hook يعمل مرة واحدة عند بدء التطبيق، ويعمل مرة أخرى كلما تغير التوكن
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('authToken');
    if (tokenFromStorage) {
      // إذا وجدنا توكن، نضعه في إعدادات axios الافتراضية
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
      setToken(tokenFromStorage);
    }
    // بعد الانتهاء من التحقق، نوقف حالة التحميل
    setLoading(false);
  }, []); // المصفوفة الفارغة تعني أنه يعمل مرة واحدة فقط

  // دالة لتسجيل الدخول
  const login = (newToken) => {
    // نضع التوكن في إعدادات axios
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    // نحفظه في localStorage
    localStorage.setItem('authToken', newToken);
    // نحدث الحالة ليتم إعادة رسم المكونات التي تعتمد عليه
    setToken(newToken);
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    // نحذف التوكن من إعدادات axios
    delete apiClient.defaults.headers.common['Authorization'];
    // نحذفه من localStorage
    localStorage.removeItem('authToken');
    // نحدث الحالة إلى null
    setToken(null);
  };

  // القيمة التي ستكون متاحة لكل المكونات الفرعية
  const value = { token, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook (طريقة مختصرة وسهلة لاستخدام الـ Context)
export function useAuth() {
  return useContext(AuthContext);
}