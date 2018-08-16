import transposeMatrix from "../../../Utils/transposeMatrix";
import evenRound from "../../../Utils/evenRound";
import calcCosDegrees from "./calcCosDegrees";
import calcSinDegrees from "./calcSinDegrees";
import store from "../../../store";

const counterCockwiseRotation = function(
    calculateRotationsArray,
    rotationByDegree
) {
    let transposedArray = transposeMatrix(calculateRotationsArray);
    let sinDegreesValue = calcSinDegrees(rotationByDegree);
    let cosDegreesValue = calcCosDegrees(rotationByDegree);
    let rotationDegrees = store.getState("rotationDegrees");
    rotationDegrees = rotationDegrees - rotationByDegree;
    store.setState({
        rotationDegrees: rotationDegrees
    });

    let valueA,
        valueB;
    let len = transposedArray[0].length;
    let a1Calculations,
        b1Calculations;
    let a2Calculations,
        b2Calculations;
    let rotatedFactorsArray = [];

    for (let k = 0; k < len; k++) {
        a1Calculations = transposedArray[1][k] * sinDegreesValue;
        b1Calculations = transposedArray[0][k] * cosDegreesValue;
        valueA = evenRound(-(a1Calculations - b1Calculations), 5);
        a2Calculations = transposedArray[0][k] * sinDegreesValue;
        b2Calculations = transposedArray[1][k] * cosDegreesValue;
        valueB = evenRound(a2Calculations + b2Calculations, 5);
        let tempArray = [];
        tempArray[0] = valueA;
        tempArray[1] = valueB;
        rotatedFactorsArray.push(tempArray);
    }
    return rotatedFactorsArray;
};

export default counterCockwiseRotation;
