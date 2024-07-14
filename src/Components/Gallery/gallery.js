import React from 'react';
import './gallery.css';

const gallery = () => {
return(
<div className="gallery-container">
      <div className="gallery-item">
        <h2 className="gallery-title">MEALS</h2>
        <img src="/Assets/meal.jpeg" alt="Meals" className="gallery-image" />
      </div>
      <div className="gallery-item">
        <h2 className="gallery-title">SNACKS</h2>
        <img src="/Assets/snacks.jpeg" alt="Snacks" className="gallery-image" />
      </div>
      <div className="gallery-item">
        <h2 className="gallery-title">MILKSHAKES</h2>
        <img src="/Assets/milkshake.jpeg" alt="Milkshakes" className="gallery-image" />
      </div>
      <div className="gallery-item">
        <h2 className="gallery-title">BEVERAGES</h2>
        <img src="/Assets/beverages.jpeg" alt="Beverages" className="gallery-image" />
      </div>
</div>
)
};

export default gallery;