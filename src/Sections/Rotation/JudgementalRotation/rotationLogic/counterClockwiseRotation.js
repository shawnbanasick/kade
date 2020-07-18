import transposeMatrix from "../../../../Utils/transposeMatrix";
import evenRound from "../../../../Utils/evenRound";
import calcCosDegrees from "./calcCosDegrees";
import calcSinDegrees from "./calcSinDegrees";

import rotationState from "../../../GlobalState/rotationState";

const counterCockwiseRotation = (calculateRotationsArray, rotationByDegree) => {
  const transposedArray = transposeMatrix(calculateRotationsArray);
  const sinDegreesValue = calcSinDegrees(rotationByDegree);
  const cosDegreesValue = calcCosDegrees(rotationByDegree);
  let rotationDegrees = rotationState.rotationDegrees;
  rotationDegrees -= rotationByDegree;
  rotationState.rotationDegrees = rotationDegrees;

  let valueA;
  let valueB;
  const len = transposedArray[0].length;
  let a1Calculations;
  let b1Calculations;
  let a2Calculations;
  let b2Calculations;
  const rotatedFactorsArray = [];

  for (let k = 0; k < len; k += 1) {
    a1Calculations = transposedArray[1][k] * sinDegreesValue;
    b1Calculations = transposedArray[0][k] * cosDegreesValue;
    valueA = evenRound(-(a1Calculations - b1Calculations), 5);
    a2Calculations = transposedArray[0][k] * sinDegreesValue;
    b2Calculations = transposedArray[1][k] * cosDegreesValue;
    valueB = evenRound(a2Calculations + b2Calculations, 5);
    const tempArray = [];
    tempArray[0] = valueA;
    tempArray[1] = valueB;
    rotatedFactorsArray.push(tempArray);
  }
  return rotatedFactorsArray;
};

export default counterCockwiseRotation;
