import React from 'react';
import './home.css';
import NavBar from '../NavBar/NavBar';

const HomeContent = () => {
  return (
    <div className = "home-content" >
      <img src='./Assets/background.png' alt="Coffee" className="coffee-image" />
      <div className="home-text">
      <NavBar />
      <div className="text">
        <p class="text1">PreCaffeinate</p>
        <p class="text2">The Best</p>
        <p class="text3">TIME</p>
        <p class="text4">To Drink</p>
        <p class="text5">
        <img src='./Assets/coffeecup.jpg' alt="Coffee" className="text-5-image" />
        Coffee
        </p>
        <p><span class="text6">is</span><span class="text7">NOW</span></p>
      </div>
      </div>
    </div>
  );
}

export default HomeContent;
