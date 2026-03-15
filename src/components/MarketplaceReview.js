import React from 'react';

const MarketplaceReview = ({ totalCustomers }) => {
    return (
        <div className="marketplace-review-section" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#374151' }}>Market Place Review</h2>
                <span style={{ fontSize: '0.875rem', color: '#666', backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px' }}>Trending Today</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Top Category</p>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>Electronics</h4>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#4caf50' }}>↑ 12% increase in sales</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Active Customers</p>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>{totalCustomers}</h4>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#4caf50' }}>↑ 5% growth this week</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.875rem', color: '#666' }}>Market Growth</p>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#4B5563' }}>Steady</h4>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: '#2196f3' }}>High engagement in results</p>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceReview;