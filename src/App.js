import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import './App.css';
import './activity-data.json'
import Home from './home';
import HeaderContainer from './header-container'
import LeftContainer from './left-container'
import FooterContainer from './footer-container'

function App() {

  const activityDataJSON = require('./activity-data.json');
  const activityData = activityDataJSON.activities.slice();

  const filterDataJSON = require('./filter-data.json');
  const filterData = [...filterDataJSON.categories];

  const callbacks = {}

  const [activities, setActivities] = useState(activityData);;
  const [filters, setFilters] = useState(filterData);
  const [filterValues, setFilterValues] = useState({});

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
    setFilterValues(newFilterValues);
  }

  useEffect(() => {
    filterActivities();
  }, [filterValues]);

  const filterPrice = function (activities) {
    let newActivities = [];
    let shouldAdd = false;
    let priceFilters = [];

    for (const property in filterValues) {
      if (Object.keys(filterValues[property])[0] === "price") {
        priceFilters.push(Object.values(filterValues[property])[0]);
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

  const filterBoolean = function (activities, fieldName) {
    let newActivities = [];
    let shouldAdd = false;
    let booleanFilters = [];

    for (const property in filterValues) {
      if (Object.keys(filterValues[property])[0] === fieldName) {
        booleanFilters.push(Object.values(filterValues[property])[0]);
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

  const filterIndoorOutdoor = function (activities) {
    let newActivities = [];
    let shouldAdd = false;
    let indoorFilters = [];
    let outdoorFilters = [];

    for (const property in filterValues) {
      if (Object.keys(filterValues[property])[0] === "isIndoor") {
        indoorFilters.push(Object.values(filterValues[property])[0]);
      } else if (Object.keys(filterValues[property])[0] === "isOutdoor") {
        outdoorFilters.push(Object.values(filterValues[property])[0])
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

  const filterSeasons = function (activities) {
    let newActivities = [];
    let shouldAdd = false;
    let seasonCount = 0;
    let isSpring = false;
    let isSummer = false;
    let isFall = false;
    let isWinter = false;

    for (const property in filterValues) {
      if (Object.keys(filterValues[property])[0] === "inSpring") {
        isSpring = true;
        seasonCount += 1;
      } else if (Object.keys(filterValues[property])[0] === "inSummer") {
        isSummer = true;
        seasonCount += 1;
      } else if (Object.keys(filterValues[property])[0] === "inFall") {
        isFall = true;
        seasonCount += 1;
      } else if (Object.keys(filterValues[property])[0] === "inWinter") {
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

  const filterActivities = function () {
    const allActivities = [...activityData];
    let newActivities = [];

    newActivities = filterPrice(allActivities);
    newActivities = filterIndoorOutdoor(newActivities);
    newActivities = filterBoolean(newActivities, "isRestaurant");
    newActivities = filterBoolean(newActivities, "isSnack");
    newActivities = filterSeasons(newActivities);

    setActivities(newActivities);
  }

  const resetFilters = function () {
    initializeFilters();
    setFilterInputs(newFilterInputs);
    setFilterValues({});

    setActivities(activityData);
  }


  return (
    <>
      <div className="header-container">
        <HeaderContainer />
      </div>
      <div id="content">
        <div className="left-container">
          <LeftContainer
            resetFilters={resetFilters}
            filterInputs={filterInputs}
            createFilterInput={createFilterInput}
            filterData={filters}
            toggleCheck={toggleCheck}
            toggleRadio={toggleRadio}
            filterActivities={filterActivities}
          />
        </div>
        <div className="home">
          <Home activities={activities} />
          <br />
          <br />
        </div>
      </div>
      {/* <div className="footer-container">
        <FooterContainer />
      </div> */}
    </>

  );
}

export default App;
