import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, setCartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const orderItems = cartItems.map(item => ({
      id: item._id,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch('http://localhost:8080/api/orders/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderedItems: orderItems, orderedBy: user._id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
        toast.success('Order placed successfully!');
        setCartItems([]);
        setTimeout(() => {
          navigate('/pending-orders');
        }, 2000); // Wait for the toast to finish
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
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
      {cartItems.length > 0 && (
        <div className="order-container">
          <button className="order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
