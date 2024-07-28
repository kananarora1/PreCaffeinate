import React from 'react';
import HomeContent from './Components/Home/home';
import Services from './Components/Services/services';
import Gallery from './Components/Gallery/gallery';
import { BrowserRouter , Route, Navigate, Routes} from 'react-router-dom';
import Login from './Components/Pages/login';
import Register from './Components/Pages/register';
import ProtectedRoute from './Components/protectedRoute';
import MainApp from './Components/AppPage/appPage';
import './App.css';

const App = () => {

  return(
    <>
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
