import undoReflection from "./undoReflection";
import calculateFactor from "./calculateFactor";
import removeCorrelations from "./removeCorrelations";
import checkPositiveManifold from "./checkPositiveManifold";

const calculateFactorLoadings = dataArray => {
  const reflectedArray = checkPositiveManifold(dataArray);
  const reflectedArray1 = reflectedArray[0];
  const reflectedArrayColumnTotals = reflectedArray[1];
  const reflectedRowCol = reflectedArray[2];
  const factorLoads1 = calculateFactor(
    reflectedArray1,
    reflectedArrayColumnTotals
  );
  const subtractArray = removeCorrelations(reflectedArray1, factorLoads1);
  const undoPositiveManifold = undoReflection(
    subtractArray,
    factorLoads1,
    reflectedRowCol
  );
  const factorSubtractedArray = undoPositiveManifold[0];
  const factorFactorScores = undoPositiveManifold[1];
  const results = [factorFactorScores, factorSubtractedArray];

  return results;
};

export default calculateFactorLoadings;
