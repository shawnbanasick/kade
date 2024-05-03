import calcEigenValues from "./calcEigenValues";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateFactorLoadings from "./calculateFactorLoadings";
import calcScreePlotData from "../centroidLogic/calcScreePlotData";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import calcEigenCumulPercentArray from "../PcaLogic/calcEigenCumulPercentArray";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";

import projectHistoryState from "../../GlobalState/projectHistoryState";
import getProjectHistoryState from "../../GlobalState/getProjectHistoryState";
import getCorrelationState from "../../GlobalState/getCorrelationState";
import factorState from "../../GlobalState/factorState";
import getFactorState from "../../GlobalState/getFactorState";
import getCoreState from "../../GlobalState/getCoreState";

import doHeywoodCheck from "../centroidLogic/horst55Logic/doHeywoodCheck";
import i18n from "i18next";
const clone = require("rfdc")();

// todo - make the centroid dropdown list dynamic in case only few sorts - not
// enough for all 7 factors

const centroidDispatch = numFactors => {
  // ************************************
  // GET STATE
  // ************************************
  let dataArray = getCorrelationState("correlation5Calcs");
  let projectHistoryArray = getProjectHistoryState("projectHistoryArray");
  let numCentroidFactors = getFactorState("numCentroidFactors");
  const numQsorts = getCoreState("numQsorts");
  const respondentNames = getCoreState("respondentNames");

  // ************************************
  // CALC LOADINGS
  // ************************************
  let factorMatrix = [];
  for (var i = 0; i < numFactors; i++) {
    let tempArray = calculateFactorLoadings(dataArray);
    factorMatrix.push(tempArray[0]);
    dataArray = tempArray[1];
  }
  let factorMatrix1 = clone(factorMatrix);

  // ************************************
  // CALC COMMUNALITIES
  // ************************************

  // display style matrix
  let rotFacStateArray1 = clone(factorMatrix);

  // calc style matrix
  let rotFacStateArray = transposeMatrix(rotFacStateArray1);

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
  let explainVarandEigens = calcEigenValues(factorMatrix1, numQsorts);

  // ************************************
  // FACTOR TABLE DATA PREP
  // ************************************
  const participantTrans = i18n.t("Participant");
  const factorTrans = i18n.t("Factor");
  const nmTrans = i18n.t("Nm");
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numFactors,
    factorMatrix1,
    respondentNames,
    translationsText
  );
  factorState.gridColDefsFactorTable = factorTableData.gridColDefsFactorTable;
  factorState.gridRowDataFactorTable = factorTableData.gridRowDataFactorTable;
  factorState.unrotatedFactorMatrixOutput =
    factorTableData.unrotatedFactorArray;

  // ************************************
  // EIGEN TABLE DATA PREP
  // ************************************
  let percentEigenVal = calcEigenCumulPercentArray(
    explainVarandEigens[0],
    numQsorts
  );

  // draw eigenvalues sub table
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
    numFactors,
    [explainVarandEigens[0], ...percentEigenVal],
    eigensTranslations
  );

  factorState.gridColDefsFacTableEigen =
    factorTableEigenData.gridColDefsFacTableEigen;
  factorState.gridRowDataFacTableEigen =
    factorTableEigenData.gridRowDataFacTableEigen;

  // ************************************
  // SCREE PLOT DATA PREP
  // ************************************

  // set data for scree chart
  let screePlotData = calcScreePlotData(explainVarandEigens[0]);

  // ************************************
  // DO PROJECT LOG UPDATE
  // ************************************
  const logMessageObj = {
    logMessage: `${i18n.t(
      "Brown Centroid Factors Extracted"
    )}: ${numCentroidFactors}`,
    logType: "centroid"
  };

  projectHistoryArray.push(logMessageObj);

  const eigenvaluesArray = explainVarandEigens[0];
  eigenvaluesArray.unshift(i18n.t("Eigenvalues"));

  // ************************************
  // UPDATE STATE
  // ************************************
  factorState.factorMatrix = rotFacStateArray1; // pulled for first display on loadings table
  factorState.eigenvalues = eigenvaluesArray;
  factorState.explainedVariance = explainVarandEigens[1];
  factorState.unrotatedFactorMatrix = factorMatrix;
  factorState.eigensPercentExpVar = percentEigenVal[0];
  factorState.cumulEigenPerVar = percentEigenVal[1];
  factorState.screePlotData = screePlotData;
  factorState.isCentroidLoading = false;
  projectHistoryState.projectHistoryArray = projectHistoryArray;

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default centroidDispatch;
