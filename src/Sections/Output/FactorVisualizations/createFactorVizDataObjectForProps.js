import state from "../../../store";
import getInstances from "./getInstances";
import prepareDataForFactorViz from "./prepareDataForFactorViz";

// helper function
const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// exported function
const createFactorVizDataObjectForProps = factorVizOptions => {
  const shouldDisplayFactorViz = state.getState("displayFactorVisualizations");

  // early return if no display
  if (shouldDisplayFactorViz === false) {
    return {};
  }

  // create data object for render mapping
  let customFactorNamesArray;
  const userSelectedFactors = state.getState("userSelectedFactors");
  const positionData = getInstances();
  const numberOfFactors = state.getState("userSelectedFactors").length;
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
      name = customFactorNamesArray[i];
      if (name === undefined || name === "") {
        name = `Composite Q sort for ${factorName}`;
      }
    } else {
      name = `Composite Q sort for ${factorName}`;
    }
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
  return factorData;
};

export default createFactorVizDataObjectForProps;
