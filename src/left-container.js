import React from 'react';
import './App.css';
import FilterComponent from './filter-component'

function LeftContainer(props) {
    const filterArr = ["Free", "0-20", "20-40", "40+", "Price", "Season", "Indoor v. Outdoor", "Restaurant?"]

    return (
        <div class="filter-container">
            {Object.values(filterArr).map((value, idx) => {
                return (
                    <FilterComponent count={value}/>
                )
            })}
        </div>
    )

    return (
        <div id="filter-box">Left Container</div>
    )
}

export default LeftContainer;