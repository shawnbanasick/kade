import rotationState from "../GlobalState/rotationState";

const initializeRotationState = () => {
  rotationState.abFactors = [];
  rotationState.archiveCounter = 0;
  rotationState.calculateRotationsArray = [];
  rotationState.colMaxWidth = 0;
  rotationState.d3RotChartData = [];
  rotationState.fSigCriterion = [];
  rotationState.fSigCriterionResults = [];

  rotationState.factor1Active = false;
  rotationState.factor2Active = false;
  rotationState.factor3Active = false;
  rotationState.factor4Active = false;
  rotationState.factor5Active = false;
  rotationState.factor6Active = false;
  rotationState.factor7Active = false;
  rotationState.factor8Active = false;

  rotationState.highlightRotfactor1 = false;
  rotationState.highlightRotfactor2 = false;
  rotationState.highlightRotfactor3 = false;
  rotationState.highlightRotfactor4 = false;
  rotationState.highlightRotfactor5 = false;
  rotationState.highlightRotfactor6 = false;
  rotationState.highlightRotfactor7 = false;
  rotationState.highlightRotfactor8 = false;

  rotationState.highlightDegreeButton1 = false;
  rotationState.highlightDegreeButton2 = false;
  rotationState.highlightDegreeButton3 = false;
  rotationState.highlightDegreeButton4 = true;
  rotationState.highlightDegreeButton5 = false;
  rotationState.highlightDegreeInputButton = false;

  rotationState.isFacSelectDisabled = false;
  rotationState.isCalculatingVarimax = false;

  rotationState.judgeButtonActive = false;

  rotationState.newRotationVectors = [];
  rotationState.notifyForSavedRotation = false;
  rotationState.numFactorsKeptForRot = undefined;

  rotationState.participantDataObject = false;

  rotationState.rotateByDegrees = 10;
  rotationState.rowH2 = [];
  rotationState.rotColDefsFactorTable = [];
  rotationState.rotRowDataFactorTable = [];
  rotationState.rotationActiveTabIndex = 0;
  rotationState.rotationDegrees = 0;

  rotationState.shouldDisplayFacKept = false;
  rotationState.showRotFactorSelectWarning = false;
  rotationState.showKeepFacForRotButton = false;
  rotationState.shouldShowJudgeRotDiv = false;
  rotationState.showScatterPlotTableDiv = false;
  rotationState.showVarimaxHeywoodWarning = false;

  rotationState.tempRotFacStateArray = [];

  rotationState.userSelectedRotFactors = [];

  rotationState.varimaxButtonDisabled = false;
  rotationState.varimaxButtonText = "Varimax Rotation";
  rotationState.varimaxButtonActive = true;

  // clear stored factor matrix archives
  sessionStorage.clear();

  return;
};

export default initializeRotationState;
