import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage';
import NewProductOrder from '../NewProductOrder/NewProductOrder';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import NewServiceOrder from '../NewServiceOrder/NewServiceOrder';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      { user ?
        <> 
        {/* <NavBar user={user} setUser={setUser} /> */}
        <Routes>
          <Route path="/orders/new" element={<NewProductOrder user={user} setUser={setUser} />} />
          <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
          <Route path="/*" element={<Navigate to="/orders/new" />} />
        </Routes>
        </>
        : 
        <AuthPage setUser={setUser} /> 
      }
    </main>
  );
}