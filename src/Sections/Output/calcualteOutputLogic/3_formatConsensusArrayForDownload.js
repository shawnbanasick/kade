const formatConsensusArrayForDownload = function(
    consensus05,
    consensus01,
    analysisOutput,
    sigFactorNumbersArray
) {
    let chartText1 = "Consensus Statements";
    let chartText2 = "Those That Do Not Distinguish Between ANY Pair of Factors";
    let chartText3 = "All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)";
    let chartText4 = "Significance";
    let chartText5 = "Statement";
    // let chartText6 = "Num";
    let chartText7 = "Statement Number";
    let chartText8 = "Z-score";
    let spacer = ["", ""];
    let outputLength = analysisOutput.length;
    let consensus05Length = consensus05.length;
    let consensus01Length = consensus01.length;

    let printArray = [];
    let printArray2 = [];
    let consensusSheetArray = [];
    let consensusSheetArray2 = [];

    // push headers
    let emptyLineObj = {};
    emptyLineObj["No."] = " ";
    emptyLineObj["SIG "] = " ";
    emptyLineObj["Statement "] = " ";
    emptyLineObj["Num "] = " ";

    for (let i = 0; i < outputLength; i++) {
        emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
        emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";
    }

    consensusSheetArray.push(
        spacer,
        [chartText1 + " -- " + chartText2],
        spacer,
        [chartText3],
        spacer,
        spacer
    );

    let line3Array = [];
    printArray.push(emptyLineObj);
    let printHeaderObj1 = {};
    printHeaderObj1["No."] = chartText1 + " -- " + chartText2;
    printArray.push(printHeaderObj1);
    printArray.push(emptyLineObj);
    let printHeaderObj2 = {};
    printHeaderObj2["No."] = chartText3;
    printArray.push(printHeaderObj2);
    printArray.push(emptyLineObj);
    printArray.push(emptyLineObj);
    let printHeaderObj4 = {};
    printHeaderObj4["No."] = chartText7;
    printHeaderObj4["SIG "] = chartText4;
    printHeaderObj4["Statement "] = chartText5;
    printHeaderObj4["Num "] = chartText7;

    line3Array.push(chartText7, chartText4, chartText5, chartText7);

    for (let j = 0; j < outputLength; j++) {
        printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
        printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " " + chartText8;
        line3Array.push(
            sigFactorNumbersArray[j] + " Q-SV",
            sigFactorNumbersArray[j] + " " + chartText8
        );
    }
    printArray.push(printHeaderObj4);
    consensusSheetArray.push(line3Array);

    let tempObj,
        tempObj2,
        kShift,
        pShift;

    // push 05 statements
    for (let k = 0; k < consensus05Length; k++) {
        tempObj = {};
        let tempArray = [];
        kShift = consensus05[k];

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
        tempObj["No."] = kShift;
        // ["No."] = kShift;
        tempObj["SIG "] = "*";
        tempObj["Statement "] = analysisOutput[0][kShift - 1].sortStatement;
        tempObj["Num "] = kShift;

        tempArray.push(
            kShift,
            "*",
            analysisOutput[0][kShift - 1].sortStatement,
            kShift
        );

        for (let m = 0; m < outputLength; m++) {
            tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][kShift - 1].sortValue;
            tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][kShift - 1].zScore;
            tempArray.push(
                analysisOutput[m][kShift - 1].sortValue,
                analysisOutput[m][kShift - 1].zScore
            );
        }
        printArray2.push(tempObj);
        consensusSheetArray2.push(tempArray);
    }

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
    for (let p = 0; p < consensus01Length; p++) {
        let tempArray2 = [];
        tempObj2 = {};
        pShift = consensus01[p];

        tempObj2["No."] = pShift;
        tempObj2["SIG "] = "";
        tempObj2["Statement "] = analysisOutput[0][pShift - 1].sortStatement;
        tempObj2["Num "] = pShift;

        tempArray2.push(
            pShift,
            "",
            analysisOutput[0][pShift - 1].sortStatement,
            pShift
        );

        for (let q = 0; q < outputLength; q++) {
            tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][pShift - 1].sortValue;
            tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][pShift - 1].zScore;
            tempArray2.push(
                analysisOutput[q][pShift - 1].sortValue,
                analysisOutput[q][pShift - 1].zScore
            );
        }
        printArray2.push(tempObj2);
        consensusSheetArray2.push(tempArray2);
    }

    let printArray3 = printArray2.sort(function(a, b) {
        return a["No."] - b["No."];
    });

    consensusSheetArray2.sort(function(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return a[0] < b[0] ? -1 : 1;
        }
    });

    let finalArray = consensusSheetArray.concat(consensusSheetArray2);

    for (let r = 0; r < printArray3.length; r++) {
        printArray.push(printArray3[r]);
    }
    return [printArray, finalArray];
};

export default formatConsensusArrayForDownload;
