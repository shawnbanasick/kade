import coreState from '../../GlobalState/coreState';
import cleanRespondentNames from '../CSV/cleanRespondentNames';
// import getInputState from "../../GlobalState/getInputState";
// import setForcedUnforcedErrorContent from "../CSV/setForcedUnforcedErrorContent";
// import setNonNumericErrorContent from "../CSV/setNonNumericErrorContent";
// import setBeyondRangeErrorContent from "../CSV/setBeyondRangeErrorContent";
// import setDuplicatedNamesErrorContent from "../CSV/setDuplicatedNamesErrorContent";
// import setOverUnderCountErrorContent from "../CSV/setOverUnderCountErrorContent";
// import checkForcedUnforcedSorts from "../../Data/Databook/checkForcedUnforcedSorts ";
// NO ZEROS In Qsort Pattern
//
import addPosShiftSorts from '../CSV/addPosShiftSorts';
import standardCheckForUnforcedSorts from './standardCheckForUnforced';
import checkForOutOfRangeValues2 from './checkForOutOfRangeValues2';
import checkForIncorrectLengths from './checkForIncorrectLengths';
import checkForIncorrectQsortPattern from './checkForIncorrectQsortPattern';
import checkForNan from './checkForNan';

const standardImportErrorChecks = () => {
  const mainDataObject = coreState.getState().mainDataObject;
  const numStatements = coreState.getState().numStatements;
  const qSortPattern = coreState.getState().qSortPattern;
  const respondentNames = coreState.getState().respondentNames;
  // const multiplierArray = getCoreState("multiplierArray");
  // const multiplierArray = getCoreState("multiplierArray");
  // const unforcedRadioButtonState = getInputState("unforcedRadioButtonState");

  const min = Math.min(...qSortPattern);
  const max = Math.max(...qSortPattern);

  const testSortArray = mainDataObject.map((item) => item.rawSort);

  let errorResponseArray = [];

  // check values beyond Q sort design
  let test1 = checkForOutOfRangeValues2([...testSortArray], min, max, respondentNames);
  errorResponseArray.push(test1);

  if (!errorResponseArray.includes(false)) {
    let test2 = checkForIncorrectLengths(
      [...testSortArray],
      numStatements,
      qSortPattern,
      respondentNames
    );
    errorResponseArray.push(test2);
  }

  if (!errorResponseArray.includes(false)) {
    let test3 = checkForIncorrectQsortPattern([...testSortArray], [...qSortPattern], numStatements);
    errorResponseArray.push(test3);
  }

  if (!errorResponseArray.includes(false)) {
    let test4 = checkForNan([...testSortArray]);
    errorResponseArray.push(test4);
  }

  if (!errorResponseArray.includes(false)) {
    let test5 = standardCheckForUnforcedSorts([...testSortArray], qSortPattern, respondentNames);
    errorResponseArray.push(test5);
  }

  // if forced and has UNFORCED sorts or input errors
  // if (test3[0].length > 0 && unforcedRadioButtonState === "forced") {
  //   setForcedUnforcedErrorContent(test3);
  //   return false;
  // }

  // ADJUSTMENTS - after passing tests
  // remove periods from participant names
  let adjustment1 = cleanRespondentNames(respondentNames);
  let adjustment2 = addPosShiftSorts(mainDataObject, min);

  coreState.setState({ respondentNames: adjustment1 });
  coreState.setState({ mainDataObject: adjustment2 });
  if (errorResponseArray.includes(false)) {
    return false;
  } else {
    return true;
  }
};

export default standardImportErrorChecks;

/*
  // if there are NON-Numeric values
  if (test1[0].length > 0) {
    setNonNumericErrorContent(test1, respondentNames);
    return false;
  }
  // if there are beyond MIN-MAX values
  if (test1[1].length > 0) {
    setBeyondRangeErrorContent(test1, respondentNames);
    return false;
  }
  // if there are Q sorts with incorrect number of entries
  if (test1[2].length > 0) {
    setOverUnderCountErrorContent(test1, respondentNames);
  }
  // if has duplicate names
  if (test2 === true) {
    setDuplicatedNamesErrorContent();
    return false;
  }
  */
