import checkPositiveManifold from "./checkPositiveManifold";
import calculateFactor from "./calculateFactor";
import removeCorrelations from "./removeCorrelations";
import undoReflection from "./undoReflection";

const calculateFactorLoadings = dataArray => {
    var reflectedArray = checkPositiveManifold(dataArray);
    var reflectedArray1 = reflectedArray[0]; // reflected array
    var reflectedArrayColumnTotals = reflectedArray[1]; // column totals
    var reflectedRowCol = reflectedArray[2];
    var factorLoads1 = calculateFactor(
        reflectedArray1,
        reflectedArrayColumnTotals
    );
    var subtractArray = removeCorrelations(reflectedArray1, factorLoads1);
    var undoPositiveManifold = undoReflection(
        // 1
        subtractArray,
        factorLoads1,
        reflectedRowCol
    );
    var factorSubtractedArray = undoPositiveManifold[0];
    var factorFactorScores = undoPositiveManifold[1];
    var results = [factorFactorScores, factorSubtractedArray];

    return results;
};

export default calculateFactorLoadings;
