import data from "../plot/data";
import store from "../../../store";
import doD3ChartDataPrep from "./doD3ChartDataPrep";
import clockwiseRotation from "./clockwiseRotation";
import counterClockwiseRotation from "./counterClockwiseRotation";
import rotationTablePrep from "../rotationTable/rotationTablePrep";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";

const calculateRotatedFactors = function(
    direction,
    rotateByDegrees,
    baselineData
) {

    let abFactors = store.getState("abFactors");
    let rotationFactorA = Math.min(...abFactors) - 1;
    let rotationFactorB = Math.max(...abFactors) - 1;
    //let calculateRotationsArray = store.getState("calculateRotationsArray");
    let tempRotFacStateArray = store.getState("tempRotFacStateArray");

    // select the factors to rotate
    let calculateRotationsArray = [];
    for (let i = 0; i < tempRotFacStateArray.length; i++) {
        //let tempArray = [];
        let tempA = tempRotFacStateArray[i][rotationFactorA];
        let tempB = tempRotFacStateArray[i][rotationFactorB];
        calculateRotationsArray.push([tempA, tempB]);
    }

    let looplen = calculateRotationsArray.length;
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

    //insert rotated factors into temp rotational state array
    for (let i = 0; i < looplen; i++) {
        tempRotFacStateArray[i][rotationFactorA] = rotatedFactors[i][0];
        tempRotFacStateArray[i][rotationFactorB] = rotatedFactors[i][1];
    }

    
    // re-calc sig levels with rotated factors now included
    // expects bare full array - required to calc significance level for circles
    let arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray);

    // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
     calculatefSigCriterionValues("flag");

    // returns dataValuesArray for D3 chart
    let d3Prep = doD3ChartDataPrep(arrayWithCommunalities);
    store.setState({
        d3RotChartData: d3Prep
    }); // drawD3Chart(d3Prep);

    rotationTablePrep(d3Prep, baselineData);

    store.setState({
        calculateRotationsArray: rotatedFactors,
        tempRotFacStateArray: tempRotFacStateArray
    });

    // call to update D3 plot data
    data();
};

export default calculateRotatedFactors;
