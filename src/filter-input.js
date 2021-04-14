import React from 'react'

export default function FilterInput({ id, category, type, checked, value, toggleCheck, toggleRadio, filterActivities }) {

    let handleChange = function () {
        toggleCheck(id)
    }

    if (type === "radio") {
        handleChange = function () {
            toggleRadio(id)
            document.getElementById(id).setAttribute("checked", checked);
        }    
    }

    return (
        <div>
            <label className="filter-element">
                <input className="filter-element" id={id} onClick={handleChange} type={type} name={category} readOnly={true} checked={checked}/>
                {value.toString()}
            </label>
            <br />
        </div>
    )
}
