import { store } from '@risingstack/react-easy-state';

const coreState = store({
  activeValueM6: 0,
  activeValueM5: 0,
  activeValueM4: 0,
  activeValueM3: 0,
  activeValueM2: 0,
  activeValueM1: 0,
  activeValue0: 0,
  activeValue1: 0,
  activeValue2: 0,
  activeValue3: 0,
  activeValue4: 0,
  activeValue5: 0,
  activeValue6: 0,
  activeValue7: 0,
  activeValue8: 0,
  activeValue9: 0,
  activeValue10: 0,
  activeValue11: 0,
  activeValue12: 0,
  activeValue13: 0,

  csvData: [],
  jsonObj: {},

  mainDataObject: [],
  multiplierArray: [],

  numQsorts: 0,
  numStatements: 0,

  oldQsortPattern: [],

  projectName: 'My_Q_Project',
  qSortPattern: [],
  qSortPatternObject: {},

  respondentNames: [],

  statements: [],
  statementNumArray: [],

  sortsDisplayText: []
});

export default coreState;
