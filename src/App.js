import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import PurchasedProducts from './components/PurchasedProducts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">Order Management System</h1>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">New Order</Link>
              </li>
              <li className="nav-item">
                <Link to="/purchased-products" className="nav-link">Purchased Products</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<OrderForm />} />
          <Route path="/purchased-products" element={<PurchasedProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
