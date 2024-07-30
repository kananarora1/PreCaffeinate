import React from 'react';
import { BrowserRouter , Route, Navigate, Routes} from 'react-router-dom';
import Login from './Components/Pages/login';
import Register from './Components/Pages/register';
import ProtectedRoute from './Components/protectedRoute';
import MainApp from './Components/AppPage/appPage';
import Menu from './Components/Menu/menu';
import Cart from './Components/Cart/cart';
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
        <Route path='/menu' element = {
          <ProtectedRoute>
            <Menu/>
          </ProtectedRoute>
        }/>
        <Route path ='/cart' element = {
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
