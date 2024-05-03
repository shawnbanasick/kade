import convertArrayToABS from "./convertArrayToABS";
import evenRound from '../../../../Utils/evenRound';

const acculmulate = (value, acc) => acc + value;

const calculateDR = matrix => {
  const matrixAbsSumArray = [];
  const absValsArray = matrix.map(row => {
    const absArray = convertArrayToABS(row);
    const maxValue = Math.max(...absArray);
    let arraySum = evenRound(absArray.reduce(acculmulate, 0.0), 5);
    matrixAbsSumArray.push(arraySum);
    return maxValue;
  });
  const matrixSum = evenRound(matrixAbsSumArray.reduce(acculmulate, 0.0), 5);
  return { absValsArray, matrixSum };
};

export default calculateDR;
