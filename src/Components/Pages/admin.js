import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const AdminPage = () => {
  const { user, setUser } = useContext(UserContext); 
  const [partnerRequests, setPartnerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartnerRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/partner-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log('Fetched partner requests:', data); // Debug log
        if (response.ok) {
          setPartnerRequests(data.partnerRequests);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch partner requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchPartnerRequests();
    }
  }, [user]);

  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/partner-requests/${userId}/approve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPartnerRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== userId)
        );
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to approve partner request:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/partner-requests/${userId}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPartnerRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== userId)
        );
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to reject partner request:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-page">
      <div className="header">
        <h1>Partner Requests</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      {partnerRequests.length === 0 ? (
        <p>No partner requests at this time.</p>
      ) : (
        <ul className="partner-requests">
          {partnerRequests.map((request) => (
            <li key={request._id}>
              <div>
                <p>User ID: {request._id}</p>
                <p>Request Date: {new Date(request.createdAt).toLocaleDateString()}</p>
                <button className="approve-button" onClick={() => handleApprove(request._id)}>Approve</button>
                <button className="reject-button" onClick={() => handleReject(request._id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
