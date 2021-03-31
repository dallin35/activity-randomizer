import React from 'react';
import ActivityCard from './activity-card';
import "./App.css";

function Home(props) {

    const cardCountArr = [];

    for (let i=0; i<150; i++) {
        cardCountArr.push(i+1);
    }

    return (
        <div class="home-content">
            {Object.values(cardCountArr).map((count, idx) => {
                return (
                    <ActivityCard count={count}/>
                )
            })}
        </div>
    )
}

export default Home;