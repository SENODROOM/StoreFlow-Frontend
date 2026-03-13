import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Catalog.css';
import config from '../config';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const API_BASE_URL = config.API_URL;

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/products/catalog?category=${category}&search=${search}`;
      const response = await axios.get(url);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching catalog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Market Place Catalog</h1>
        <div className="catalog-filters">
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img 
                      src={product.image.startsWith('/') ? `${API_BASE_URL}${product.image}` : product.image} 
                      alt={product.name} 
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-shop">By: {product.shopkeeperId?.shopName || 'Unknown Market Place'}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No products found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;
