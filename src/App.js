import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
//changings
import Dashboard from './pages/Dashboard';
//CHANGING
import OrderForm from './pages/OrderForm';
import PurchasedProducts from './pages/PurchasedProducts';
import Settings from './pages/Settings';
import SellProduct from './pages/SellProduct';
import Inventory from './pages/Inventory';
import RoleSelection from './pages/RoleSelection';
import Catalog from './pages/Catalog';
import "./App.css";
import Navbar from './components/Navbar';

function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/role-selection" element={user ? <Navigate to="/dashboard" /> : <RoleSelection />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-order"
          element={
            <PrivateRoute>
              <OrderForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchased-products"
          element={
            <PrivateRoute>
              <PurchasedProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Global Redirect */}
        <Route path="/" element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/role-selection" />
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
