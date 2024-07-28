import React from 'react';
import HomeContent from '../Home/home';
import Services from '../Services/services';
import Gallery from '../Gallery/gallery';
import Menu from '../Menu/menu';

function MainApp() {
    return (
        <div className="App">
            <HomeContent />
            <Services />
            <Gallery />
            <Menu />
        </div>
    );
}

export default MainApp;