import React from 'react';
import './menu.css';

const MenuList = [
    {
        name: "Cappuccino",
        price: 5.00,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/cappuccino.jpg"
    },
    {
        name: "Latte",
        price: 4.50,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/latte.jpg"
    },
    {
        name: "Espresso",
        price: 3.00,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/espresso.jpg"
    },
    {
        name: "Americano",
        price: 4.00,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/americano.jpg"
    },
    {
        name: "Macchiato",
        price: 4.50,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/macchiato.jpg"
    },
    {
        name: "Mocha",
        price: 5.50,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/mocha.jpg"
    },
    {
        name: "Hot Chocolate",
        price: 4.00,
        category: "Hot Drinks",
        description: "Hot Chocolate",
        image: "/Assets/hotchocolate.jpg"
    },
    {
        name: "Tea",
        price: 3.00,
        category: "Hot Drinks",
        description: "Tea",
        image: "/Assets/tea.jpg"
    },
    {
        name: "Caramel Macchiato",
        price: 5.50,
        category: "Coffee",
        description: "Espresso",
        image: "/Assets/caramelmacchiato.jpg"
    },
    {
        name: "Iced Coffee",
        price: 4.50,
        category: "Cold Drinks",
        description: "Iced Coffee",
        image: "/Assets/icedcoffee.jpg"
    },
    {
        name: "Iced Tea",
        price: 3.50,
        category: "Cold Drinks",
        description: "Iced Tea",
        image: "/Assets/icedtea.jpg"
    },
    {
        name: "Smoothie",
        price: 5.00,
        category: "Cold Drinks",
        description: "Smoothie",
        image: "/Assets/smoothie.jpg"
    },
    {
        name: "Milkshake",
        price: 5.00,
        category: "Cold Drinks",
        description: "Milkshake",
        image: "/Assets/milkshake.jpg"
    },
    {
        name: "Lemonade",
        price: 4.00,
        category: "Cold Drinks",
        description: "Lemonade",
        image: "/Assets/lemonade.jpg"
    }
]

const Menu = () => {
    return (
      <div className="menu">
        <h1>Menu</h1>
        <div className="menu-list">
          {MenuList.map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Menu;