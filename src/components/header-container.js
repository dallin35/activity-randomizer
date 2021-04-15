import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

function HeaderContainer({ selectRandomActivity, clearRandomActivity, hamburgerState, setHamburgerState }) {

    const handleRandomClick = function () {
        selectRandomActivity();
    }

    const handleClearRandom = function () {
        clearRandomActivity();
    }

    const backToTop = function () {
        scroll.scrollToTop({ smooth: true, duration: 250 });
    }

    function animateMenu() {
        scroll.scrollToTop({ smooth: true, duration: 250 });
        const newHamburgerState = {...hamburgerState};
        
        if  (newHamburgerState["hamburger"] === "") {
            newHamburgerState["hamburger"] = "change";
            newHamburgerState["hamburgerSlide"] = "cd-panel--is-visible";
        } else {
            newHamburgerState["hamburger"] = ""
            newHamburgerState["hamburgerSlide"] = ""
        }

        setHamburgerState(newHamburgerState);
    }

    return (
        <div className="header-container">
            <div className="left-header">
                <a href="#0" className={"container flex-left " + hamburgerState.hamburger} onClick={animateMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </a>
                <img className="logo-img flex-left" src="../logo.png" alt="Website Logo" />
            </div>
            <div className="center-header">Activity Randomizer</div>
            <div className="right-header">
                <div className="button random-button" onClick={handleRandomClick}>
                    Random
                </div>
                <div className="button random-button hide-it" onClick={handleClearRandom}>
                    Clear
                </div>
                <div className="button random-button" onClick={backToTop}>
                    To Top
                </div>
            </div>
        </ div>
    )
}

export default HeaderContainer;