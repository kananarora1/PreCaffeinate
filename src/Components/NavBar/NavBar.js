import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logout clicked');
    localStorage.removeItem('token');
    navigate('/login');
    console.log('Navigating to /login');
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Assets/cafelogo.jpg" alt="Cafe Logo" />
      </div>
      <div className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/pending-orders">Active Orders</Link>
        <Link to="/" onClick={handleLogout}>Log Out</Link>
        <Link to="/profile">
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
