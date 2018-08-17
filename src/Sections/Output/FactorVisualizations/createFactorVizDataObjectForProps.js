import store from "../../store";
import getInstances from "./getInstances";
import prepareDataForFactorViz from "./prepareDataForFactorViz";

// helper function
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// exported function
const createFactorVizDataObjectForProps = factorVizOptions => {
  let shouldDisplayFactorViz = store.getState("displayFactorVisualizations");

  // early return if no display
  if (shouldDisplayFactorViz === false) {
    return {};
  }

  // todo - check to see if still needed
  let shouldUseUnicode = store.getState("willUseDistingUnicode");
  let shouldShowZscoreArrows = store.getState(
    "willDisplayDistingCompareSymbols"
  );

  // set default font size for significance indicators
  let willAdjustIndicatorSize = store.getState("willAdjustDistIndicatorSize");
  let willAdjustIndicatorSizeBy = 12;
  if (willAdjustIndicatorSize) {
    willAdjustIndicatorSizeBy = store.getState("willAdjustDistIndicatorSizeBy");
  }

  // create data object for render mapping
  let customFactorNamesArray;
  let userSelectedFactors = store.getState("userSelectedFactors");
  let positionData = getInstances();
  let numberOfFactors = store.getState("userSelectedFactors").length;
  let data = prepareDataForFactorViz();
  let factorData = [];
  let useCustomNames = factorVizOptions.willAddCustomNames;
  if (useCustomNames) {
    let customFactorNamesArray1 = factorVizOptions.customFactorNames;
    customFactorNamesArray = customFactorNamesArray1.split(",");
  }

  // loop thru factors to set up config object
  for (let i = 0; i < numberOfFactors; i++) {
    let name;
    let factorName = capitalizeFirstLetter(userSelectedFactors[i]);
    let id = factorName.replace(/\s+/g, "");
    if (useCustomNames) {
      console.log(
        "custom names: " + JSON.stringify([...customFactorNamesArray])
      );

      name = customFactorNamesArray[i];
      if (name === undefined || name === "") {
        name = "Composite Q-sort for " + factorName;
      }
    } else {
      name = "Composite Q-sort for " + factorName;
    }
    // let tempId = userSelectedFactors[i].replace(/\s+/g, "");
    let tempObj = {};

    tempObj.name = name;

    tempObj.id = id;
    tempObj.data = data[i];
    tempObj.positionData = positionData;
    tempObj.factorVizOptions = factorVizOptions;
    tempObj.shouldUseUnicode = shouldUseUnicode;
    tempObj.shouldShowZscoreArrows = shouldShowZscoreArrows;
    tempObj.willAdjustIndicatorSizeBy = willAdjustIndicatorSizeBy;
    factorData.push(tempObj);
  }
  return factorData;
};

export default createFactorVizDataObjectForProps;
