import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('velour_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('velour_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = 'M', color = 'Dusk Black') => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      );
      if (existingIdx !== -1) {
        // Increment quantity
        return prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, size, color, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const updateQuantity = (id, size, color, qty) => {
    if (qty < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
