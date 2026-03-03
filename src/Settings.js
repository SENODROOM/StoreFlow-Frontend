import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

import config from './config';

const API_BASE_URL = config.API_URL;

const Settings = () => {
    const { user, updateUser } = useContext(AuthContext);

    // Load settings from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('dashboardSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'light',
            dashboardView: 'cards',
            dateFormat: 'MM/DD/YYYY',
            currency: 'PKR',
            itemsPerPage: 10,
            showActivityGraph: true,
            showTodayOrders: true,
            showRevenue: true,
            defaultView: 'dashboard',
            notifications: {
                newOrder: true,
                lowStock: false,
                dailySummary: true
            }
        };
    });

    const [profileData, setProfileData] = useState({
        shopName: user?.shopName || '',
        ownerName: user?.ownerName || '',
        phone: user?.phone || '',
        address: user?.address || '',
        email: user?.email || ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [activeTab, setActiveTab] = useState('general');
    const [isUpdating, setIsUpdating] = useState(false);

    // Update profile data when user changes
    useEffect(() => {
        if (user) {
            setProfileData({
                shopName: user.shopName || '',
                ownerName: user.ownerName || '',
                phone: user.phone || '',
                address: user.address || '',
                email: user.email || ''
            });
        }
    }, [user]);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('dashboardSettings', JSON.stringify(settings));
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('settingsChanged'));
    }, [settings]);

    const handleSettingChange = (category, key, value) => {
        if (category) {
            setSettings(prev => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [key]: value
                }
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                [key]: value
            }));
        }
        showMessage('success', 'Settings updated successfully!');
    };

    const handleProfileChange = (e) => {
        setProfileData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                showMessage('error', 'You must be logged in to update your profile');
                setIsUpdating(false);
                return;
            }

            const response = await axios.put(
                `${API_BASE_URL}/api/auth/profile`,
                {
                    shopName: profileData.shopName,
                    ownerName: profileData.ownerName,
                    phone: profileData.phone,
                    address: profileData.address
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                }
            );

            if (response.data.success) {
                // Update user in context
                if (updateUser) {
                    updateUser(response.data.user);
                }
                showMessage('success', 'Profile updated successfully!');
            }
        } catch (error) {
            console.error('Profile update error:', error);

            // Provide user-friendly error messages
            if (error.code === 'ECONNABORTED') {
                showMessage('error', 'Request timeout. Please check your internet connection.');
            } else if (error.response?.status === 500) {
                showMessage('error', 'Server error. Please try again later.');
            } else if (error.response?.status === 401) {
                showMessage('error', 'Session expired. Please log in again.');
            } else {
                showMessage('error', error.response?.data?.message || 'Failed to update profile. Please try again.');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const resetSettings = () => {
        if (window.confirm('Are you sure you want to reset all settings to default?')) {
            const defaultSettings = {
                theme: 'light',
                dashboardView: 'cards',
                dateFormat: 'MM/DD/YYYY',
                currency: 'PKR',
                itemsPerPage: 10,
                showActivityGraph: true,
                showTodayOrders: true,
                showRevenue: true,
                defaultView: 'dashboard',
                notifications: {
                    newOrder: true,
                    lowStock: false,
                    dailySummary: true
                }
            };
            setSettings(defaultSettings);
            showMessage('success', 'Settings reset to default!');
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p className="settings-subtitle">Customize your dashboard and preferences</p>
            </div>

            {message.text && (
                <div className={`settings-message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="settings-content">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                        </svg>
                        General
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Dashboard
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        Notifications
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Profile
                    </button>
                </div>

                <div className="settings-panel">
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <h2>General Settings</h2>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Theme</h3>
                                    <p>Choose your preferred theme</p>
                                </div>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => handleSettingChange(null, 'theme', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Date Format</h3>
                                    <p>How dates should be displayed</p>
                                </div>
                                <select
                                    value={settings.dateFormat}
                                    onChange={(e) => handleSettingChange(null, 'dateFormat', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Currency</h3>
                                    <p>Default currency for transactions</p>
                                </div>
                                <select
                                    value={settings.currency}
                                    onChange={(e) => handleSettingChange(null, 'currency', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="PKR">PKR (₨)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Items Per Page</h3>
                                    <p>Number of items to display per page</p>
                                </div>
                                <select
                                    value={settings.itemsPerPage}
                                    onChange={(e) => handleSettingChange(null, 'itemsPerPage', parseInt(e.target.value))}
                                    className="setting-select"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Default View</h3>
                                    <p>Page to show on login</p>
                                </div>
                                <select
                                    value={settings.defaultView}
                                    onChange={(e) => handleSettingChange(null, 'defaultView', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="dashboard">Dashboard</option>
                                    <option value="orders">Orders</option>
                                    <option value="new-order">New Order</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'dashboard' && (
                        <div className="settings-section">
                            <h2>Dashboard Preferences</h2>

                            <div className="setting-item">
                                <div className="setting-label">
                                    <h3>Dashboard View</h3>
                                    <p>Choose how to display your dashboard</p>
                                </div>
                                <select
                                    value={settings.dashboardView}
                                    onChange={(e) => handleSettingChange(null, 'dashboardView', e.target.value)}
                                    className="setting-select"
                                >
                                    <option value="cards">Cards</option>
                                    <option value="list">List</option>
                                    <option value="compact">Compact</option>
                                </select>
                            </div>

                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>Show Activity Graph</h3>
                                    <p>Display order activity chart on dashboard</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.showActivityGraph}
                                        onChange={(e) => handleSettingChange(null, 'showActivityGraph', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>Show Today's Orders</h3>
                                    <p>Display today's order count on dashboard</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.showTodayOrders}
                                        onChange={(e) => handleSettingChange(null, 'showTodayOrders', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>Show Total Revenue</h3>
                                    <p>Display total Revenue</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.showRevenue}
                                        onChange={(e) => handleSettingChange(null, 'showRevenue', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Preferences</h2>

                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>New Order Alerts</h3>
                                    <p>Get notified when a new order is placed</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.newOrder}
                                        onChange={(e) => handleSettingChange('notifications', 'newOrder', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>Low Stock Alerts</h3>
                                    <p>Receive alerts when inventory is running low</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.lowStock}
                                        onChange={(e) => handleSettingChange('notifications', 'lowStock', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item toggle-item">
                                <div className="setting-label">
                                    <h3>Daily Summary</h3>
                                    <p>Get a daily summary of your store's performance</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications.dailySummary}
                                        onChange={(e) => handleSettingChange('notifications', 'dailySummary', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h2>Profile Information</h2>
                            <form onSubmit={handleProfileUpdate} className="profile-form">
                                <div className="form-group">
                                    <label htmlFor="shopName">Shop Name</label>
                                    <input
                                        type="text"
                                        id="shopName"
                                        name="shopName"
                                        value={profileData.shopName}
                                        onChange={handleProfileChange}
                                        placeholder="Enter shop name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ownerName">Owner Name</label>
                                    <input
                                        type="text"
                                        id="ownerName"
                                        name="ownerName"
                                        value={profileData.ownerName}
                                        onChange={handleProfileChange}
                                        placeholder="Enter owner name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        placeholder="Enter email"
                                        disabled
                                    />
                                    <small>Email cannot be changed</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleProfileChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Shop Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={profileData.address}
                                        onChange={handleProfileChange}
                                        placeholder="Enter shop address"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="update-profile-btn"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="settings-actions">
                        <button onClick={resetSettings} className="reset-btn">
                            Reset to Defaults
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;