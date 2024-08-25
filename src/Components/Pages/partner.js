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
  const [restaurantOpen, setRestaurantOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for restaurant open status
    const storedRestaurantOpen = localStorage.getItem('restaurantOpen');
    if (storedRestaurantOpen !== null) {
      setRestaurantOpen(JSON.parse(storedRestaurantOpen));
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders`, {
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/menuItems`, {
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/orders/${orderId}`, {
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

  const updateMenuItemsAvailability = async (available) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/menuItems/updateAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ itemAvailable: available }), 
      });
  
      if (response.ok) {
        const updatedMenuItems = menuItems.map(item => ({ ...item, itemAvailable: available }));
        setMenuItems(updatedMenuItems);
        message.success(`Menu items updated to ${available ? 'available' : 'not available'}`);
      } else {
        const data = await response.json();
        message.error(`Failed to update menu items: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to update menu items:', error);
      message.error('Failed to update menu items');
    }
  };
  

  const handleCloseRestaurant = async () => {
    setRestaurantOpen(false);
    localStorage.setItem('restaurantOpen', false);
    await updateMenuItemsAvailability(false);
  };

  const handleOpenRestaurant = async () => {
    setRestaurantOpen(true);
    localStorage.setItem('restaurantOpen', true);
    await updateMenuItemsAvailability(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="partner-page">
      <div className='header'>
        <h1>Your Orders</h1>
        <Button className='log-btn' onClick={handleLogout} type="primary" danger>Logout</Button>
        {restaurantOpen ? (
          <Button className='close-btn' onClick={handleCloseRestaurant} type="default">Close My Restaurant</Button>
        ) : (
          <Button className='open-btn' onClick={handleOpenRestaurant} type="default">Open My Restaurant</Button>
        )}
        <Button type="primary" onClick={() => navigate('/manage-menu')}>Update Menu</Button>
      </div>
      
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
            <p>No prepared orders to manage at this time.</p>
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
            <p>No completed orders to manage at this time.</p>
          ) : (
            <ul>
              {completedOrders.map((order) => (
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
