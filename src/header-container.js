import React from 'react';

function HeaderContainer(props) {

    let handleRandomClick = function () {
        console.log("a random activity");
    }

    return (
        <>
            <div className="right-header"></div>
            <div className="center-header">Activity Randomizer</div>
            <div className="right-header">
                <div className="random-button" onClick={handleRandomClick}>
                    Random Activity
                </div>
            </div>
        </>
    )
}

export default HeaderContainer;