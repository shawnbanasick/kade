import horstMain from "./horstMain";
import correlationState from "../../../GlobalState/correlationState";
import projectHistoryState from "../../../GlobalState/projectHistoryState";
import factorState from "../../../GlobalState/factorState";
// import rotationState from "../../../GlobalState/rotationState";
import coreState from "../../../GlobalState/coreState";
import calcCumulativeVar from "./calcCumulativeVar";
import formatScreePlotData from "./formatScreePlotData";
import factorTableDataPrep from "../../FactorTable/factorTableDataPrep";
import factorTableEigenDataPrep from "../../FactorTableEigen/FactorTableEigenDataPrep";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calculateCommunalities from "../../../Rotation/varimaxLogic/2calculateCommunalities";
import doHeywoodCheck from "./doHeywoodCheck";
import calcEigenValues from "./calcEigenValues";
import i18n from "i18next";

const clone = require("rfdc")();

const horstDispatcher = shouldUseHorstLimit => {
  // getState - pull in settings and data
  const respondentNames = clone(coreState.respondentNames);
  const dataArray = clone(correlationState.correlation5Calcs);
  const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
  let numCentroidFactors = factorState.numCentroidFactors;

  // ************************************
  // CALC HORST MAIN --- [var names (mostly) follow Horst 5.5 for ease of porting]
  // ************************************
  const STPCRT = shouldUseHorstLimit;
  const numState = coreState.numStatements;
  const NL = factorState.horstIterations;
  const P = factorState.horstThresholdLevel;

  const horstCalculations2 = horstMain(
    numCentroidFactors,
    STPCRT,
    dataArray,
    numState,
    NL,
    P
  );

  // DO NOT DELETE - Horst auto-extract resets the number of factors
  // so we need to set STATE with the new value
  numCentroidFactors = factorState.numCentroidFactors;

  const horstCalculations = clone(horstCalculations2);

  const fMatrix = horstCalculations.fMatrix;
  const numQsorts = fMatrix[0].length;

  // ************************************
  // CALC COMMUNALITIES
  // ************************************
  const rotFacStateArray1 = clone(fMatrix);
  const rotFacStateArray = transposeMatrix(rotFacStateArray1);
  // in case autoflag of unrotated factor matrix in loadings table
  // expects display style matrix (factor cols), not factor rows
  const communalityArray = calculateCommunalities(rotFacStateArray);

  // ************************************
  // DO HEYWOOD CHECK
  // ************************************
  let hasHeywoodCase = false;
  doHeywoodCheck(communalityArray, respondentNames, hasHeywoodCase);

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
  factorState.didNotConverge = horstCalculations2.didNotConverge;
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
  const horstMessage = i18n.t("No convergence");
  const iterationsTrans = i18n.t("iterations");
  const showHorstMessage = factorState.didNotConverge;
  const horstIterations = factorState.horstIterations;

  let projectLogText1;
  if (showHorstMessage) {
    projectLogText1 = `${projectLogText2}: ${numCentroidFactors} -- ${horstMessage}: ${horstIterations} ${iterationsTrans}`;
  } else {
    projectLogText1 = `${projectLogText2}: ${numCentroidFactors}`;
  }

  const logMessageObj1 = {
    logMessage: projectLogText1,
    logType: "horst"
  };

  const newProjectHistoryArray = [...projectHistoryArray, logMessageObj1];

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

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default horstDispatcher;
