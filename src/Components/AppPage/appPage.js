import React from 'react';
import HomeContent from '../Home/home';
import Services from '../Services/services';
import Gallery from '../Gallery/gallery';
import Footer from '../Footer/footer';

function MainApp() {
    return (
        <div className="App">
            <HomeContent />
            <Services />
            <Gallery />
            <Footer />
        </div>
    );
}

export default MainApp;