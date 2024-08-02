import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Assets/cafelogo.jpg" alt="Cafe Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/" onClick={() => {
          localStorage.removeItem('token');
          Navigate('/login');
        }}>Log Out</Link>
        <Link to = "/profile">
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
