import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  const fetchCartAndWishlist = async () => {
    if (!token) return;
    try {
      const cartRes = await axios.get('http://localhost:5297/api/shoppingcart');
      setCart(cartRes.data);
      const wishlistRes = await axios.get('http://localhost:5297/api/wishlist');
      setWishlist(wishlistRes.data);
    } catch (error) {
      console.error("Failed to fetch cart or wishlist", error);
    }
  };

  useEffect(() => {
    fetchCartAndWishlist();
  }, [token]);

  const value = { cart, wishlist, refreshCart: fetchCartAndWishlist };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}