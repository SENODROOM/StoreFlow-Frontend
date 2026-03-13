import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    localStorage.setItem('selectedRole', role);
    if (role === 'shopkeeper') {
      navigate('/login');
    } else {
      navigate('/login'); // Both go to login, but we'll show different options
    }
  };

  return (
    <div className="role-selection-container">
      <h1>Welcome to StoreFlow</h1>
      <p>Please select your role to continue</p>
      <div className="role-options">
        <div className="role-card" onClick={() => handleSelect('shopkeeper')}>
          <div className="role-icon">🏪</div>
          <h2>I'm a Shopkeeper</h2>
          <p>Manage your inventory, track orders, and grow your Market Place.</p>
        </div>
        <div className="role-card" onClick={() => handleSelect('customer')}>
          <div className="role-icon">🛍️</div>
          <h2>I'm a Customer</h2>
          <p>Browse products, find great deals, and shop from local Market Places.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
