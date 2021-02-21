import { store } from "react-easy-state";

const appState = store({
  activeWindow: "viewStart",

  changes: [],

  errorMessage: "",
  extendedErrorMessage: "",
  errorStackTrace: "",

  hasUnforcedBeenConfirmed: false,

  isDataButtonGreen: false,
  isInputButtonGreen: false,
  isCorrelationsButtonGreen: false,
  isFactorsButtonGreen: false,
  isLoadingsButtonGreen: false,
  isRotationButtonGreen: false,
  isOutputButtonGreen: false,

  showErrorMessageBar: false,
  showUpdateModal: false,

  updateVersion: "",

  version: "1.2.1",
  viewAttribution: false,
  viewData: false,
  viewClearProject: false,
  viewCorrelations: false,
  viewFactors: false,
  viewHelp: false,
  viewInput: false,
  viewLicense: false,
  viewLoadings: false,
  viewOutput: false,
  viewProjectHistory: false,
  viewRotation: false,
  viewStart: true
});

export default appState;
