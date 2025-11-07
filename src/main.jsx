import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. استيراد المكون
import './index.css'; 
import { AuthProvider } from './context/AuthContext'; // <-- 1. استيراد
import { CartProvider } from './context/CartContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider> {/* <-- 2. لف التطبيق به */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);