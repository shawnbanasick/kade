import store from "../../store";

const insertFactorsIntoOutput = function(
    sheetNames,
    output,
    analysisOutput,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    let appendText1 = "Sorts Weight";
    //let appendText2 = "Sorts Corr";
    let appendText3 = "Statement Number";
    let appendText4 = "Statement";
    let appendText5 = "Z-score";
    // let appendText6 = resources[language].translation["Sort Values"];
    let appendText7 = "Raw Sort";
    let appendText8 = "Sort Values";
    let appendText9 = "Sorts Correlations";
    let appendText10 = "Factor Scores for ";

    let sheetNamesHolder1 = store.getState("sheetNamesHolder1");
    let sheetNamesHolder2 = store.getState("sheetNamesHolder2");
    let sheetNamesHolder3 = store.getState("sheetNamesHolder3");

    let factorWeightFactorArray = store.getState("factorWeightFactorArrayHolder");
    let miniCorrelationArray = store.getState("miniCorrelationArrayHolder");
    let synFactorArray1 = store.getState("synFactorArray1Holder");
    let compositeFactorMasterArray = store.getState("compositeFactorMasterArray");
    let userSelectedFactors = store.getState("userSelectedFactors");
    let sigSortsArray = store.getState("sigSortsArray");
    let maxStatementLength = store.getState("maxStatementLength");
    let spacer = ["", ""];

    for (let ii = 0, iiLen = userSelectedFactors.length; ii < iiLen; ii++) {
        let sheetHeaderArrayPartial = [
            appendText3,
            appendText4,
            appendText5,
            appendText8
        ];

        // set weights name
        sheetNamesXlsx.push(sheetNamesHolder1[ii].sheetid);

        // set weights columns
        let columns = [
            {
                wch: 8
            },
            {
                wch: 8
            }
        ];
        colSizes.push(columns);

        // set weights sheet
        factorWeightFactorArray[ii].unshift(
            spacer,
            [userSelectedFactors[ii], appendText1],
            spacer
        );
        outputData.push(factorWeightFactorArray[ii]);

        // set sorts corr name
        sheetNamesXlsx.push(sheetNamesHolder2[ii].sheetid);

        // set sorts corr cols
        let columns2 = [
            {
                wch: 8
            }
        ];
        for (let ss = 0, ssLen = userSelectedFactors.length; ss < ssLen; ss++) {
            columns2.push({
                wch: 8
            });
        }
        colSizes.push(columns2);

        // set sorts corr sheet
        miniCorrelationArray[ii].unshift(
            spacer,
            [userSelectedFactors[ii], appendText9],
            spacer
        );
        outputData.push(miniCorrelationArray[ii]);

        // set factor sheet name
        sheetNamesXlsx.push(sheetNamesHolder3[ii].sheetid);

        // set factor sheet cols
        let columns3 = [
            {
                wch: 8
            },
            {
                wch: maxStatementLength
            },
            {
                wch: 9
            },
            {
                wch: 12
            }
        ];
        for (
            let tt = 0, ttLen = sigSortsArray[ii].SigSorts.length;
            tt < ttLen;
            tt++
        ) {
            columns3.push({
                wch: 12
            });
        }
        colSizes.push(columns3);

        // set factor sheets
        // re-sort to zScore
        compositeFactorMasterArray[ii].sort(function(a, b) {
            if (a[2] === b[2]) {
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[2] < a[2] ? -1 : 1;
            }
        });

        for (
            let jj = 0, jjLen = sigSortsArray[ii].SigSorts.length;
            jj < jjLen;
            jj++
        ) {
            sheetHeaderArrayPartial.push(
                appendText7 + " " + sigSortsArray[ii].SigSorts[jj]
            );
        }
        compositeFactorMasterArray[ii].unshift(
            spacer,
            ["", appendText10 + " " + userSelectedFactors[ii]],
            spacer,
            sheetHeaderArrayPartial
        );
        outputData.push(compositeFactorMasterArray[ii]);
    } // end big loop

    for (let i = 0, iLen = factorWeightFactorArray.length; i < iLen; i++) {
        sheetNames.push(sheetNamesHolder1[i]);
        sheetNames.push(sheetNamesHolder2[i]);
        sheetNames.push(sheetNamesHolder3[i]);
        output.push(factorWeightFactorArray[i]);
        output.push(miniCorrelationArray[i]);
        output.push(synFactorArray1[i]);
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

export default insertFactorsIntoOutput;
