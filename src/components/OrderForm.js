import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = 'https://store-flow-api.vercel.app';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    product: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage({
        type: 'error',
        text: 'You must be logged in to place an order.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Order placed successfully!' });
        setFormData({
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          product: ''
        });

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Order submission error:', error.response?.data || error.message);

      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error placing order. Please try again.'
      });

      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Place New Order</h2>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name *</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Enter customer name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerPhone">Customer Phone Number *</label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerAddress">Customer Address *</label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            required
            placeholder="Enter customer address"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product">Product *</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Order...' : 'Add Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;