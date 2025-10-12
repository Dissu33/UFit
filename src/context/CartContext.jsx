import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Helper function to get the current quantity of a product
  const getProductQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Notification Logic (Updated to reflect one added item)
    setNotificationMessage(`${product.name} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (!existingItem) return prevItems;
      
      if (existingItem.quantity === 1) {
        // Remove item if quantity drops to 0
        return prevItems.filter(item => item.id !== productId);
      } else {
        // Decrease quantity
        return prevItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    decreaseQuantity, // <-- NEW
    getProductQuantity, // <-- NEW
    showNotification,
    notificationMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};