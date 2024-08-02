import React from 'react';
import Menu from '../Menu/menu';
import Cart from '../Cart/cart';
import './combined.css';

const CombinedComponent = () => {
  return (
    <div className="combined-container">
      <Menu />
      <Cart />
    </div>
  );
};

export default CombinedComponent;
