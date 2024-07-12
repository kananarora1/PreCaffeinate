import React from 'react';
import './services.css'; // Import your CSS file for styling

const Services = () => {
  return (
    <div className="services-container">
      <h2 className = "yoyo">Service  Which we provide</h2>
      <div className = "line"></div>
      <div className="services-content">
        <img src= "/Assets/serviceimage.jpeg" alt="Cafe" className="services-image" />
        <div className="services-text">
          <p>
            Preorder from our café and enjoy a seamless, delightful experience! Secure your favorite meals, drinks, and treats ahead of time, ensuring they're ready just when you need them. Skip the wait and savor the convenience of having your order freshly prepared and waiting for you.
          </p>
          <p>
            Don't miss out on your preferred items—reserve them now and enjoy a hassle-free visit to the café. Preorder today and make your next café visit even more enjoyable!
          </p>
          </div>
        </div>
      <div className="container">
        <div className = "header">
        </div>
        <button className="order-button">Order Now!!</button>
        </div>
      <div className="menu-items">
        <span className="menu-item">MEALS</span>
        <span className="menu-item">SNACKS</span>
        <span className="menu-item">MILKSHAKES</span>
        <span className = "menu-item">BEVERAGES</span>
      </div>
      <div className='image-container'>
      <img src= "/Assets/meal.jpeg" alt = "meal" className = "meal"/>
      <img src = "/Assets/snacks.jpeg" alt = "snacks" className = "snacks"/>
      <img src = "/Assets/milkshake.jpeg" alt ="milkshakes" className='milkshake'/>
      <img src = "/Assets/beverages.jpeg" alt = "beverages" className='beverages'/>
      </div>
      </div>
  )};

  export default Services;