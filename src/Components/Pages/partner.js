import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import { Button, message } from 'antd';
import './partner.css';

const PartnerPage = () => {
  const { user } = useContext(UserContext);
  const [unapprovedOrders, setUnapprovedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUnapprovedOrders(data.filter(order => order.orderStatus === 'ordered'));
          setPendingOrders(data.filter(order => order.orderStatus === 'preparing'));
          setPreparedOrders(data.filter(order => order.orderStatus === 'prepared'));
          setCompletedOrders(data.filter(order => order.orderStatus === 'completed'));
        } else {
          throw new Error(data.message || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        message.error('Failed to fetch orders');
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/menuItems', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMenuItems(data);
        } else {
          throw new Error('Failed to fetch menu items');
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
        message.error('Failed to fetch menu items');
      }
    };

    const fetchData = async () => {
      if (user.role === 'partner') {
        await fetchOrders();
        await fetchMenuItems();
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getNameById = (id) => {
    const item = menuItems.find(item => item._id === id);
    return item ? item.itemName : 'Unknown Item';
  };

  const handleAction = async (orderId, action) => {
    let newStatus;
    switch (action) {
      case 'approve':
        newStatus = 'preparing';
        break;
      case 'prepared':
        newStatus = 'prepared';
        break;
      case 'pickedup':
        newStatus = 'completed';
        break;
      default:
        message.error('Invalid action');
        return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = unapprovedOrders.find(order => order._id === orderId)
                      || pendingOrders.find(order => order._id === orderId)
                      || preparedOrders.find(order => order._id === orderId);

        if (newStatus === 'preparing') {
          setPendingOrders(prevOrders => [...prevOrders, { ...updatedOrder, orderStatus: newStatus }]);
          setUnapprovedOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } else if (newStatus === 'prepared') {
          setPreparedOrders(prevOrders => [...prevOrders, { ...updatedOrder, orderStatus: newStatus }]);
          setPendingOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } else if (newStatus === 'completed') {
          setCompletedOrders(prevOrders => [...prevOrders, { ...updatedOrder, orderStatus: newStatus }]);
          setPreparedOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        }

        message.success(`Order status updated to ${newStatus}`);
      } else {
        const data = await response.json();
        message.error(`Failed to update order status: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      message.error('Failed to update order status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="partner-page">
      <h1>Your Orders</h1>
      <Button onClick={handleLogout} type="primary" danger>Logout</Button>
      
      {/* Section for Unapproved Orders */}
      <div className="unapproved-orders">
        <h2>New Orders</h2>
        {unapprovedOrders.length === 0 ? (
          <p>No new orders to manage at this time.</p>
        ) : (
          <ul>
            {unapprovedOrders.map((order) => (
              <li key={order._id} className="order-item">
                <div>
                  <h3>Order ID: {order._id}</h3>
                  <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p>Order Price: Rs{order.orderPrice.toFixed(2)}</p>
                  <div className="order-details">
                    <h4>Ordered Items:</h4>
                    <ul>
                      {order.orderItems.map((orderItem, index) => (
                        <li key={index}>
                          Item: {getNameById(orderItem.item)}, Quantity: {orderItem.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button type="primary" onClick={() => handleAction(order._id, 'approve')}>Approve</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Columns for Pending, Prepared, and Completed Orders */}
      <div className="orders-container">
        <div className="orders-column">
          <h2>Pending Orders</h2>
          {pendingOrders.length === 0 ? (
            <p>No pending orders to manage at this time.</p>
          ) : (
            <ul>
              {pendingOrders.map((order) => (
                <li key={order._id} className="order-item">
                  <div>
                    <h3>Order ID: {order._id}</h3>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Order Price: Rs{order.orderPrice.toFixed(2)}</p>
                    <div className="order-details">
                      <h4>Ordered Items:</h4>
                      <ul>
                        {order.orderItems.map((orderItem, index) => (
                          <li key={index}>
                            Item: {getNameById(orderItem.item)}, Quantity: {orderItem.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button type="primary" onClick={() => handleAction(order._id, 'prepared')}>Mark as Prepared</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="orders-column">
          <h2>Prepared Orders</h2>
          {preparedOrders.length === 0 ? (
            <p>No prepared orders at this time.</p>
          ) : (
            <ul>
              {preparedOrders.map((order) => (
                <li key={order._id} className="order-item">
                  <div>
                    <h3>Order ID: {order._id}</h3>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Order Price: Rs{order.orderPrice.toFixed(2)}</p>
                    <div className="order-details">
                      <h4>Ordered Items:</h4>
                      <ul>
                        {order.orderItems.map((orderItem, index) => (
                          <li key={index}>
                            Item: {getNameById(orderItem.item)}, Quantity: {orderItem.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button type="primary" onClick={() => handleAction(order._id, 'pickedup')}>Mark as Picked Up</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="orders-column">
          <h2>Completed Orders</h2>
          {completedOrders.length === 0 ? (
            <p>No completed orders at this time.</p>
          ) : (
            <ul>
              {completedOrders.map((order) => (
                <li key={order._id} className="order-item">
                  <div>
                    <h3>Order Price: Rs{order.orderPrice.toFixed(2)}</h3>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <div className="order-details">
                      <h4>Ordered Items:</h4>
                      <ul>
                        {order.orderItems.map((orderItem, index) => (
                          <li key={index}>
                            Item: {getNameById(orderItem.item)}, Quantity: {orderItem.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
