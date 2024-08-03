import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/currentUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching logged-in user data:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem.quantity === 1) {
        return prevItems.filter((cartItem) => cartItem._id !== item._id);
      } else {
        return prevItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, user }}>
      {children}
    </CartContext.Provider>
  );
};
