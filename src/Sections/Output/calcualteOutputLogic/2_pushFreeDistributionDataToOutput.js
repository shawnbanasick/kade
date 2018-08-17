import store from "../../store";

const pushFreeDistributionDataToOutput = function(
    sheetNames,
    output,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    sheetNamesXlsx.push("Free Dist");

    var columns = [
        {
            wch: 10
        },
        {
            wch: 20
        },
        {
            wch: 10
        },
        {
            wch: 10
        }
    ];
    colSizes.push(columns);

    var freeDistributionArray = store.getState("freeDistributionArray");

    freeDistributionArray.unshift(
        ["", ""],
        ["Free Distribution Data Results"],
        ["", ""]
    );

    // freeDistributionArray = freeDistributionArray.slice(3);
    // var freeDistributionData = [];
    // var cutLength = freeDistributionArray[0].length - 3;
    // for (var i = 0, iLen = freeDistributionArray.length; i < iLen; i++) {
    //     var tempCut = freeDistributionArray[i].splice(1, cutLength);
    //     freeDistributionData.push(freeDistributionArray[i]);
    // }
    // freeDistributionData.unshift(["", ""], ["Free Distribution Data Results"], ["", ""]);
    outputData.push(freeDistributionArray);

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushFreeDistributionDataToOutput;
