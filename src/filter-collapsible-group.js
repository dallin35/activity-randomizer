import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import FilterInput from './filter-input';


function FilterCollapsibleGroup({ createFilterInput, filterActivities, filterInputs, categoryObject, toggleCheck, toggleRadio }) {

    const [toggle, setToggle] = useState(false);
    let filterOptions;

    // function handleCallback() {
    //     callback();
    // }

    const togglePanel = (e) => {
        setToggle(!toggle);
    }

    return (
        // <button onClick={handleCallback} className="filter-component">
        //     {name}
        // </button>
        <div>
            <div onClick={togglePanel} className="filter-collapsible-group">
                {categoryObject.category}
            </div>
            {toggle ? (
                <div className="filter-content collapsible">
                    {
                        Object.values(filterInputs).map((value, idx,) => {
                            if (value.category === categoryObject.category) {
                                return (
                                    <>
                                        <FilterInput
                                            id={value.id}
                                            category={value.category}
                                            type={value.type}
                                            checked={value.checked}
                                            value={value.displayValue}
                                            toggleCheck={toggleCheck}
                                            toggleRadio={toggleRadio}
                                            filterActivities={filterActivities}
                                            key={idx}
                                        />
                                        <br />
                                    </>
                                )
                            }

                        })
                    }
                </div>
            ) : null}
        </div>
    )
}

export default FilterCollapsibleGroup;