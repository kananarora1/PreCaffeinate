import React from 'react';
import HomeContent from './Components/Home/home';
import Services from './Components/Services/services';
import Gallery from './Components/Gallery/gallery';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomeContent/>
      <Services /> 
      <Gallery/>
      </div>
  );
}

export default App;
