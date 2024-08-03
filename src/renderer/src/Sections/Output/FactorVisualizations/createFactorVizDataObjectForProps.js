import getInstances from './getInstances';
import prepareDataForFactorViz from './prepareDataForFactorViz';
import i18n from 'i18next';
import outputState from '../../GlobalState/outputState';
// helper function
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// exported function
const createFactorVizDataObjectForProps = (factorVizOptions) => {
  console.log('line 10', JSON.stringify(factorVizOptions, null, 2));
  const shouldDisplayFactorViz = outputState.getState().displayFactorVisualizations;
  const userSelectedFactors = outputState.getState().userSelectedFactors;

  // early return if no display
  if (shouldDisplayFactorViz === false) {
    return {};
  }

  // create data object for render mapping
  let customFactorNamesArray;
  // getState
  // const userSelectedFactors = outputState.getState().userSelectedFactors;

  const positionData = getInstances();
  const numberOfFactors = userSelectedFactors.length;
  const data = prepareDataForFactorViz();
  const factorData = [];
  const useCustomNames = factorVizOptions.willAddCustomNames;
  if (useCustomNames) {
    const customFactorNamesArray1 = factorVizOptions.customFactorNames;
    if (customFactorNamesArray1.length !== 0) {
      customFactorNamesArray = customFactorNamesArray1.split(',');
    } else {
      customFactorNamesArray = [];
    }
  }

  // loop thru factors to set up config object
  for (let i = 0; i < numberOfFactors; i += 1) {
    let name;
    const factorName = capitalizeFirstLetter(userSelectedFactors[i]);
    const factorNum = factorName.charAt(factorName.length - 1);
    const id = factorName.replace(/\s+/g, '');

    if (useCustomNames) {
      name = customFactorNamesArray[i];
      if (name === undefined || name === '') {
        name = `${i18n.t('Composite Q sort for Factor')}${factorNum}`;
      }
    } else {
      name = `${i18n.t('Composite Q sort for Factor')}${factorNum}`;
    }
    const tempObj = {};
    tempObj.name = name;
    tempObj.id = id;
    tempObj.data = data[i];
    tempObj.positionData = positionData;
    tempObj.factorVizOptions = factorVizOptions;
    tempObj.shouldUseUnicode = factorVizOptions.shouldUseUnicode;
    tempObj.willDisplayDistingCompareSymbols = factorVizOptions.willDisplayDistingCompareSymbols;
    tempObj.willAdjustIndicatorSizeBy = factorVizOptions.willAdjustIndicatorSizeBy;
    factorData.push(tempObj);
  }

  console.log(JSON.stringify(factorData.factorVizOptions, null, 2));

  return factorData;
};

export default createFactorVizDataObjectForProps;
