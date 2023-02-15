import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewProductOrder from '../NewProductOrder/NewProductOrder';
import NewServiceOrder from '../NewServiceOrder/NewServiceOrder';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <> 
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/orders/product" element={<NewProductOrder />} />
          <Route path="/orders/service" element={<NewServiceOrder />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
        </>
        : 
        <AuthPage setUser={setUser} /> 
      }
    </main>
  );
}