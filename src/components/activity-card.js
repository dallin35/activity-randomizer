import React from 'react';

function ActivityCard({ activity }) {
    let cssClass = activity?.style ?? "activity-card"
    let cssId = activity?.randomId ?? ""

    return (
        <>
            <div className={cssClass}>
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
            <div id={cssId} />
        </>
    )
}

export default ActivityCard;