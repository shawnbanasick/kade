import { store } from "react-easy-state";

const coreState = store({
  csvData: [],
  jsonObj: {},

  mainDataObject: [],
  multiplierArray: [],

  numQsorts: 0,
  numStatements: 0,

  oldQsortPattern: [],

  projectName: "",
  qSortPattern: [],
  qSortPatternObject: {},

  respondentNames: [],

  statements: [],
  statementNumArray: [],

  sortsDisplayText: []
});

export default coreState;

