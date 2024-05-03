import calcCumulativeVar from "./calcCumulativeVar";
import formatScreePlotData from "./formatScreePlotData";
import factorTableDataPrep from "../../FactorTable/factorTableDataPrep";
import factorTableEigenDataPrep from "../../FactorTableEigen/FactorTableEigenDataPrep";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calculateCommunalities from "../../../Rotation/varimaxLogic/2calculateCommunalities";
import calcEigenValues from "./calcEigenValues";
import i18n from "i18next";
import projectHistoryState from "../../../GlobalState/projectHistoryState";
import getProjectHistoryState from "../../../GlobalState/getProjectHistoryState";
import factorState from "../../../GlobalState/factorState";
import getFactorState from "../../../GlobalState/getFactorState";
import rotationState from "../../../GlobalState/rotationState";
import getCoreState from "../../../GlobalState/getCoreState";

const clone = require("rfdc")();

const doHeywoodAdjustment = () => {
  // getState - pull in settings and data
  let fMatrix = getFactorState("heywoodAdjustedMatrix");
  // undo heywood check transpose
  fMatrix = transposeMatrix(fMatrix);
  const respondentNames = getCoreState("respondentNames");
  const projectHistoryArray = getProjectHistoryState("projectHistoryArray");
  let numCentroidFactors = getFactorState("numCentroidFactors");

  const numQsorts = fMatrix[0].length;

  // ************************************
  // CALC COMMUNALITIES
  // ************************************
  const rotFacStateArray1 = clone(fMatrix);
  const rotFacStateArray = transposeMatrix(rotFacStateArray1);
  // in case autoflag of unrotated factor matrix in loadings table
  calculateCommunalities(rotFacStateArray);
  // expects display style matrix (factor cols), not factor rows

  // ************************************
  // CALC EIGENS
  // ************************************

  const explainVarandEigens = calcEigenValues(fMatrix, numQsorts);

  const cumulativeVar = calcCumulativeVar(explainVarandEigens[1]);
  const explainedVar = clone(explainVarandEigens[1]);
  const cumulativeVarWithText1 = clone(cumulativeVar);
  const eigenvalues = clone(explainVarandEigens[0]);
  const percentEigenVal = [[...explainedVar], [...cumulativeVarWithText1]];

  // ************************************
  // PREP SCREE PLOT
  // ************************************

  const formattedScreePlotData = formatScreePlotData(explainVarandEigens[0]);

  // ************************************
  // PREP FACTOR TABLE
  // ************************************
  // get data for factor table
  // getState - coreState, get Translations, do factor table data prep
  const participantTrans = i18n.t("Participant");
  const factorTrans = i18n.t("Factor");
  const nmTrans = i18n.t("Nm");
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numCentroidFactors,
    fMatrix,
    respondentNames,
    translationsText
  );

  factorState.gridColDefsFactorTable = factorTableData.gridColDefsFactorTable;
  factorState.gridRowDataFactorTable = factorTableData.gridRowDataFactorTable;
  factorState.unrotatedFactorMatrixOutput =
    factorTableData.unrotatedFactorArray;

  // ************************************
  // PREP EIGENS TABLE
  // ************************************
  // paint eigenvalues sub table and write results to state
  const eigenValuesTrans = i18n.t("Eigenvalues");
  const explainedVarianceTrans = i18n.t("Explained Variance");
  const cumuExplainedVarianceTrans = i18n.t("Cumulative Explained Variance");
  const factorTrans2 = i18n.t("Factor");
  const eigensTranslations = {
    eigenValuesTrans,
    explainedVarianceTrans,
    cumuExplainedVarianceTrans,
    factorTrans2
  };
  const factorTableEigenData = factorTableEigenDataPrep(
    numCentroidFactors,
    [explainVarandEigens[0], ...percentEigenVal],
    eigensTranslations
  );
  factorState.gridColDefsFacTableEigen =
    factorTableEigenData.gridColDefsFacTableEigen;
  factorState.gridRowDataFacTableEigen =
    factorTableEigenData.gridRowDataFacTableEigen;

  // after eigen table data prep to prevent double labelling
  let eigenText = i18n.t("Eigenvalues");
  const eigenvaluesWithText = [eigenText, ...eigenvalues];

  // ************************************
  // PREP EXPLAINED VARIANCE TABLE
  // ************************************
  const explainedVarText = i18n.t("Explained Variance");
  const explainedVarWithText = [explainedVarText, ...explainedVar];

  const cumuVarText = i18n.t("Cumulative Explained Variance");
  const cumulativeVarWithText = [cumuVarText, ...cumulativeVarWithText1];

  // ************************************
  // UPDATE PROJECT LOG
  // ************************************
  const projectLogText2 = i18n.t("Horst Centroid Factors Extracted");
  const horstMessage = i18n.t("No convergance");
  const iterationsTrans = i18n.t("iterations");

  const showHorstMessage = getFactorState("didNotConverge");
  const horstAutoStopYesActive = getFactorState("horstAutoStopYesActive");
  const horstIterations = getFactorState("horstIterations");

  let projectLogText4;

  const brown = getFactorState("activeTraditionalCentroidFactorButton");
  const horst = getFactorState("activeHorst55CentroidButton");

  if (brown) {
    projectLogText4 = i18n.t("Brown Centroid Factors Extracted");
  }
  if (horst) {
    projectLogText4 = i18n.t("Horst Centroid Factors Extracted");
  }

  const heywoodParticipantsTextJoin = getFactorState(
    "heywoodParticipantsTextJoin"
  );

  // remove previous log entry
  projectHistoryArray.pop();

  let projectLogText1;
  if (showHorstMessage && horstAutoStopYesActive) {
    projectLogText1 = `${projectLogText2}: ${numCentroidFactors} -- ${horstMessage}: ${horstIterations} ${iterationsTrans}`;
  } else {
    projectLogText1 = `${projectLogText4}: ${numCentroidFactors}`;
  }

  const projectLogText3 = `${i18n.t(
    "Heywood Case Participants"
  )}: ${heywoodParticipantsTextJoin}. ${i18n.t(
    "Communalities adjusted to 1"
  )}.`;

  const logMessageObj1 = {
    logMessage: projectLogText1,
    logType: "HeywoodAdjustment"
  };

  const logMessageObj3 = {
    logMessage: projectLogText3,
    logType: "HeywoodAdjustment"
  };

  const newProjectHistoryArray = [
    ...projectHistoryArray,
    logMessageObj1,
    logMessageObj3
  ];

  // ************************************
  // UPDATE STATE
  // ************************************
  factorState.numFacsForTableWidth = numCentroidFactors;
  factorState.factorMatrix = fMatrix; // pulled for first display on loadings table
  factorState.eigenvalues = eigenvaluesWithText;
  factorState.explainedVariance = explainedVar;
  factorState.unrotatedFactorMatrix = fMatrix;
  factorState.eigensPercentExpVar = explainedVarWithText;
  factorState.cumulEigenPerVar = cumulativeVarWithText;
  factorState.screePlotData = formattedScreePlotData;
  factorState.isCentroidLoading = false;
  projectHistoryState.projectHistoryArray = newProjectHistoryArray;
  rotationState.showKeepFacForRotButton = true;

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default doHeywoodAdjustment;
