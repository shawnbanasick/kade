import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import * as numeric from "numeric-1.2.6.min";
import sortEigenValues from "./sortEigenValues";
import calcEigenVectors from "./calcEigenVectors";
import determineNumberPCs from "./determineNumberPCs";
import transposeMatrix from "../../Utils/transposeMatrix";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import calcEigenCumulPercentArray from "./calcEigenCumulPercentArray";
import inflectPrincipalComponents from "./inflectPrincipalComponents";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";

const pcaDispatch = () => {
  let projectHistoryArray = store.getState("projectHistoryArray");

  let X = store.getState("correlation5Calcs");
  let m = X.length;
  let numberOfSorts = m;
  let numberofPrincipalComps = determineNumberPCs();

  let eigens = numeric.eig(X);

  let sigma = numeric.div(numeric.dot(numeric.transpose(X), X), m);
  let svd = numeric.svd(sigma).U;

  let eigenValuesSorted = sortEigenValues(eigens.lambda.x);
  let getEigenCumulPercentArray = calcEigenCumulPercentArray(
    eigenValuesSorted,
    m
  );

  let eigenValuesAsPercents = getEigenCumulPercentArray[0];
  let eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

  let doEigenVecsCalcs = calcEigenVectors(
    numberOfSorts,
    numberofPrincipalComps,
    eigenValuesSorted,
    svd
  );

  let eigenVecs = doEigenVecsCalcs[0];
  let inflectionArray = doEigenVecsCalcs[1];
  eigenVecs = inflectPrincipalComponents(eigenVecs, inflectionArray);

  calculateCommunalities([...eigenVecs]);

  // transpose
  let eigenVecsTransposed = transposeMatrix(eigenVecs);

  // truncate arrays
  eigenValuesSorted.length = 8;
  eigenValuesAsPercents.length = 8;
  eigenValuesCumulPercentArray.length = 8;

  // formatted for output file
  let formattedEigenCum = cloneDeep(eigenValuesCumulPercentArray);
  formattedEigenCum.unshift("Cumulative % Expln Var");
  let formattedEigenPer = cloneDeep(eigenValuesAsPercents);
  formattedEigenPer.unshift("% Explained Variance");

  // create data for scree plot
  let eigenData = cloneDeep(eigenValuesSorted);
  let screeData = [];
  eigenData.forEach(function(element, index) {
    let tempArray = [];
    tempArray.push(index + 1, eigenData[index]);
    screeData.push(tempArray);
  }, this);

  projectHistoryArray.push("Extracted 8 Principal Components");

  store.setState({
    factorMatrix: eigenVecsTransposed,
    unrotatedFactorMatrix: eigenVecsTransposed,
    eigenvalues: eigenValuesSorted,
    screePlotData: screeData,
    eigensPercentExpVar: formattedEigenPer,
    cumulEigenPerVar: formattedEigenCum,
    projectHistoryArray: projectHistoryArray,
    numFacsForTableWidth: 8
  });

  let eigenvaluesArray = [
    eigenValuesSorted,
    eigenValuesAsPercents,
    eigenValuesCumulPercentArray
  ];
  // draw extracted factors table
  factorTableDataPrep(numberofPrincipalComps, eigenVecsTransposed);

  // draw eigenvalues sub table
  factorTableEigenDataPrep(numberofPrincipalComps, eigenvaluesArray);

  store.setState({
    showUnrotatedFactorTable: true,
    showEigenvaluesTable: true,
    showScreePlot: true,
    pcaButtonText: "Principal Components",
    calculatingPca: false
  });

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(eigenVecsTransposed));
};

export default pcaDispatch;
