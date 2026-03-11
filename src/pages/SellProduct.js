import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

const API_BASE_URL = config.API_URL;

const SellProduct = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err.response?.data || err.message);
      }
    };
    fetchProducts();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price === '') {
      setMessage({ type: 'error', text: 'Name and price are required.' });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0
      };
      const res = await axios.post(`${API_BASE_URL}/api/products`, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Product added successfully.' });
        setFormData({ name: '', description: '', price: '' });
        setProducts(prev => [res.data.data, ...prev]);
      }
    } catch (err) {
      console.error('Error creating product:', err.response?.data || err.message);
      setMessage({ type: 'error', text: 'Unable to add product. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err.response?.data || err.message);
      alert('Could not delete product.');
    }
  };

  return (
    <div className="sell-product-container">
      <h2>Product to Sell</h2>
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <form className="sell-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Product'}
        </button>
      </form>

      <div className="product-list">
        <h3>Your Listings</h3>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <ul>
            {products.map(p => (
              <li key={p._id} className="product-item">
                <div className="product-info">
                  <span className="product-name">{p.name}</span>
                  <span className="product-price">PKR {p.price.toFixed(2)}</span>
                </div>
                {p.description && <div className="product-desc">{p.description}</div>}
                <button className="delete-btn" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SellProduct;
