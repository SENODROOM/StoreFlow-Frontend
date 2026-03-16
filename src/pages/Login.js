import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('selectedRole') || 'customer');

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // For now, default all users to dashboard since backend doesn't support roles yet
      navigate('/dashboard');
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
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Redirect handled by useEffect
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setIsLoading(false);
  };

  const roleTitle = selectedRole === 'shopkeeper' ? 'Shopkeeper Login' : 'Customer Login';
  const roleSubtitle = selectedRole === 'shopkeeper' 
    ? 'Welcome back! Login to manage your inventory' 
    : 'Welcome! Login to start shopping';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="back-btn" onClick={() => navigate('/role-selection')}>← Back</button>
        <h2>{roleTitle}</h2>
        <p className="auth-subtitle">{roleSubtitle}</p>

        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
