import { store } from "react-easy-state";

const loadingState = store({
  autoflagButtonColor: "#d6dbe0",
  autoFlagHistory: [],

  bipolarDisabled: false,
  bipolarIndexArray: [],
  bipolarSplitCount: 0,

  currentLoadingsTable: [],

  factorToInvert: 0,
  factorToSplit: 0,

  gridColDefsLoadingsTable: [],
  gridRowDataLoadingsTable: [],

  highlighting: "grays",

  isLoadingFactorsKept: false,
  isLoadingAutoflag: false,
  isLoadingsTableInitialRender: true,

  notifyDataSentToOutputSuccess: false,

  respondentNamesMaxLength: 20,
  requireMajorityCommonVariance: true,

  sendDataToOutputButtonColor: "#d6dbe0",
  showInvertFactorModal: false,
  showLoadingsTable: false,
  showSplitFactorModal: false,

  userSelectedSigLevel: 1.96
});

export default loadingState;
