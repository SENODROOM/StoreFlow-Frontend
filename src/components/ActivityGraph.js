import React from 'react';

const ActivityGraph = ({ activityData, formatDate }) => {
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getActivityLevel = (count) => {
        if (count === 0) return 'level-0';
        if (count <= 2) return 'level-1';
        if (count <= 4) return 'level-2';
        if (count <= 6) return 'level-3';
        return 'level-4';
    };

    return (
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
    );
};

export default ActivityGraph;