import React from 'react';
import ActivityCard from './activity-card';

function Home({ activities }) {

    // const cardCountArr = [];

    // for (let i = 0; i < 150; i++) {
    //     cardCountArr.push(i + 1);
    // }
    if (Object.values(activities).length > 0) {
        return (
            <div className="home-content">
                {Object.values(activities).map((activity, idx) => {
                    return (
                        <ActivityCard key={activity.id} activity={activity} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="home-content">
                <div className="activity-card">
                    <p>
                        Sorry, it looks like there aren't any activities that match your requirements yet.
                </p>
                </div>
            </div>
        )
    }
}

export default Home;