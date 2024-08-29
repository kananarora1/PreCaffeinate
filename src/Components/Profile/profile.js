import React, { useEffect, useState, useContext } from 'react';
import './profile.css';
import { UserContext } from '../context/usercontext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/user/${user._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/menuItems`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchOrderHistory().finally(() => setLoading(false));
      fetchItems();
    }
  }, [user]);

  if (loading) return <p>Loading profile data...</p>;
  if (error) return <p>Error loading profile: {error}</p>;
  if (!user) return <p>No user data available. Please log in.</p>;

  const getItemNameById = (id) => {
    const item = items.find(item => item._id === id);
    return item ? item.itemName : 'Unknown Item';
  };

  const getItemPriceById = (id) => {
    const item = items.find(item => item._id === id);
    return item ? item.itemPrice : 'Unknown Item';
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.name}'s Profile</h1>
        <p className="email">Email: {user.email}</p>
      </div>
      
      <div className="order-history">
        <h2>Order History</h2>
        {orderHistory.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="order-list">
            {orderHistory.map(order => (
              <li key={order._id} className="order-item">
                <div className="order-date">
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="order-total">
                  <p>Total: Rs {order.orderPrice}</p>
                </div>
                <ul className="order-items">
                  {order.orderItems.map(item => (
                    <li key={item.item} className="order-item-detail">
                      <p><strong>Item:</strong> {getItemNameById(item.item)}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> Rs {getItemPriceById(item.item)}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
