import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCartCount = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItemsCount(0);
      return;
    }

    try {
      const response = await api.get('/cart');
      const items = response.data.cart?.items || [];
      // Calculate total quantity of all items
      const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartItemsCount(totalQuantity);
    } catch (error) {
      // If cart doesn't exist or error, set count to 0
      setCartItemsCount(0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartCount();
    } else {
      setCartItemsCount(0);
    }
  }, [isAuthenticated, fetchCartCount]);

  const updateCartCount = async () => {
    await fetchCartCount();
  };

  const value = {
    cartItemsCount,
    updateCartCount,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

