import React, { useEffect, useState, useContext } from 'react';
import './profile.css';
import { CartContext } from '../context/cartContext';

const Profile = () => {
  const { user } = useContext(CartContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user || !user.id) {
        console.log('No valid user ID, skipping fetch');
        setLoading(false);
        return;
      }
      console.log('Fetching order history for user:', user.id);
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
        console.log('API response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Order history data:', data);
        setOrderHistory(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderHistory();
  }, [user]);

  if (loading) return <p>Loading profile data...</p>;
  if (error) return <p>Error loading profile: {error}</p>;
  if (!user) return <p>No user data available. Please log in.</p>;

  return (
    <div className="profile-container">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orderHistory.map(order => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Items: {order.items.join(', ')}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: Rs {order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;