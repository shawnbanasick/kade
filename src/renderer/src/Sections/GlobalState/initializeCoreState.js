import coreState from '../GlobalState/coreState';

const initializeCoreState = () => {
  const updateActiveValueM6 = coreState((state) => state.updateActiveValueM6);
  const updateActiveValueM5 = coreState((state) => state.updateActiveValueM5);
  const updateActiveValueM4 = coreState((state) => state.updateActiveValueM4);
  const updateActiveValueM3 = coreState((state) => state.updateActiveValueM3);
  const updateActiveValueM2 = coreState((state) => state.updateActiveValueM2);
  const updateActiveValueM1 = coreState((state) => state.updateActiveValueM1);
  const updateActiveValue0 = coreState((state) => state.updateActiveValue0);
  const updateActiveValue1 = coreState((state) => state.updateActiveValue1);
  const updateActiveValue2 = coreState((state) => state.updateActiveValue2);
  const updateActiveValue3 = coreState((state) => state.updateActiveValue3);
  const updateActiveValue4 = coreState((state) => state.updateActiveValue4);
  const updateActiveValue5 = coreState((state) => state.updateActiveValue5);
  const updateActiveValue6 = coreState((state) => state.updateActiveValue6);
  const updateActiveValue7 = coreState((state) => state.updateActiveValue7);
  const updateActiveValue8 = coreState((state) => state.updateActiveValue8);
  const updateActiveValue9 = coreState((state) => state.updateActiveValue9);
  const updateActiveValue10 = coreState((state) => state.updateActiveValue10);
  const updateActiveValue11 = coreState((state) => state.updateActiveValue11);
  const updateActiveValue12 = coreState((state) => state.updateActiveValue12);
  const updateActiveValue13 = coreState((state) => state.updateActiveValue13);

  const updateCsvData = coreState((state) => state.updateCsvData);
  const updateJsonObj = coreState((state) => state.updateJsonObj);

  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);

  const updateNumQsorts = coreState((state) => state.updateNumQsorts);
  const updateNumStatements = coreState((state) => state.updateNumStatements);

  const updateOldQsortPattern = coreState((state) => state.updateOldQsortPattern);

  const updateProjectName = coreState((state) => state.updateProjectName);
  const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  const updateQSortPatternObject = coreState((state) => state.updateQSortPatternObject);

  const updateRespondentNames = coreState((state) => state.updateRespondentNames);

  const updateStatements = coreState((state) => state.updateStatements);
  const updateStatementNumArray = coreState((state) => state.updateStatementNumArray);

  const updateSortsDisplayText = coreState((state) => state.updateSortsDisplayText);

  updateActiveValueM6(0);
  updateActiveValueM5(0);
  updateActiveValueM4(0);
  updateActiveValueM3(0);
  updateActiveValueM2(0);
  updateActiveValueM1(0);
  updateActiveValue0(0);
  updateActiveValue1(0);
  updateActiveValue2(0);
  updateActiveValue3(0);
  updateActiveValue4(0);
  updateActiveValue5(0);
  updateActiveValue6(0);
  updateActiveValue7(0);
  updateActiveValue8(0);
  updateActiveValue9(0);
  updateActiveValue10(0);
  updateActiveValue11(0);
  updateActiveValue12(0);
  updateActiveValue13(0);

  updateCsvData([]);
  updateJsonObj({});

  updateMainDataObject([]);
  updateMultiplierArray([]);

  updateNumQsorts(0);
  updateNumStatements(0);

  updateOldQsortPattern([]);

  updateProjectName('My_Q_Project');
  updateQSortPattern([]);
  updateQSortPatternObject({});

  updateRespondentNames([]);

  updateStatements([]);
  updateStatementNumArray([]);

  updateSortsDisplayText([]);

  return;
};

export default initializeCoreState;
