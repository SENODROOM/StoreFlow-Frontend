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
                const response = await axios.get(`${API_BASE_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    const orders = response.data.data;

                    // Calculate stats
                    const uniqueCustomers = new Set(orders.map(order => order.customerName));
                    const totalRevenue = orders.reduce((total, order) => {
                        if (order.products && Array.isArray(order.products)) {
                            return total + order.products.reduce((orderTotal, product) => {
                                return orderTotal + (product.price || 0) * (product.quantity || 0);
                            }, 0);
                        }
                        return total;
                    }, 0);

                    // Today's orders
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const todayOrders = orders.filter(order => {
                        const orderDate = new Date(order.orderTime);
                        orderDate.setHours(0, 0, 0, 0);
                        return orderDate.getTime() === today.getTime();
                    }).length;

                    setStats({
                        totalCustomers: uniqueCustomers.size,
                        totalOrders: orders.length,
                        totalRevenue: totalRevenue,
                        todayOrders: todayOrders
                    });

                    // Generate activity data for the last 365 days
                    generateActivityData(orders);
                }
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
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                ),
                iconClass: 'orders-icon',
                value: stats.totalOrders,
                label: 'Total Orders'
            },
            {
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
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
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                ),
                iconClass: 'today-icon',
                value: stats.todayOrders,
                label: "Today's Orders",
                show: settings.showTodayOrders
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
                <p className="dashboard-subtitle">Overview of your store's performance</p>
            </div>

            {/* Stats Section */}
            {renderStats()}

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