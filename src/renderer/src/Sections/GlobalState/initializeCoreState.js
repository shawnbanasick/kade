import coreState from "../GlobalState/coreState";

const initializeCoreState = () => {
  coreState.activeValueM6 = 0;
  coreState.activeValueM5 = 0;
  coreState.activeValueM4 = 0;
  coreState.activeValueM3 = 0;
  coreState.activeValueM2 = 0;
  coreState.activeValueM1 = 0;
  coreState.activeValue0 = 0;
  coreState.activeValue1 = 0;
  coreState.activeValue2 = 0;
  coreState.activeValue3 = 0;
  coreState.activeValue4 = 0;
  coreState.activeValue5 = 0;
  coreState.activeValue6 = 0;
  coreState.activeValue7 = 0;
  coreState.activeValue8 = 0;
  coreState.activeValue9 = 0;
  coreState.activeValue10 = 0;
  coreState.activeValue11 = 0;
  coreState.activeValue12 = 0;
  coreState.activeValue13 = 0;

  coreState.csvData = [];
  coreState.jsonObj = {};

  coreState.mainDataObject = [];
  coreState.multiplierArray = [];

  coreState.numQsorts = 0;
  coreState.numStatements = 0;

  coreState.oldQsortPattern = [];

  coreState.projectName = "My_Q_Project";
  coreState.qSortPattern = [];
  coreState.qSortPatternObject = {};

  coreState.respondentNames = [];

  coreState.statements = [];
  coreState.statementNumArray = [];

  coreState.sortsDisplayText = [];

  return;
};

export default initializeCoreState;
