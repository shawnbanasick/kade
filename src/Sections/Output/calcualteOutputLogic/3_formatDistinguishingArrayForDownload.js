const formatDistingArrayForDownload = function(
    distingStatementsTransferArray01,
    distingStatementsTransferArray05,
    factorNumber,
    analysisOutput,
    sigFactorNumbersArray
) {
    let chartText1 = "Distinguishing Statements for ";
    let chartText2 = "(P < .05 : Asterisk (*) Indicates Significance at P < .01)";
    let chartText3 = "Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown";
    let chartText4 = "Significance";
    let chartText5 = "Statement";
    // let chartText6 = "Num";
    let chartText7 = "Statement Number";
    let chartText8 = "Z-score";

    let outputLength = analysisOutput.length;
    let disting05Length = distingStatementsTransferArray05.length;
    let disting01Length = distingStatementsTransferArray01.length;

    let printArray = [];
    let printArray2 = [];
    let spacer = ["", ""];

    let distinguishingSheetArray = [];

    // line 1
    let factorNumber2 = factorNumber.charAt(0).toUpperCase() + factorNumber.slice(1);
    let number = factorNumber2.substring(factorNumber2.length - 1);
    let factorNumber3 = factorNumber2.slice(0, -1);
    factorNumber = factorNumber3 + " " + number;
    let line1Array = [chartText1 + factorNumber];
    distinguishingSheetArray.push(spacer, line1Array);

    // line 2
    distinguishingSheetArray.push(spacer, [chartText2]);

    // line 3
    distinguishingSheetArray.push(spacer, [chartText3], spacer, spacer);

    // line 4 - headers
    let line4Array = [chartText7, chartText5, chartText7];

    // push headers
    let emptyLineObj = {};
    emptyLineObj["No."] = " ";
    emptyLineObj["Statement "] = " ";
    emptyLineObj["Num "] = " ";

    for (let i = 0; i < outputLength; i++) {
        emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";
    }

    printArray.push(emptyLineObj);
    let printHeaderObj1 = {};
    printHeaderObj1["No."] = chartText1 + factorNumber;
    printArray.push(printHeaderObj1);
    printArray.push(emptyLineObj);
    let printHeaderObj2 = {};
    printHeaderObj2["No."] = chartText2;
    printArray.push(printHeaderObj2);
    printArray.push(emptyLineObj);
    let printHeaderObj3 = {};
    printHeaderObj3["No."] = chartText3;
    printArray.push(printHeaderObj3);
    printArray.push(emptyLineObj);
    printArray.push(emptyLineObj);
    let printHeaderObj4 = {};
    printHeaderObj4["No."] = chartText7;
    printHeaderObj4["Statement "] = chartText5;
    printHeaderObj4["Num "] = chartText7;

    for (let j = 0; j < outputLength; j++) {
        printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
        printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " " + chartText8;
        printHeaderObj4["SIG" + sigFactorNumbersArray[j]] = chartText4;

        line4Array.push(
            sigFactorNumbersArray[j] + " Q-SV",
            sigFactorNumbersArray[j] + " " + chartText8,
            chartText4
        );
    }
    printArray.push(printHeaderObj4);
    distinguishingSheetArray.push(line4Array);

    let tempObj,
        tempObj2,
        kShift,
        pShift;

    // line 5
    let distinguishingSheetArray2 = [];

    // push 05 statements
    for (let k = 0; k < disting05Length; k++) {
        let line5Array = [];
        tempObj = {};
        kShift = distingStatementsTransferArray05[k];

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
        tempObj["No."] = kShift;
        line5Array.push(kShift);

        tempObj["Statement "] = analysisOutput[0][kShift - 1].sortStatement;
        line5Array.push(analysisOutput[0][kShift - 1].sortStatement, kShift);

        tempObj["Num "] = kShift;
        for (let m = 0; m < outputLength; m++) {
            tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][kShift - 1].sortValue;
            tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][kShift - 1].zScore;
            tempObj["SIG" + sigFactorNumbersArray[m]] = "";
            line5Array.push(
                analysisOutput[m][kShift - 1].sortValue,
                analysisOutput[m][kShift - 1].zScore,
                ""
            );
        }
        printArray2.push(tempObj);
        distinguishingSheetArray2.push(line5Array);
    }

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
    for (let p = 0; p < disting01Length; p++) {
        let line6Array = [];
        tempObj2 = {};
        pShift = distingStatementsTransferArray01[p];

        tempObj2["No."] = pShift;
        tempObj2["Statement "] = analysisOutput[0][pShift - 1].sortStatement;
        tempObj2["Num "] = pShift;

        line6Array.push(
            pShift,
            analysisOutput[0][pShift - 1].sortStatement,
            pShift
        );

        for (let q = 0; q < outputLength; q++) {
            tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][pShift - 1].sortValue;
            tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][pShift - 1].zScore;

            line6Array.push(
                analysisOutput[q][pShift - 1].sortValue,
                analysisOutput[q][pShift - 1].zScore
            );

            if (q === formatDistingArrayForDownload.calledTimes) {
                tempObj2["SIG" + sigFactorNumbersArray[q]] = "*";
                line6Array.push("*");
            } else {
                tempObj2["SIG" + sigFactorNumbersArray[q]] = "";
                line6Array.push("");
            }
        }
        printArray2.push(tempObj2);
        distinguishingSheetArray2.push(line6Array);
    }

    let lookupValue = sigFactorNumbersArray[formatDistingArrayForDownload.calledTimes];

    let sortFactorValue = "Z-SCR-" + lookupValue;

    // sort desc
    let printArray3 = printArray2.sort(function(a, b) {
        return b[sortFactorValue] - a[sortFactorValue];
    });

    for (let r = 0; r < printArray3.length; r++) {
        printArray.push(printArray3[r]);
    }

    let lookupValue2 = formatDistingArrayForDownload.calledTimes;

    let modifiedIndexValue = [4, 7, 10, 13, 16, 19, 22, 25];

    let indexer = modifiedIndexValue[lookupValue2];

    distinguishingSheetArray2.sort(function(a, b) {
        if (a[indexer] === b[indexer]) {
            return 0;
        } else {
            return b[indexer] < a[indexer] ? -1 : 1;
        }
    });

    let finalSheetArray = distinguishingSheetArray.concat(
        distinguishingSheetArray2
    );

    formatDistingArrayForDownload.calledTimes++;

    return [printArray, finalSheetArray];
};

export default formatDistingArrayForDownload;
