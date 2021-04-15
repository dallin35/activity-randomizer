import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { animateScroll as scroll } from "react-scroll";
import './styles/App.css';
import './styles/mobile.css';
import './styles/hamburger-menu.css';
import './styles/hamburger-slide.css';
import './styles/browser.css';
import Home from './components/home';
import HeaderContainer from './components/header-container'
import LeftContainer from './components/left-container'

function App() {

  const activityDataJSON = require('./data-files/activity-data.json');
  const activityData = activityDataJSON.activities.slice();

  const filterDataJSON = require('./data-files/filter-data.json');
  const filterData = [...filterDataJSON.categories];

  const filters = [...filterData];
  const [activities, setActivities] = useState(activityData);;
  const [filterValues, setFilterValues] = useState({});

  const [hamburgerState, setHamburgerState] = useState({hamburger: "", hamburgerSlide: ""});

  let newFilterInputs = [];

  const createFilterInput = function (id, category, type, checked, displayValue, keyValuePair) {
    let newFilterInput = {
      "id": id,
      "category": category,
      "type": type,
      "checked": checked,
      "displayValue": displayValue,
      "keyValuePair": keyValuePair
    }

    newFilterInputs.push(newFilterInput);
  }

  const initializeFilters = function () {
    newFilterInputs = [];
    for (let i = 0; i < filterData.length; i++) {
      for (const value in filterData[i].displayValues) {
        createFilterInput(
          uuidv4(),
          filterData[i].category,
          filterData[i].inputType,
          filterData[i].checked,
          filterData[i].displayValues[value],
          filterData[i].keyValuePairs[value]
        )
      }
    }
  }

  initializeFilters();

  const [filterInputs, setFilterInputs] = useState(newFilterInputs);

  const toggleCheck = function (id) {
    const newFilterInputs = [...filterInputs];
    const newFilterValues = { ...filterValues };

    const filterInput = newFilterInputs.find(filterInput => filterInput.id === id);
    filterInput.checked = !filterInput.checked;
    setFilterInputs(newFilterInputs);

    if (filterInput.checked === true) {
      newFilterValues[id] = filterInput.keyValuePair;
    } else {
      delete newFilterValues[id];
    }
    filterActivities(newFilterValues);
    setFilterValues(newFilterValues);
  }

  const toggleRadio = function (id) {
    const newFilterInputs = [...filterInputs];
    const newFilterValues = { ...filterValues };

    const filterInput = newFilterInputs.find(filterInput => filterInput.id === id);
    const category = filterInput.category;

    for (let i = 0; i < newFilterInputs.length; i++) {
      if (newFilterInputs[i].category === category && newFilterInputs[i].id !== id) {
        newFilterInputs[i].checked = false;
        delete newFilterValues[Object.keys(newFilterInputs[i].keyValuePair)[0]];

      }
    }

    filterInput.checked = !filterInput.checked;
    setFilterInputs(newFilterInputs);

    if (filterInput.checked === true) {
      newFilterValues[Object.keys(filterInput.keyValuePair)] = filterInput.keyValuePair;
    } else {
      delete newFilterValues[Object.keys(filterInput.keyValuePair)[0]];
    }
    filterActivities(newFilterValues);
    setFilterValues(newFilterValues);
  }

  const filterPrice = function (activities, theseFilters) {
    let newActivities = [];
    let shouldAdd = false;
    let priceFilters = [];

    for (const property in theseFilters) {
      if (Object.keys(theseFilters[property])[0] === "price") {
        priceFilters.push(Object.values(theseFilters[property])[0]);
      }
    }

    if (priceFilters.length > 0) {

      for (const index in activities) {
        shouldAdd = false;
        for (const indexTwo in priceFilters) {

          if (activities[index]["price"] === priceFilters[indexTwo]) {
            shouldAdd = true;
          }

        }
        if (shouldAdd) {
          newActivities.push(activities[index]);
        }
      }

    } else {
      newActivities = [...activities];
    }

    return newActivities
  }

  const filterBoolean = function (activities, fieldName, theseFilters) {
    let newActivities = [];
    let shouldAdd = false;
    let booleanFilters = [];

    for (const property in theseFilters) {
      if (Object.keys(theseFilters[property])[0] === fieldName) {
        booleanFilters.push(Object.values(theseFilters[property])[0]);
      }
    }

    if (booleanFilters.length > 0) {

      for (const index in activities) {
        shouldAdd = false;
        for (const indexTwo in booleanFilters) {

          if (activities[index][fieldName] === booleanFilters[indexTwo]) {
            shouldAdd = true;
          }

        }
        if (shouldAdd) {
          newActivities.push(activities[index]);
        }
      }
    } else {
      newActivities = [...activities];
    }

    return newActivities
  }

  const filterIndoorOutdoor = function (activities, theseFilters) {
    let newActivities = [];
    let shouldAdd = false;
    let indoorFilters = [];
    let outdoorFilters = [];

    for (const property in theseFilters) {
      if (Object.keys(theseFilters[property])[0] === "isIndoor") {
        indoorFilters.push(Object.values(theseFilters[property])[0]);
      } else if (Object.keys(theseFilters[property])[0] === "isOutdoor") {
        outdoorFilters.push(Object.values(theseFilters[property])[0])
      }
    }

    if (indoorFilters.length > 0) {

      for (const index in activities) {
        shouldAdd = false;
        for (const indexTwo in indoorFilters) {

          if (activities[index]["isIndoor"] === indoorFilters[indexTwo]) {
            shouldAdd = true;
          }

        }
        if (shouldAdd) {
          newActivities.push(activities[index]);
        }
      }
    } else if (outdoorFilters.length > 0) {
      for (const index in activities) {
        shouldAdd = false;
        for (const indexTwo in outdoorFilters) {

          if (activities[index]["isOutdoor"] === outdoorFilters[indexTwo]) {
            shouldAdd = true;
          }

        }
        if (shouldAdd) {
          newActivities.push(activities[index]);
        }

      }

    } else {
      newActivities = [...activities];
    }

    return newActivities
  }

  const filterSeasons = function (activities, theseFilters) {
    let newActivities = [];
    let shouldAdd = false;
    let seasonCount = 0;
    let isSpring = false;
    let isSummer = false;
    let isFall = false;
    let isWinter = false;

    for (const property in theseFilters) {
      if (Object.keys(theseFilters[property])[0] === "inSpring") {
        isSpring = true;
        seasonCount += 1;
      } else if (Object.keys(theseFilters[property])[0] === "inSummer") {
        isSummer = true;
        seasonCount += 1;
      } else if (Object.keys(theseFilters[property])[0] === "inFall") {
        isFall = true;
        seasonCount += 1;
      } else if (Object.keys(theseFilters[property])[0] === "inWinter") {
        isWinter = true;
        seasonCount += 1;
      }
    }

    if (seasonCount > 0) {

      for (const index in activities) {
        shouldAdd = false;

        if (isSpring) {
          if (activities[index]["inSpring"] === 1) {
            shouldAdd = true;
          }
        }
        if (isSummer) {
          if (activities[index]["inSummer"] === 1) {
            shouldAdd = true;
          }
        }
        if (isFall) {
          if (activities[index]["inFall"] === 1) {
            shouldAdd = true;
          }
        }
        if (isWinter) {
          if (activities[index]["inWinter"] === 1) {
            shouldAdd = true;
          }
        }

        if (shouldAdd) {
          newActivities.push(activities[index]);
        }

      }

    } else {
      newActivities = [...activities];
    }

    return newActivities
  }

  const filterActivities = function (theseFilterValues) {
    clearRandomActivity();
    const allActivities = [...activityData];
    let newActivities = [];

    newActivities = filterPrice(allActivities, theseFilterValues);
    newActivities = filterIndoorOutdoor(newActivities, theseFilterValues);
    newActivities = filterBoolean(newActivities, "isRestaurant", theseFilterValues);
    newActivities = filterBoolean(newActivities, "isSnack", theseFilterValues);
    newActivities = filterSeasons(newActivities, theseFilterValues);

    setActivities(() => {
      return newActivities;
    });
  }


  const resetFilters = function () {
    initializeFilters();
    setFilterInputs(newFilterInputs);
    setFilterValues({});
    clearRandomActivity();

    setActivities(activityData);
  }

  const [previousRandomActivity, setPreviousRandomActivity] = useState()

  const clearRandomActivity = function () {
    const newActivities = [...activities];

    if (previousRandomActivity !== undefined) {

      if (previousRandomActivity > newActivities.length - 1) {
        setPreviousRandomActivity(undefined);
      } else {
        const exRandomActivity = newActivities[previousRandomActivity]
        delete exRandomActivity.style;
        delete exRandomActivity.randomId;

        setPreviousRandomActivity(undefined);

      }

      setActivities(newActivities);
    }
  }

  const selectRandomActivity = function () {
    clearRandomActivity();
    let newHamState = {...hamburgerState};

    if (hamburgerState.hamburger !== "") {

      newHamState.hamburger = "";
      newHamState.hamburgerSlide = "";
    }

    const newActivities = [...activities];

    const randomNum = Math.floor(Math.random() * newActivities.length);

    setPreviousRandomActivity(randomNum)

    const newActivity = newActivities[randomNum];

    newActivity["style"] = "selected-activity-card"
    newActivity["randomId"] = "selected-activity";

    setHamburgerState(newHamState);
    setActivities(newActivities);
  }

  useEffect(() => {
    scrollToActivity();
  }, [previousRandomActivity]);

  const scrollToActivity = function () {

    let elem = document.getElementById("selected-activity");

    if (elem !== null) {
      let rect = elem.getBoundingClientRect();
      scroll.scrollMore(rect.y, { to: "selected-activity", smooth: true, duration: 750 })
    }
  }

  return (
    <div>
      <div>
        <HeaderContainer
          selectRandomActivity={selectRandomActivity}
          clearRandomActivity={clearRandomActivity}
          hamburgerState={hamburgerState}
          setHamburgerState={setHamburgerState}
        />
      </div>
      <div id="content">
        <div id="slide-panel" className={"left-container cd-panel cd-panel--from-left js-cd-panel-main " + hamburgerState["hamburgerSlide"]}>
          <div className="cd-panel__header" />
          <div className="cd-panel__container">
            <LeftContainer
              resetFilters={resetFilters}
              filterInputs={filterInputs}
              createFilterInput={createFilterInput}
              filterData={filters}
              toggleCheck={toggleCheck}
              toggleRadio={toggleRadio}
            />
          </div>
        </div>
        <div className="home">
          <Home activities={activities} />
          <br />
          <br />
        </div>
      </div>
    </div>

  );
}

export default App;
