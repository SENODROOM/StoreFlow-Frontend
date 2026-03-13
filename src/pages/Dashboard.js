import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import config from '../config';

const API_BASE_URL = config.API_URL;

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        todayOrders: 0
    });
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    // Load settings from localStorage
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
            defaultView: 'dashboard'
        };
    });

    // Listen for settings changes
    useEffect(() => {
        const handleSettingsChange = () => {
            const saved = localStorage.getItem('dashboardSettings');
            if (saved) {
                setSettings(JSON.parse(saved));
            }
        };

        window.addEventListener('settingsChanged', handleSettingsChange);
        return () => window.removeEventListener('settingsChanged', handleSettingsChange);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;

            try {
                setLoading(true);
                // Fetch Orders for stats
                const orderRes = await axios.get(`${API_BASE_URL}/api/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch Inventory for stats
                const productRes = await axios.get(`${API_BASE_URL}/api/products/inventory`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                let orders = [];
                if (orderRes.data.success) {
                    orders = orderRes.data.data;
                }

                let inventory = [];
                if (productRes.data.success) {
                    inventory = productRes.data.data;
                }

                // Calculate stats
                const uniqueCustomers = new Set(orders.map(order => order.customerName));
                const totalRevenue = orders.reduce((total, order) => {
                    return total + (order.totalAmount || 0);
                }, 0);

                const lowStockItems = inventory.filter(p => p.quantity < 10).length;

                setStats({
                    totalCustomers: uniqueCustomers.size,
                    totalOrders: orders.length,
                    totalRevenue: totalRevenue,
                    totalInventory: inventory.length,
                    lowStock: lowStockItems
                });

                generateActivityData(orders);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const generateActivityData = (orders) => {
        const weeks = [];
        const today = new Date();

        // Generate 52 weeks (364 days) of data
        for (let week = 0; week < 52; week++) {
            const days = [];
            for (let day = 0; day < 7; day++) {
                const daysAgo = (51 - week) * 7 + (6 - day);
                const date = new Date(today);
                date.setDate(date.getDate() - daysAgo);
                date.setHours(0, 0, 0, 0);

                // Count orders for this specific day
                const ordersOnDay = orders.filter(order => {
                    const orderDate = new Date(order.orderTime);
                    orderDate.setHours(0, 0, 0, 0);
                    return orderDate.getTime() === date.getTime();
                });

                days.push({
                    date: date,
                    count: ordersOnDay.length,
                    orders: ordersOnDay
                });
            }
            weeks.push(days);
        }

        setActivityData(weeks);
    };

    const getActivityLevel = (count) => {
        if (count === 0) return 'level-0';
        if (count <= 2) return 'level-1';
        if (count <= 4) return 'level-2';
        if (count <= 6) return 'level-3';
        return 'level-4';
    };

    const formatDate = (date) => {
        // Format date based on user settings
        const options = { month: 'short', day: 'numeric', year: 'numeric' };

        switch (settings.dateFormat) {
            case 'DD/MM/YYYY':
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            case 'YYYY-MM-DD':
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            case 'MM/DD/YYYY':
            default:
                return date.toLocaleDateString('en-US', options);
        }
    };

    const formatCurrency = (amount) => {
        const symbols = {
            'PKR': 'PKR',
            'USD': '$',
            'EUR': 'â‚¬',
            'GBP': 'Â£'
        };
        const symbol = symbols[settings.currency] || settings.currency;
        return `${symbol} ${amount.toLocaleString()}`;
    };

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    // Render stats based on dashboard view setting
    const renderStats = () => {
        const statsArray = [
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                ),
                iconClass: 'revenue-icon',
                value: formatCurrency(stats.totalRevenue),
                label: 'Total Revenue',
                show: settings.showRevenue
            },
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                ),
                iconClass: 'customers-icon',
                value: stats.totalCustomers,
                label: 'Total Customers'
            },
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                ),
                iconClass: 'orders-icon',
                value: stats.totalOrders,
                label: 'Total Orders'
            },
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 10v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 18v-2z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                ),
                iconClass: 'inventory-icon',
                value: stats.totalInventory,
                label: 'Total Products'
            },
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                ),
                iconClass: 'low-stock-icon',
                value: stats.lowStock,
                label: 'Low Stock Items',
                show: stats.lowStock > 0
            }
        ];

        // Filter out stats based on settings
        const visibleStats = statsArray.filter(stat => stat.show !== false);

        if (settings.dashboardView === 'list') {
            return (
                <div className="stats-list">
                    {visibleStats.map((stat, index) => (
                        <div key={index} className="stat-list-item">
                            <div className={`stat-icon ${stat.iconClass}`}>
                                {stat.icon}
                            </div>
                            <div className="stat-list-content">
                                <p className="stat-label">{stat.label}</p>
                                <h3 className="stat-value">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (settings.dashboardView === 'compact') {
            return (
                <div className="stats-compact">
                    {visibleStats.map((stat, index) => (
                        <div key={index} className="stat-compact-item">
                            <span className="stat-compact-label">{stat.label}:</span>
                            <span className="stat-compact-value">{stat.value}</span>
                        </div>
                    ))}
                </div>
            );
        } else {
            // Default cards view
            return (
                <div className="stats-grid">
                    {visibleStats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className={`stat-icon ${stat.iconClass}`}>
                                {stat.icon}
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="dashboard-subtitle">Overview of your Market Place performance</p>
            </div>

            {/* Stats Section */}
            {renderStats()}

            {/* Market Place Review Section */}
            <div className="marketplace-review-section" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#374151' }}>Market Place Review</h2>
                    <span style={{ fontSize: '0.875rem', color: '#666', backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px' }}>Trending Today</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Top Category</p>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>Electronics</h4>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#4caf50' }}>â†‘ 12% increase in sales</p>
                    </div>
                    <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Active Customers</p>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>{stats.totalCustomers}</h4>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#4caf50' }}>â†‘ 5% growth this week</p>
                    </div>
                    <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Market Growth</p>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>Steady</h4>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#2196f3' }}>High engagement in results</p>
                    </div>
                </div>
            </div>

            {/* Activity Graph - Only show if enabled in settings */}
            {settings.showActivityGraph && (
                <div className="activity-section">
                    <div className="activity-header">
                        <h2>Order Activity</h2>
                        <div className="activity-legend">
                            <span>Less</span>
                            <div className="legend-squares">
                                <div className="activity-square level-0" title="No orders"></div>
                                <div className="activity-square level-1" title="1-2 orders"></div>
                                <div className="activity-square level-2" title="3-4 orders"></div>
                                <div className="activity-square level-3" title="5-6 orders"></div>
                                <div className="activity-square level-4" title="7+ orders"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    <div className="activity-graph">
                        <div className="day-labels">
                            {dayLabels.map((day, idx) => (
                                idx % 2 === 1 && <div key={idx} className="day-label">{day}</div>
                            ))}
                        </div>

                        <div className="activity-grid-wrapper">
                            <div className="activity-grid">
                                {activityData.map((week, weekIdx) => (
                                    <div key={weekIdx} className="activity-week">
                                        {week.map((day, dayIdx) => (
                                            <div
                                                key={dayIdx}
                                                className={`activity-square ${getActivityLevel(day.count)}`}
                                                title={`${formatDate(day.date)}: ${day.count} order${day.count !== 1 ? 's' : ''}`}
                                                data-count={day.count}
                                                data-date={formatDate(day.date)}
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="month-labels">
                                {activityData.map((week, weekIdx) => {
                                    const firstDay = week[0].date;
                                    const month = firstDay.getMonth();
                                    const isFirstWeekOfMonth = firstDay.getDate() <= 7;

                                    return isFirstWeekOfMonth ? (
                                        <div key={weekIdx} className="month-label" style={{ left: `${weekIdx * 15}px` }}>
                                            {monthLabels[month]}
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;