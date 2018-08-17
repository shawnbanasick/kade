import store from "../../store";
import evenRound from "../../Utils/evenRound";

const pushStandardErrorsDifferencesToOutput = function(
    sheetNames,
    output,
    stndErrorArray,
    analysisOutput,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    var chartText1 = "Standard Errors for Diffs";
    var chartText2 = "Standard Errors for Differences in Factor Z-scores";
    var sigSortsArray = store.getState("sigSortsArray");
    var userSelectedFactors = store.getState("userSelectedFactors");
    var spacer = ["", ""];

    sheetNamesXlsx.push(chartText1);

    // set factor sheet col widths
    var columns = [
        {
            wch: 8
        }
    ];
    for (var tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
        columns.push({
            wch: 8
        });
    }
    colSizes.push(columns);

    var standardErrorDiffSheetArray = [];

    // line 1
    var line1Array = [""];
    var line1Arrayb = line1Array.concat(userSelectedFactors);
    standardErrorDiffSheetArray.push(line1Arrayb);

    // var stndErrorDiffArray = [];
    var stndErrorDiffDataArray = [];
    var stndErrorDiffDataDistingArray = [];

    var stndError1,
        stndError2,
        stndError3;

    // lines 2 to end
    for (var j = 0; j < sigSortsArray.length; j++) {
        var tempArray1 = [];
        tempArray1.push(sigSortsArray[j]["Factor Number"]);

        for (var k = 0; k < sigSortsArray.length; k++) {
            var stndErrorDiffDataArrayTemp1 = [];
            var tempArray2 = [];
            stndErrorDiffDataArrayTemp1.push(
                "Factor " + sigSortsArray[j]["Factor Number"]
            );
            tempArray2.push(sigSortsArray[j]["Factor Number"]);
            stndErrorDiffDataArrayTemp1.push(
                "Factor " + sigSortsArray[k]["Factor Number"]
            );
            tempArray2.push(sigSortsArray[k]["Factor Number"]);
            stndError1 = stndErrorArray[j];
            stndError2 = stndErrorArray[k];
            stndError3 = evenRound(
                Math.sqrt(stndError1 * stndError1 + stndError2 * stndError2),
                3
            );
            stndErrorDiffDataArrayTemp1.push(stndError3);
            tempArray2.push(stndError3);
            tempArray1.push(stndError3);
            stndErrorDiffDataArray.push(stndErrorDiffDataArrayTemp1);
            stndErrorDiffDataDistingArray.push(tempArray2);
        }
        standardErrorDiffSheetArray.push(tempArray1);
    }
    standardErrorDiffSheetArray.unshift(spacer, [chartText2], spacer);
    outputData.push(standardErrorDiffSheetArray);

    store.setState({standardErrorDiffSheetArray: standardErrorDiffSheetArray});

    return [
        sheetNames,
        output,
        sigSortsArray,
        analysisOutput,
        stndErrorDiffDataArray,
        stndErrorDiffDataDistingArray,
        sigFactorNumbersArray,
        outputData,
        sheetNamesXlsx,
        colSizes
    ];
};

export default pushStandardErrorsDifferencesToOutput;
