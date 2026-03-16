import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import config from '../config';

import DashboardHeader from '../components/DashboardHeader';
import StatsSection from '../components/StatsSection';
import MarketplaceReview from '../components/MarketplaceReview';
import ActivityGraph from '../components/ActivityGraph';

const API_BASE_URL = config.API_URL;

const Dashboard = () => {
    const [stats, setStats] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0, totalInventory: 0, lowStock: 0 });
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('dashboardSettings');
        return saved ? JSON.parse(saved) : {
            theme: 'light', dashboardView: 'cards', dateFormat: 'MM/DD/YYYY',
            currency: 'PKR', itemsPerPage: 10, showActivityGraph: true,
            showTodayOrders: true, showRevenue: true, defaultView: 'dashboard'
        };
    });

    useEffect(() => {
        const handleSettingsChange = () => {
            const saved = localStorage.getItem('dashboardSettings');
            if (saved) setSettings(JSON.parse(saved));
        };
        window.addEventListener('settingsChanged', handleSettingsChange);
        return () => window.removeEventListener('settingsChanged', handleSettingsChange);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const orderRes = await axios.get(`${API_BASE_URL}/api/orders`, { headers: { Authorization: `Bearer ${token}` } });

                const orders = orderRes.data.success ? orderRes.data.data : [];

                // Calculate stats from orders data
                const uniqueCustomers = new Set(orders.map(order => order.customerName));
                const totalRevenue = orders.reduce((total, order) => {
                    const orderTotal = order.products?.reduce((sum, product) => {
                        return sum + (product.price * product.quantity || 0);
                    }, 0) || 0;
                    return total + orderTotal;
                }, 0);
                
                // Extract unique products from orders
                const allProducts = new Set();
                orders.forEach(order => {
                    order.products?.forEach(product => {
                        allProducts.add(product.name);
                    });
                });

                setStats({ 
                    totalCustomers: uniqueCustomers.size, 
                    totalOrders: orders.length, 
                    totalRevenue, 
                    totalInventory: allProducts.size,
                    lowStock: 0 // No inventory data available
                });
                generateActivityData(orders);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Set default values on error
                setStats({ 
                    totalCustomers: 0, 
                    totalOrders: 0, 
                    totalRevenue: 0, 
                    totalInventory: 0,
                    lowStock: 0
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [token]);

    const generateActivityData = (orders) => {
        const weeks = [];
        const today = new Date();
        for (let week = 0; week < 52; week++) {
            const days = [];
            for (let day = 0; day < 7; day++) {
                const daysAgo = (51 - week) * 7 + (6 - day);
                const date = new Date(today);
                date.setDate(date.getDate() - daysAgo);
                date.setHours(0, 0, 0, 0);
                const ordersOnDay = orders.filter(order => {
                    const orderDate = new Date(order.orderTime);
                    orderDate.setHours(0, 0, 0, 0);
                    return orderDate.getTime() === date.getTime();
                });
                days.push({ date, count: ordersOnDay.length, orders: ordersOnDay });
            }
            weeks.push(days);
        }
        setActivityData(weeks);
    };

    const formatDate = (date) => {
        switch (settings.dateFormat) {
            case 'DD/MM/YYYY':
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            case 'YYYY-MM-DD':
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            default:
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    const formatCurrency = (amount) => {
        const symbols = { 'PKR': 'PKR', 'USD': '$', 'EUR': '€', 'GBP': '£' };
        const symbol = symbols[settings.currency] || settings.currency;
        return `${symbol} ${amount.toLocaleString()}`;
    };

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="dashboard-container">
            <DashboardHeader />
            <StatsSection stats={stats} settings={settings} formatCurrency={formatCurrency} />
            <MarketplaceReview totalCustomers={stats.totalCustomers} />
            {settings.showActivityGraph && (
                <ActivityGraph activityData={activityData} formatDate={formatDate} />
            )}
        </div>
    );
};

export default Dashboard;