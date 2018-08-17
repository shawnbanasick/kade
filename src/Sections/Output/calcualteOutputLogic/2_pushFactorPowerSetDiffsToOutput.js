import store from "../../store";
import evenRound from "../../Utils/evenRound";

const pushFactorPowerSetDiffsToOutput = function(
    sheetNames,
    output,
    analysisOutput,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    let chartText1 = "Diff ";
    let chartText2 = "Difference";
    let chartText3 = "Statement Number";
    let chartText4 = "Statement";
    let chartText5 = "Descending Array of Differences Between";
    let chartText6 = "and";
    let oneFactor,
        anotherFactor;
    let maxStatementLength = store.getState("maxStatementLength");
    let spacer = ["", ""];

    let factorPairs = [];
    for (let i = 0; i < analysisOutput.length - 1; i++) {
        for (let j = i; j < analysisOutput.length - 1; j++) {
            factorPairs.push([analysisOutput[i], analysisOutput[j + 1]]);
        }
    }
    // let diffArraySorted;
    let namesComboArray = [];
    let sheetHeader1Array = [];

    for (let k = 0; k < factorPairs.length; k++) {
        let namesComboArrayFrag = [];
        let sheetHeader1 = [chartText3, chartText4];

        oneFactor = factorPairs[k][0][0].factor;
        let factorNumber2 = oneFactor.charAt(0).toUpperCase() + oneFactor.slice(1);
        let number = factorNumber2.substring(factorNumber2.length - 1);
        let factorNumber3 = factorNumber2.slice(0, -1);
        oneFactor = factorNumber3 + " " + number;

        anotherFactor = factorPairs[k][1][0].factor;
        let factorNumber12 = anotherFactor.charAt(0).toUpperCase() + anotherFactor.slice(1);
        let number2 = factorNumber12.substring(factorNumber12.length - 1);
        let factorNumber13 = factorNumber12.slice(0, -1);
        anotherFactor = factorNumber13 + " " + number2;

        namesComboArrayFrag.push(oneFactor, anotherFactor);
        let temp1 = {};
        temp1.sheetid = chartText1 + oneFactor + " " + anotherFactor;
        temp1.header = true;
        sheetNames.push(temp1);
        namesComboArray.push(namesComboArrayFrag);
        sheetNamesXlsx.push(chartText1 + oneFactor + " " + anotherFactor);

        sheetHeader1.push(oneFactor, anotherFactor, chartText2);
        sheetHeader1Array.push(sheetHeader1);

        let columns = [
            {
                wch: 8
            },
            {
                wch: maxStatementLength
            },
            {
                wch: 8
            },
            {
                wch: 8
            },
            {
                wch: 10
            }
        ];
        colSizes.push(columns);
    }

    // push each pair to output
    for (let m = 0; m < factorPairs.length; m++) {
        // let diffArray = [];
        let diffArrayXlsx = [];
        for (let p = 0; p < factorPairs[m][0].length; p++) {
            let tempArray = [];

            let temp1a = factorPairs[m][0][p].statement;
            let temp1b = factorPairs[m][0][p].sortStatement;
            let temp1c = factorPairs[m][0][p].zScore;
            let temp1d = factorPairs[m][1][p].zScore;
            let factorsDiff = evenRound(
                factorPairs[m][0][p].zScore - factorPairs[m][1][p].zScore,
                3
            );
            tempArray.push(temp1a, temp1b, temp1c, temp1d, factorsDiff);
            diffArrayXlsx.push(tempArray);
        }

        diffArrayXlsx.sort(function(a, b) {
            if (a[4] === b[4]) {
                return 0;
            } else {
                return b[4] < a[4] ? -1 : 1;
            }
        });
        diffArrayXlsx.unshift(
            spacer,
            [
                chartText5 +
                " " +
                namesComboArray[m][0] +
                " " +
                chartText6 +
                " " +
                namesComboArray[m][1]
            ],
            spacer,
            sheetHeader1Array[m]
        );
        outputData.push(diffArrayXlsx);
    }
    return [
        sheetNames,
        output,
        analysisOutput,
        outputData,
        sheetNamesXlsx,
        colSizes
    ];
};

export default pushFactorPowerSetDiffsToOutput;
