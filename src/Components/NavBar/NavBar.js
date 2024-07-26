import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Assets/cafelogo.jpg" alt="Cafe Logo" />
      </div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Menu</li>
        <li>Service</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Log Out</li>
      </ul>
    </nav>
  );
}

export default Navbar;
