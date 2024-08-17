import React, { useContext, useEffect } from 'react';
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
  const razorpayKey = "rzp_test_3k4tU1NXzKPP5L";


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const orderItems = cartItems.map(item => ({
      id: item._id,
      quantity: item.quantity,
    }));

    try {
      const orderResponse = await fetch('http://localhost:8080/api/orders/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderedItems: orderItems, orderedBy: user._id }),
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        const options = {
          key: razorpayKey, 
          amount: calculateTotalPrice() * 100,
          currency: 'INR',
          name: 'PreCaffeinate',
          description: 'Order Payment',
          order_id: orderData.order_id,
          handler: async function (response) {
            console.log(response);
            toast.success('Payment successful!');
            setCartItems([]);
            await fetch(`http://localhost:8080/api/orders/${orderData._id}/payment`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            setTimeout(() => {
              navigate('/pending-orders');
            }, 2000);
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
        }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Failed to create order');
        console.error('Failed to place order:', orderResponse.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      console.log(razorpayKey);
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
