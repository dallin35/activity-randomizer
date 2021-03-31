import React from 'react';
import './App.css';

function ActivityCard(props) {


    return (
        <div className="activity-card">{props.count}</div>
    )
}

export default ActivityCard;