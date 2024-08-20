import React, { useEffect, useState, useContext } from 'react';
import './menu.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartContext } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const Navigate = useNavigate();
  const categories = ['All', 'Noodles' , 'Beverages' , 'Snacks' , 'Sandwich'];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menuItems');
        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.itemCategory === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  const getItemQuantity = (id) => {
    const item = cartItems.find(item => item._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="menu-container">
      <div className="header-container">
        <h1 className="menu-header">Explore Menu</h1>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredItems.map((item) => (
          <div key={item._id} className="menu-item">
            <div
              className="menu-item-image"
              style={{ backgroundImage: `url(${item.itemImage})` }}
            ></div>
            <div className="menu-item-footer">
              <h2 className="menu-item-title">{item.itemName}</h2>
              <p className="item-price">Rs {item.itemPrice}</p>
              <div className="button-container">
                {item.itemAvailable ? (
                  getItemQuantity(item._id) > 0 ? (
                    <div className="counter">
                      <button onClick={() => removeFromCart(item)}>-</button>
                      <span>{getItemQuantity(item._id)}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  ) : (
                    <button 
                      className="add-to-cart-button" 
                      onClick={() => addToCart(item)}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  )
                ) : (
                  <button className="add-to-cart-button" disabled>
                    <i className="fas fa-shopping-cart"></i> Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
