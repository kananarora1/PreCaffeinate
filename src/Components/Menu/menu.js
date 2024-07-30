import React, { useEffect, useState, useContext, } from 'react';
import './menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartContext } from '../Cart/cartContext';
import { useNavigate } from 'react-router-dom';


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menuItems');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const getItemQuantity = (id) => {
    const item = cartItems.find(item => item._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="menu-container">
      <div className="header-container">
        <h1 className="menu-header">Explore Menu</h1>
        <button className="cart-button" onClick={() => Navigate('/cart')}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
      <div className="menu-list">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item" style={{ backgroundImage: `url(${item.itemImage})` }}>
            <div className="menu-item-content">
              <h2>{item.itemName}</h2>
              <p className="item-price">Rs {item.itemPrice}</p>
            </div>
            <div className="button-container">
              {getItemQuantity(item._id) > 0 ? (
                <div className="counter">
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <span>{getItemQuantity(item._id)}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              ) : (
                <button className="add-to-cart-button" onClick={() => addToCart(item)}>
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Menu;