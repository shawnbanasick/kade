import calculateCorrelations from './calcCorrelations';
import inputDataErrorMessage from '../inputDataErrorMessage';
import inputState from '../../GlobalState/inputState';
import correlationState from '../../GlobalState/correlationState';
import appState from '../../GlobalState/appState';
import coreState from '../../GlobalState/coreState';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';

const mainCorrCalcs = (respondentNames, rawSortsArray) => {
  if (respondentNames.length > 0) {
    // set up comparison array

    console.log(coreState.getState().numStatements);
    console.log(coreState.getState().qSortPattern);
    let qSortPattern = coreState.getState().qSortPattern;
    console.log(('qSortPattern: ', qSortPattern[0]));
    const qSortPatternCopy = qSortPattern.slice();
    qSortPatternCopy.sort((a, b) => b - a);
    const sortedPatternText = qSortPatternCopy.toString();

    // do data error checks
    const isForcedQsortPattern = inputState.getState().isForcedQsortPattern;
    console.log(JSON.stringify('isForcedQsortPattern: ', isForcedQsortPattern));
    const totalStatements = coreState.getState().numStatements;
    console.log(JSON.stringify('totalStatements: ', totalStatements));

    const qSortPatternMax = Math.max(...qSortPattern);
    const qSortPatternMin = Math.min(...qSortPattern);
    let errorMessage;
    let explanation;
    let isError = false;

    if (totalStatements !== qSortPattern.length) {
      errorMessage = i18n.t('The number of statements does not match the number of sort values');
      explanation = i18n.t('Check the number of statements and the Q Sort Design data');
      inputDataErrorMessage(errorMessage, explanation);
      isError = true;
    }

    const trans1 = i18n.t(
      'Check the Q sort data in your file clear the project and reload your data'
    );
    const trans2 = i18n.t('First check the Q sort design data');
    const trans3 = i18n.t(
      'For JSON input the Q sort design is taken from the Q sort data of the last participant in the input file'
    );
    const trans4 = i18n.t('For XLSX input the Q sort design is taken from the Q sorts worksheet');
    const trans5 = i18n.t(
      'If your project contains UNFORCED Q sorts remember to select the unforced sorts radio button in the 1 Input section'
    );

    if (isForcedQsortPattern) {
      console.log(JSON.stringify('rawSortsArray: ', rawSortsArray));

      for (let i = 0, iLen = rawSortsArray.length; i < iLen; i += 1) {
        // convert to string for comparison to q sort pattern
        const participantQsortCopy = rawSortsArray[i].slice();
        const sortedValues = participantQsortCopy.sort((a, b) => b - a);
        const sortedValuesText = sortedValues.toString();
        // throw error modal notification when no match
        if (sortedValuesText !== sortedPatternText) {
          errorMessage = `${i18n.t(
            'Q sort does not match the project Q sort design'
          )}: ${respondentNames[i]}`;
          explanation = `${trans1}. ${trans2}. ${trans3} ${trans4}. ${trans5}.`;

          inputDataErrorMessage(errorMessage, explanation);
          isError = true;
          break;
        }
      }
    }

    // loop to check for NaN
    // var res = array.every(function(element) {return typeof element === 'number';});
    const trans1b = i18n.t('For projects with unforced data you must input the Q Sort Design data');
    const trans2b = i18n.t('Please go back to the 1 Input section and input the Q Sort Design');

    if (!isForcedQsortPattern) {
      if (qSortPattern.length !== rawSortsArray[0].length) {
        errorMessage = i18n.t('Q sort Design Input does not match input data');
        explanation = `${trans1b}. ${trans2b}.`;
        inputDataErrorMessage(errorMessage, explanation);
        isError = true;
        // state.setState({
        //   isCorrelationsButtonGreen: false
        // });
        return;
      }

      const trans1c = i18n.t('Q sort with an out-of-range value');

      for (let i = 0, iLen = rawSortsArray.length; i < iLen; i += 1) {
        // check for out of range values
        const maxValue = Math.max(...rawSortsArray[i]);
        const minValue = Math.min(...rawSortsArray[i]);
        if (maxValue > qSortPatternMax || minValue < qSortPatternMin) {
          errorMessage = `${trans1c}: ${respondentNames[i]}`;
          explanation = trans1;

          inputDataErrorMessage(errorMessage, explanation);
          isError = true;
          break;
        }
      }
    }
    // do the calcuations
    if (isError === false) {
      calculateCorrelations(rawSortsArray, respondentNames);
    }
    correlationState.setState({ showCorrelationMatrix: true });
    correlationState.setState({ activeStartAnalysisButton: true });
    correlationState.setState({ isLoadingBeginAnalysis: false });
    appState.setState({ isCorrelationsButtonGreen: true });
    inputState.setState({ isDataAlreadyLoaded: true });
  }
};

export default mainCorrCalcs;
