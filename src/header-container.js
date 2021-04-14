import React from 'react';
import {animateScroll as scroll} from 'react-scroll';

function HeaderContainer({ selectRandomActivity, clearRandomActivity }) {

    const handleRandomClick = function () {
        selectRandomActivity();
    }

    const handleClearRandom = function () {
        clearRandomActivity();
    }

    const backToTop = function () {
        scroll.scrollToTop({smooth: true, duration: 250});
    }

    return (
        <div className="header-container">
            <div className="left-header"></div>
            <div className="center-header">Activity Randomizer</div>
            <div className="right-header">
                <div className="random-button" onClick={handleRandomClick}>
                    Random
                </div>
                <div className="random-button" onClick={handleClearRandom}>
                    Clear
                </div>
                <div className="random-button" onClick={backToTop}>
                    To Top
                </div>
            </div>
        </ div>
    )
}

export default HeaderContainer;