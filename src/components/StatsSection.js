import React from 'react';

const StatsSection = ({ stats, settings, formatCurrency }) => {
    const statsArray = [
        {
            icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>),
            iconClass: 'revenue-icon',
            value: formatCurrency(stats.totalRevenue),
            label: 'Total Revenue',
            show: settings.showRevenue
        },
        {
            icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>),
            iconClass: 'customers-icon',
            value: stats.totalCustomers,
            label: 'Total Customers'
        },
        {
            icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>),
            iconClass: 'orders-icon',
            value: stats.totalOrders,
            label: 'Total Orders'
        },
        {
            icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>),
            iconClass: 'inventory-icon',
            value: stats.totalInventory,
            label: 'Total Products'
        },
        {
            icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>),
            iconClass: 'low-stock-icon',
            value: stats.lowStock,
            label: 'Low Stock Items',
            show: stats.lowStock > 0
        }
    ];

    const visibleStats = statsArray.filter(stat => stat.show !== false);

    if (settings.dashboardView === 'list') {
        return (
            <div className="stats-list">
                {visibleStats.map((stat, index) => (
                    <div key={index} className="stat-list-item">
                        <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
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
        return (
            <div className="stats-grid">
                {visibleStats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
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

export default StatsSection;