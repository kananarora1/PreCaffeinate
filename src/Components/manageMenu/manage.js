import React, { useEffect, useState } from 'react';
import { Button, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './manage.css';

const ManageMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
          setLoading(false);
        } else {
          throw new Error(data.message || 'Failed to fetch menu items');
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
        message.error('Failed to fetch menu items');
      }
    };

    fetchMenuItems();
  }, []);

  const handleSwitchChange = async (id, available) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/menuItems/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ itemAvailable: available }),
      });

      if (response.ok) {
        const updatedMenuItems = menuItems.map(item => 
          item._id === id ? { ...item, itemAvailable: available } : item
        );
        setMenuItems(updatedMenuItems);
        message.success(`Item ${available ? 'available' : 'not available'}`);
      } else {
        const data = await response.json();
        message.error(`Failed to update item status: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to update item status:', error);
      message.error('Failed to update item status');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="manage-menu-items">
      <h1>Manage Menu Items</h1>
      <Button onClick={() => navigate('/partner')} className = 'redir-btn' type="primary">
        Back to Partner Dashboard
      </Button>
      <div className="menu-items-list">
        {menuItems.map(item => (
          <div key={item._id} className="menu-item2">
            <div className="menu-item-details">
              <h2>{item.itemName}</h2>
              <div className='card-img2-container'>
                <img className = 'card-img2' src={item.itemImage} alt={item.itemName} />
              </div>
              <p>Price: Rs {item.itemPrice}</p>
            </div>
            <div className="availability-switch">
              <span>Available:</span>
              <Switch
                checked={item.itemAvailable}
                onChange={(checked) => handleSwitchChange(item._id, checked)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMenuItems;
