import React from 'react';
import './services.css'; // Import your CSS file for styling

const Services = () => {
  return (
    <div className="services-container">
      <h2>Service Which we provide</h2>
      <div className="services-content">
        <img src= "/Assets/coffeecup.jpeg" alt="Cafe" className="services-image" />
        <div className="services-text">
          <p>
            Preorder from our café and enjoy a seamless, delightful experience! Secure your favorite meals, drinks, and treats ahead of time, ensuring they're ready just when you need them. Skip the wait and savor the convenience of having your order freshly prepared and waiting for you.
          </p>
          <p>
            Don't miss out on your preferred items—reserve them now and enjoy a hassle-free visit to the café. Preorder today and make your next café visit even more enjoyable!
          </p>
          <button className="search-button">SEARCH</button>
        </div>
      </div>
    </div>
  );
}

export default Services;
