import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import './cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-content">
                <h2>{item.itemName}</h2>
                <p className="item-price">Rs {item.itemPrice}</p>
                <div className="cart-item-controls">
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
              <div className="cart-item-image" style={{ backgroundImage: `url(${item.itemImage})` }}></div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h2>Total Price: Rs {calculateTotalPrice()}</h2>
      </div>
    </div>
  );
};

export default Cart;
