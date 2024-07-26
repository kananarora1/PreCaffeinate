import React from 'react';
import HomeContent from '../Home/home';
import Services from '../Services/services';
import Gallery from '../Gallery/gallery';

function MainApp() {
    return (
        <div className="App">
            <HomeContent />
            <Services />
            <Gallery />
        </div>
    );
}

export default MainApp;