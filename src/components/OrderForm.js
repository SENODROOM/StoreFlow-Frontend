import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = 'https://store-flow-api.vercel.app';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: ''
  });

  const [products, setProducts] = useState([
    { name: '', quantity: 1, price: 0 }
  ]);

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', quantity: 1, price: 0 }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productTotal = (parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0);
      return total + productTotal;
    }, 0);
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

    // Validate products
    const hasEmptyProducts = products.some(p => !p.name.trim());
    if (hasEmptyProducts) {
      setMessage({
        type: 'error',
        text: 'Please fill in all product names.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format products for backend
      const formattedProducts = products.map(p => ({
        name: p.name,
        quantity: parseInt(p.quantity) || 1,
        price: parseFloat(p.price) || 0
      }));

      const orderData = {
        ...formData,
        products: formattedProducts
      };

      const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Order placed successfully!' });

        // Reset form
        setFormData({
          customerName: '',
          customerPhone: '',
          customerAddress: ''
        });
        setProducts([{ name: '', quantity: 1, price: 0 }]);

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

        <div className="products-section">
          <div className="products-header">
            <h3>Products</h3>
            <button
              type="button"
              className="add-product-btn"
              onClick={addProduct}
              disabled={isSubmitting}
            >
              + Add Product
            </button>
          </div>

          {products.map((product, index) => (
            <div key={index} className="product-row">
              <div className="product-fields">
                <div className="form-group product-name-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    required
                    placeholder="Enter product name"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group product-quantity-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group product-price-group">
                  <label>Price (PKR) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    required
                    placeholder="0.00"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group product-total-group">
                  <label>Subtotal</label>
                  <div className="product-subtotal">
                    PKR {((parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0)).toFixed(2)}
                  </div>
                </div>
              </div>

              {products.length > 1 && (
                <button
                  type="button"
                  className="remove-product-btn"
                  onClick={() => removeProduct(index)}
                  disabled={isSubmitting}
                  title="Remove product"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Total Amount: PKR {calculateTotal().toFixed(2)}</h3>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;