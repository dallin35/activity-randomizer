import React, { useState } from 'react';
import FilterInput from './filter-input';


function FilterCollapsibleGroup({ filterInputs, categoryObject, toggleCheck, toggleRadio }) {

    const [toggle, setToggle] = useState(false);

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
                        Object.values(filterInputs).map((value, idx) => {
                            if (value.category === categoryObject.category) {
                                return (
                                    <div key={idx}>
                                        <FilterInput
                                            id={value.id}
                                            category={value.category}
                                            type={value.type}
                                            checked={value.checked}
                                            value={value.displayValue}
                                            toggleCheck={toggleCheck}
                                            toggleRadio={toggleRadio}
                                        />
                                        <br />
                                    </ div>
                                )
                            } else {
                                return (
                                    <div key={idx}></div>
                                )
                            }

                        })
                    }
                </div>
            ) : ""}
        </div>
    )
}

export default FilterCollapsibleGroup;