import evenRound from '../../../../Utils/evenRound';
import sumArrayValues from "./sumArrayValues";

const calcCoeffLValue = (coeffPValue, DR, matrixSum) => {
  const DRSum = sumArrayValues(DR);
  const numerator = evenRound(coeffPValue - DRSum, 4);
  const coeffLValue = evenRound(numerator / matrixSum, 4);
  return coeffLValue;
};

export default calcCoeffLValue;
