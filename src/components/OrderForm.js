import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    product: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      
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
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Error placing order. Please try again.' 
      });
      
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
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
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
