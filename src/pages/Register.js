import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedRole] = useState(localStorage.getItem('selectedRole') || 'customer');

  useEffect(() => {
    if (user) {
      navigate(user.role === 'shopkeeper' ? '/dashboard' : '/catalog');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }

    setIsLoading(true);

    const { confirmPassword, ...registrationData } = formData;
    
    // Prepare data based on role
    const finalData = { 
      email: registrationData.email,
      password: registrationData.password,
      role: selectedRole 
    };

    if (selectedRole === 'shopkeeper') {
      finalData.shopName = registrationData.shopName;
      finalData.ownerName = registrationData.name; // Mapping name to ownerName for shopkeeper
    } else {
      finalData.name = registrationData.name;
    }

    const result = await register(finalData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Redirect handled by useEffect
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsLoading(false);
  };

  const roleTitle = selectedRole === 'shopkeeper' ? 'Create Shopkeeper Account' : 'Create Customer Account';
  const roleSubtitle = selectedRole === 'shopkeeper' 
    ? 'Register to start managing your store' 
    : 'Register to start shopping at StoreFlow';

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <button className="back-btn" onClick={() => navigate('/role-selection')}>← Back</button>
        <h2>{roleTitle}</h2>
        <p className="auth-subtitle">{roleSubtitle}</p>

        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {selectedRole === 'shopkeeper' && (
            <div className="form-group">
              <label htmlFor="shopName">Market Place Name *</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
                placeholder="Enter your market place name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">{selectedRole === 'shopkeeper' ? 'Owner Name *' : 'Full Name *'}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={selectedRole === 'shopkeeper' ? "Enter owner's name" : "Enter your full name"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Min 6 chars"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
