import tuckerMain from "./tuckerMain";
import correlationState from "../../../GlobalState/correlationState";
import projectHistoryState from "../../../GlobalState/projectHistoryState";
import factorState from "../../../GlobalState/factorState";
import calcCumulativeVar from "../horst55Logic/calcCumulativeVar";
import formatScreePlotData from "../horst55Logic/formatScreePlotData";
import factorTableDataPrep from "../../FactorTable/factorTableDataPrep";
import factorTableEigenDataPrepExtended from "../../FactorTable/factorTableDataPrepExtended";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calculateCommunalities from "../../../Rotation/varimaxLogic/2calculateCommunalities";
import rotationState from "../../../GlobalState/rotationState";
import coreState from "../../../GlobalState/coreState";
import i18n from "i18next";

const clone = require("rfdc")();

const tuckerDispatcher = () => {
  // getState - pull in settings and data
  const dataArray = clone(correlationState.correlation5Calcs);
  const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
  const numCentroidFactors = factorState.numCentroidFactors;

  // const numState = coreState.numStatements;
  const numQsorts = coreState.numQsorts;

  const tuckerCalculations2 = tuckerMain(
    numCentroidFactors,
    dataArray,
    numQsorts
  );

  const tuckerCalculations = clone(tuckerCalculations2);
  const formattedScreePlotData = formatScreePlotData(
    tuckerCalculations.explainVarandEigens[0]
  );
  const cumulativeVar = calcCumulativeVar(
    tuckerCalculations.explainVarandEigens[1]
  );
  const explainedVar = clone(tuckerCalculations.explainVarandEigens[1]);
  const cumulativeVarWithText1 = clone(cumulativeVar);
  const eigenvalues = clone(tuckerCalculations.eigenvalues);
  const fMatrix = tuckerCalculations.fMatrix;
  const percentEigenVal = [[...explainedVar], [...cumulativeVarWithText1]];

  // get data for factor table and write to state
  const respondentNames = clone(coreState.respondentNames);
  const participantTrans = i18n.t("Participant");
  const factorTrans = i18n.t("Factor");
  const nmTrans = i18n.t("Nm");
  const translationsText = { participantTrans, factorTrans, nmTrans };
  console.log(JSON.stringify(fMatrix));
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

  // paint eigenvalues sub table
  factorTableEigenDataPrepExtended(
    numCentroidFactors,
    [tuckerCalculations.explainVarandEigens[0], ...percentEigenVal],
    [...tuckerCalculations.lArray],
    [...tuckerCalculations.largestCorrelationArray],
    [...tuckerCalculations.largestLoadingArray]
  );

  // after eigen table data prep to prevent double labelling
  let eigenText = i18n.t("Eigenvalues");
  const eigenvaluesWithText = [eigenText, ...eigenvalues];

  const rotFacStateArray1 = clone(fMatrix);
  const rotFacStateArray = transposeMatrix(rotFacStateArray1);

  // in case autoflag of unrotated factor matrix in loadings table
  // expects display style matrix (factor cols), not factor rows
  calculateCommunalities(rotFacStateArray);

  const explainedVarText = i18n.t("Explained Variance");
  const explainedVarWithText = [explainedVarText, ...explainedVar];

  const cumuVarText = i18n.t("Cumulative Explained Variance");
  const cumulativeVarWithText = [cumuVarText, ...cumulativeVarWithText1];

  const projectLogText2 = i18n.t(
    "Tucker and MacCallum Centroid Factors Extracted"
  );
  const projectLogText1 = `${projectLogText2} ${numCentroidFactors}`;

  const logMessageObj1 = {
    logMessage: projectLogText1,
    logType: "tucker"
  };

  const newProjectHistoryArray = [...projectHistoryArray, logMessageObj1];

  factorState.numFacsForTableWidth = numCentroidFactors;
  factorState.factorMatrix = tuckerCalculations.fMatrix; // pulled for first display on loadings table
  factorState.eigenvalues = eigenvaluesWithText;
  factorState.explainedVariance = explainedVar;
  factorState.unrotatedFactorMatrix = tuckerCalculations.fMatrix;
  factorState.eigensPercentExpVar = explainedVarWithText;
  factorState.cumulEigenPerVar = cumulativeVarWithText;
  factorState.screePlotData = formattedScreePlotData;
  factorState.isCentroidLoading = false;
  projectHistoryState.projectHistoryArray = newProjectHistoryArray;
  rotationState.showKeepFacForRotButton = true;

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default tuckerDispatcher;
