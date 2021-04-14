import React from 'react';
import './App.css';

function ActivityCard({ activity }) {


    return (
        <div className="activity-card">
            <p>
                {activity.name}
            </p>
            <p>
                Price: {activity.price}
            </p>
            <p>
                Duration: {activity.minDuration}-{activity.maxDuration} hours
            </p>
        </div>
    )
}

export default ActivityCard;