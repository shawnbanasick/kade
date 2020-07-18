import data from "../plot/data";
import doD3ChartDataPrep from "./doD3ChartDataPrep";
import clockwiseRotation from "./clockwiseRotation";
import counterClockwiseRotation from "./counterClockwiseRotation";
import rotationTablePrep from "../rotationTable/rotationTablePrep";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import rotationState from "../../../GlobalState/rotationState";
const clone = require("rfdc")();

const calculateRotatedFactors = (direction, rotateByDegrees, baselineData) => {
  // getState
  const abFactors = clone(rotationState.abFactors);
  const rotationFactorA = Math.min(...abFactors) - 1;
  const rotationFactorB = Math.max(...abFactors) - 1;
  // let calculateRotationsArray = state.getState("calculateRotationsArray");
  const tempRotFacStateArray = clone(rotationState.tempRotFacStateArray);

  // select the factors to rotate
  const calculateRotationsArray = [];
  for (let i = 0; i < tempRotFacStateArray.length; i += 1) {
    // let tempArray = [];
    const tempA = tempRotFacStateArray[i][rotationFactorA];
    const tempB = tempRotFacStateArray[i][rotationFactorB];
    calculateRotationsArray.push([tempA, tempB]);
  }

  const looplen = calculateRotationsArray.length;
  let rotatedFactors;

  if (direction === "clockwise") {
    rotatedFactors = clockwiseRotation(
      calculateRotationsArray,
      rotateByDegrees
    );
  }

  if (direction === "counterClockwise") {
    rotatedFactors = counterClockwiseRotation(
      calculateRotationsArray,
      rotateByDegrees
    );
  }

  // insert rotated factors into temp rotational state array
  for (let i = 0; i < looplen; i += 1) {
    tempRotFacStateArray[i][rotationFactorA] = rotatedFactors[i][0];
    tempRotFacStateArray[i][rotationFactorB] = rotatedFactors[i][1];
  }

  // re-calc sig levels with rotated factors now included
  // expects bare full array - required to calc significance level for circles
  const arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray);

  // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
  calculatefSigCriterionValues("flag");

  // returns dataValuesArray for D3 chart
  const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);
  rotationState.d3RotChartData = d3Prep;

  rotationTablePrep(d3Prep, baselineData);

  rotationState.calculateRotationsArray = rotatedFactors;
  rotationState.tempRotFacStateArray = tempRotFacStateArray;

  // call to update D3 plot data
  data();
};

export default calculateRotatedFactors;
