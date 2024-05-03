import evenRound from '../../../../Utils/evenRound';
import convertArrayToABS from "./convertArrayToABS";
// import grabMaxArrayValue from './grabMaxArrayValue';

const acculmulate = (value, acc) => acc + value;

const calculateCoeffPValue = qPrimeArray => {
  const absQPrimeArray = convertArrayToABS(qPrimeArray);
  const pCoeff = evenRound(absQPrimeArray.reduce(acculmulate, 0.0), 4);
  return pCoeff;
};

export default calculateCoeffPValue;
