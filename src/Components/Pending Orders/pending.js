import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/usercontext';
import './pending.css';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user._id) {
      setError('User not logged in');
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched orders data:', data);

          if (Array.isArray(data)) {
            const pendingOrders = data.filter(order => order.orderStatus !== 'completed');
            setOrders(pendingOrders);
          } else {
            console.error('Unexpected API response format:', data);
            setError('Unexpected response format from server.');
          }
        } else {
          console.error('Failed to fetch orders:', response.statusText);
          setError('Failed to fetch orders.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders.');
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menuItems');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched items data:', data);

          if (Array.isArray(data)) {
            setItems(data);
          } else {
            console.error('Unexpected item data format:', data);
            setError('Unexpected item data format.');
          }
        } else {
          console.error('Failed to fetch items:', response.statusText);
          setError('Failed to fetch items.');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items.');
      }
    };

    fetchOrders();
    fetchItems();
  }, [user]);

  const itemMap = items.reduce((map, item) => {
    if (item && item._id) {
      map[item._id] = item;
    }
    return map;
  }, {});

  return (
    <div className="pending-orders">
      <h1>Pending Orders</h1>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-status">
                <div className={`dot ${order.orderStatus === 'completed' ? 'still' : 'blinking'}`}></div>
                <p>{order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}</p>
              </div>
              <p className="order-price">Price: Rs {order.orderPrice}</p>
              <div className="order-items">
                {order.orderItems && order.orderItems.map(item => {
                  const itemDetails = itemMap[item.item];
                  if (!itemDetails) {
                    console.warn(`Item with ID ${item.item} not found`);
                    return null;
                  }
                  return (
                    <div key={item._id} className="order-item">
                      <img src={itemDetails.itemImage || 'default-image-url'} alt={itemDetails.name} className="item-image" />
                      <div className="item-details">
                        <p className="item-name">{itemDetails.name}</p>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="order-date">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
