import React, { useEffect, useState } from 'react';
import './DeliveryPopup.css';

// Delivery rules — easy to update anytime
const DELIVERY_RULES = {
  standard: {
    label: 'Standard Shipping',
    days: '3–5 Business Days',
    icon: '📦',
    color: '#4f8ef7',
    description: 'Regular courier delivery'
  },
  express: {
    label: 'Express Shipping',
    days: '1–2 Business Days',
    icon: '⚡',
    color: '#f59e0b',
    description: 'Priority handling & fast dispatch'
  },
  overnight: {
    label: 'Overnight Shipping',
    days: 'Next Business Day',
    icon: '🚀',
    color: '#10b981',
    description: 'Guaranteed next-day delivery'
  },
  default: {
    label: 'Standard Shipping',
    days: '3–5 Business Days',
    icon: '📦',
    color: '#4f8ef7',
    description: 'Regular courier delivery'
  }
};

// Helper: get estimated delivery date string
const getEstimatedDate = (shippingType) => {
  const today = new Date();
  const minDays = shippingType === 'overnight' ? 1
    : shippingType === 'express' ? 1
    : 3;
  const maxDays = shippingType === 'overnight' ? 1
    : shippingType === 'express' ? 2
    : 5;

  // Skip weekends
  const addBusinessDays = (date, days) => {
    let count = 0;
    const d = new Date(date);
    while (count < days) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) count++;
    }
    return d;
  };

  const minDate = addBusinessDays(today, minDays);
  const maxDate = addBusinessDays(today, maxDays);

  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (minDays === maxDays) return fmt(minDate);
  return `${fmt(minDate)} – ${fmt(maxDate)}`;
};

const DeliveryPopup = ({ isOpen, onClose, shippingType = 'standard', orderDetails = {} }) => {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const rule = DELIVERY_RULES[shippingType] || DELIVERY_RULES.default;
  const estimatedDate = getEstimatedDate(shippingType);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`dp-overlay ${animateIn ? 'dp-overlay--in' : ''}`} onClick={onClose}>
      <div
        className={`dp-modal ${animateIn ? 'dp-modal--in' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success header */}
        <div className="dp-header">
          <div className="dp-success-ring">
            <div className="dp-success-icon">✓</div>
          </div>
          <h2 className="dp-title">Order Placed!</h2>
          <p className="dp-subtitle">
            {orderDetails.customerName
              ? `Order for ${orderDetails.customerName} has been confirmed`
              : 'Your order has been confirmed successfully'}
          </p>
        </div>

        {/* Delivery info card */}
        <div className="dp-delivery-card" style={{ '--accent': rule.color }}>
          <div className="dp-delivery-top">
            <span className="dp-delivery-icon">{rule.icon}</span>
            <div>
              <div className="dp-delivery-type">{rule.label}</div>
              <div className="dp-delivery-desc">{rule.description}</div>
            </div>
          </div>

        </div>

        {/* Order summary (if provided) */}
        {orderDetails.total && (
          <div className="dp-summary">
            <div className="dp-summary-row">
              <span>Order Total</span>
              <span className="dp-summary-value">PKR {parseFloat(orderDetails.total).toFixed(2)}</span>
            </div>
            {orderDetails.specialInstructions && (
              <div className="dp-summary-row dp-instructions-row">
                <span>Instructions</span>
                <span className="dp-summary-value dp-instructions-text">
                  {orderDetails.specialInstructions}
                </span>
              </div>
            )}
          </div>
        )}

        <button className="dp-close-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default DeliveryPopup;
