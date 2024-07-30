// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from './cartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.itemName} - Rs {item.itemPrice} x {item.quantity}
            <button onClick={() => removeFromCart(item)}>-</button>
            <button onClick={() => addToCart(item)}>+</button>
          </li>
        ))}
      </ul>
      <h3>Total: Rs {cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0)}</h3>
    </div>
  );
};

export default Cart;
