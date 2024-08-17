import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Pages/login';
import Register from './Components/Pages/register';
import ProtectedRoute from './Components/protectedRoute';
import MainApp from './Components/AppPage/appPage';
import CombinedComponent from './Components/combinedComponent/combined';
import Profile from './Components/Profile/profile';
import './App.css';
import { UserProvider } from './Components/context/usercontext';
import PendingOrders from './Components/Pending Orders/pending';
import AdminPage from './Components/Pages/admin';
import PartnerPage from './Components/Pages/partner';

const App = () => {
  return (
    <UserProvider>
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
          <Route path="/menu" element={<CombinedComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={<AdminPage />}
          />
          <Route path="/pending-orders" element={<PendingOrders />} />
          <Route path="/partner" element={<PartnerPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
