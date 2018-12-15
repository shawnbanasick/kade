import store from "../../../store";
import getInstances from "./getInstances";
import prepareDataForFactorViz from "./prepareDataForFactorViz";

// helper function
const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// exported function
const createFactorVizDataObjectForProps = factorVizOptions => {
  const shouldDisplayFactorViz = store.getState("displayFactorVisualizations");

  // early return if no display
  if (shouldDisplayFactorViz === false) {
    return {};
  }

  // todo - check to see if still needed
  // const shouldUseUnicode = store.getState("willUseDistingUnicode");
  // const shouldShowZscoreArrows = store.getState(
  //     "willDisplayDistingCompareSymbols"
  // );

  // set default font size for significance indicators
  // const willAdjustIndicatorSize = store.getState("willAdjustDistIndicatorSize");
  // let willAdjustIndicatorSizeBy = 12;
  // if (willAdjustIndicatorSize) {
  //     willAdjustIndicatorSizeBy = store.getState("willAdjustDistIndicatorSizeBy");
  // }

  // create data object for render mapping
  let customFactorNamesArray;
  const userSelectedFactors = store.getState("userSelectedFactors");
  const positionData = getInstances();
  const numberOfFactors = store.getState("userSelectedFactors").length;
  const data = prepareDataForFactorViz();
  const factorData = [];
  const useCustomNames = factorVizOptions.willAddCustomNames;
  if (useCustomNames) {
    const customFactorNamesArray1 = factorVizOptions.customFactorNames;
    if (customFactorNamesArray1.length !== 0) {
      customFactorNamesArray = customFactorNamesArray1.split(",");
    } else {
      customFactorNamesArray = [];
    }
  }

  // loop thru factors to set up config object
  for (let i = 0; i < numberOfFactors; i += 1) {
    let name;
    const factorName = capitalizeFirstLetter(userSelectedFactors[i]);
    const id = factorName.replace(/\s+/g, "");
    if (useCustomNames) {
      console.log(
        `custom names: ${JSON.stringify([...customFactorNamesArray])}`
      );

      name = customFactorNamesArray[i];
      if (name === undefined || name === "") {
        name = `Composite Q-sort for ${factorName}`;
      }
    } else {
      name = `Composite Q-sort for ${factorName}`;
    }
    // let tempId = userSelectedFactors[i].replace(/\s+/g, "");
    const tempObj = {};

    tempObj.name = name;

    tempObj.id = id;
    tempObj.data = data[i];
    tempObj.positionData = positionData;
    tempObj.factorVizOptions = factorVizOptions;
    tempObj.shouldUseUnicode = factorVizOptions.shouldUseUnicode;
    tempObj.willDisplayDistingCompareSymbols =
      factorVizOptions.willDisplayDistingCompareSymbols;
    tempObj.willAdjustIndicatorSizeBy =
      factorVizOptions.willAdjustIndicatorSizeBy;
    factorData.push(tempObj);
  }
  console.log(JSON.stringify("createFactorVizDataObjectForProps"));

  return factorData;
};

export default createFactorVizDataObjectForProps;
