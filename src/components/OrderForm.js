import React, { useState, useContext, useEffect } from 'react';
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

  const [existingCustomers, setExistingCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);

  // Fetch existing customers
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          // Extract unique customers from orders
          const customersMap = new Map();
          response.data.data.forEach(order => {
            if (!customersMap.has(order.customerName)) {
              customersMap.set(order.customerName, {
                name: order.customerName,
                phone: order.customerPhone,
                address: order.customerAddress,
                totalOrders: 1,
                orders: [order]
              });
            } else {
              const customer = customersMap.get(order.customerName);
              customer.totalOrders++;
              customer.orders.push(order);
            }
          });

          setExistingCustomers(Array.from(customersMap.values()));
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [token]);

  // Filter customers based on input
  useEffect(() => {
    if (formData.customerName.trim() === '') {
      setFilteredCustomers([]);
      setShowDropdown(false);
      return;
    }

    const filtered = existingCustomers.filter(customer =>
      customer.name.toLowerCase().includes(formData.customerName.toLowerCase())
    );

    setFilteredCustomers(filtered);
    setShowDropdown(filtered.length > 0);
  }, [formData.customerName, existingCustomers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Reset selected customer when manually typing
    if (name === 'customerName') {
      setSelectedCustomer(null);
      setShowCustomerInfo(false);
    }
  };

  const handleCustomerSelect = (customer) => {
    setFormData({
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: customer.address
    });
    setSelectedCustomer(customer);
    setShowDropdown(false);
    setShowCustomerInfo(false); // Hide info initially
  };

  const toggleCustomerInfo = () => {
    setShowCustomerInfo(!showCustomerInfo);
  };

  const calculateCustomerTotal = (customer) => {
    return customer.orders.reduce((total, order) => {
      if (order.products && Array.isArray(order.products)) {
        return total + order.products.reduce((orderTotal, product) => {
          return orderTotal + (product.price || 0) * (product.quantity || 0);
        }, 0);
      }
      return total;
    }, 0);
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

        setFormData({
          customerName: '',
          customerPhone: '',
          customerAddress: ''
        });
        setProducts([{ name: '', quantity: 1, price: 0 }]);
        setSelectedCustomer(null);
        setShowCustomerInfo(false);

        // Refresh customer list
        const refreshResponse = await axios.get(`${API_BASE_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (refreshResponse.data.success) {
          const customersMap = new Map();
          refreshResponse.data.data.forEach(order => {
            if (!customersMap.has(order.customerName)) {
              customersMap.set(order.customerName, {
                name: order.customerName,
                phone: order.customerPhone,
                address: order.customerAddress,
                totalOrders: 1,
                orders: [order]
              });
            } else {
              const customer = customersMap.get(order.customerName);
              customer.totalOrders++;
              customer.orders.push(order);
            }
          });
          setExistingCustomers(Array.from(customersMap.values()));
        }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div className="form-group customer-name-group">
          <label htmlFor="customerName">Customer Name *</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              onFocus={() => formData.customerName && setShowDropdown(filteredCustomers.length > 0)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              required
              placeholder="Enter customer name"
              disabled={isSubmitting}
              autoComplete="off"
            />

            {showDropdown && (
              <div className="autocomplete-dropdown">
                {filteredCustomers.map((customer, index) => (
                  <div
                    key={index}
                    className="autocomplete-item"
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    <div className="autocomplete-item-main">
                      <span className="autocomplete-name">{customer.name}</span>
                      <span className="autocomplete-badge">{customer.totalOrders} orders</span>
                    </div>
                    <div className="autocomplete-item-details">
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedCustomer && (
            <button
              type="button"
              className="view-customer-info-btn"
              onClick={toggleCustomerInfo}
            >
              {showCustomerInfo ? '▼ Hide' : '▶ View'} Customer History
            </button>
          )}
        </div>

        {showCustomerInfo && selectedCustomer && (
          <div className="customer-info-panel">
            <div className="customer-info-header">
              <h3>{selectedCustomer.name}'s Order History</h3>
              <div className="customer-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Orders:</span>
                  <span className="stat-value">{selectedCustomer.totalOrders}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Spent:</span>
                  <span className="stat-value">PKR {calculateCustomerTotal(selectedCustomer).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="customer-orders-list">
              {selectedCustomer.orders.slice(0, 5).map((order, idx) => (
                <div key={idx} className="customer-order-item">
                  <div className="order-item-date">{formatDate(order.orderTime)}</div>
                  <div className="order-item-products">
                    {order.products && Array.isArray(order.products) ? (
                      order.products.map((product, pIdx) => (
                        <div key={pIdx} className="product-line">
                          <span>{product.name}</span>
                          <span className="product-qty">x{product.quantity}</span>
                          <span className="product-price">PKR {(product.price * product.quantity).toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="product-line">{order.product || 'N/A'}</div>
                    )}
                  </div>
                </div>
              ))}
              {selectedCustomer.totalOrders > 5 && (
                <div className="more-orders">
                  + {selectedCustomer.totalOrders - 5} more orders
                </div>
              )}
            </div>
          </div>
        )}

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