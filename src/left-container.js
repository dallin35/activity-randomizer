import React from 'react';
import FilterCollapsibleGroup from './filter-collapsible-group'

function LeftContainer({ createFilterInput, filterActivities, filterInputs, filterData, resetFilters, toggleCheck, toggleRadio }) {
    // let filterArr = ["Free", "0-20", "20-40", "40+", "Indoor", "Outdoor", "Restaurant", "Not Restaurant", "Spring", "Summer", "Fall", "Winter"]
    // filterArr = ["Indoor"];


    const handleClearFilters = function () {
        resetFilters();
    }

    return (
        <div className="filter-container">
            <div className="clear-filter-button" onClick={handleClearFilters}>Clear All Filters</div>
            {
                Object.entries(filterData).map(([category, categoryObject], idx) => {
                    return (
                        <FilterCollapsibleGroup
                            category={category}
                            createFilterInput={createFilterInput}
                            filterInputs={filterInputs}
                            categoryObject={categoryObject}
                            toggleCheck={toggleCheck}
                            toggleRadio={toggleRadio}
                            filterActivities={filterActivities}
                            key={idx}
                        />
                    )
                })}
        </div>
    )
}

export default LeftContainer;