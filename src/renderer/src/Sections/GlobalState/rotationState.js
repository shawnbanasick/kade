import { store } from '@risingstack/react-easy-state';

const rotationState = store({
  abFactors: [],
  archiveCounter: 0,
  calculateRotationsArray: [],
  colMaxWidth: 0,
  d3RotChartData: [],
  fSigCriterion: [],
  fSigCriterionResults: [],

  factor1Active: false,
  factor2Active: false,
  factor3Active: false,
  factor4Active: false,
  factor5Active: false,
  factor6Active: false,
  factor7Active: false,
  factor8Active: false,

  highlightRotfactor1: false,
  highlightRotfactor2: false,
  highlightRotfactor3: false,
  highlightRotfactor4: false,
  highlightRotfactor5: false,
  highlightRotfactor6: false,
  highlightRotfactor7: false,
  highlightRotfactor8: false,

  highlightDegreeButton1: false,
  highlightDegreeButton2: false,
  highlightDegreeButton3: false,
  highlightDegreeButton4: true,
  highlightDegreeButton5: false,
  highlightDegreeInputButton: false,

  isFacSelectDisabled: false,
  isCalculatingVarimax: false,

  judgeButtonActive: false,

  newRotationVectors: [],
  notifyForSavedRotation: false,
  numFactorsKeptForRot: undefined,

  participantDataObject: false,

  rotateByDegrees: 10,
  rowH2: [],
  rotColDefsFactorTable: [],
  rotRowDataFactorTable: [],
  rotationActiveTabIndex: 0,
  rotationDegrees: 0,

  shouldDisplayFacKept: false,
  showRotFactorSelectWarning: false,
  showKeepFacForRotButton: false,
  shouldShowJudgeRotDiv: false,
  showScatterPlotTableDiv: false,
  showVarimaxHeywoodWarning: false,

  tempRotFacStateArray: [],

  userSelectedRotFactors: [],

  varimaxButtonDisabled: false,
  varimaxButtonText: 'Varimax Rotation',
  varimaxButtonActive: true,

  variContinueButtonActive: false,
  variContinueButtonDisabled: false,
  variAdjustButtonActive: false,
  variAdjustButtonDisabled: false,
  variPqmAdjustButtonActive: false,
  variPqmAdjustButtonDisabled: false
});

export default rotationState;
