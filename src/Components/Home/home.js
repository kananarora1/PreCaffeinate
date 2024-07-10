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
      <img src="./Assets/text1.png" alt="PreCaffeinate" className="text1" />
      <img src="./Assets/text2new.png" alt="The Best TIME To Drink Coffee is NOW" className="text2" />
      </div>
      </div>
    </div>
  );
}

export default HomeContent;
