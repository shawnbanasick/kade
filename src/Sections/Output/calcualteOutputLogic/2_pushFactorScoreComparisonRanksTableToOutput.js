import store from "../../store";
import evenRound from "../../Utils/evenRound";
// import default from './2_pushCumComMatrixToOutputArray';

const pushFactorScoreComparisonRanksTableToOutput = function(
    sheetNames,
    output,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    var synFactorArray1 = store.getState("synFactorArray1Holder");
    var userSelectedFactors = store.getState("userSelectedFactors");
    var tempArray1,
        rankValue,
        rankingTempArray;
    var statementRankingArray = [];

    // set sheetnam
    sheetNamesXlsx.push("Factor Score Ranks");

    // set column width for Excel
    var maxStatementLength = store.getState("maxStatementLength");
    var columns = [
        {
            wch: 8
        },
        {
            wch: maxStatementLength
        },
        {
            wch: 8
        }
    ];
    for (var ss = 0, ssLen = userSelectedFactors.length * 2; ss < ssLen; ss++) {
        columns.push({
            wch: 7
        });
    }
    colSizes.push(columns);

    // add factor ranks and round at 2 digits
    for (var j = 0, jLen = synFactorArray1.length; j < jLen; j++) {
        for (var jj = 0, jjLen = synFactorArray1[j].length; jj < jjLen; jj++) {
            synFactorArray1[j][jj]["Z-score"] = evenRound(
                synFactorArray1[j][jj]["Z-score"],
                2
            );
        }
        synFactorArray1[j].sort(function(a, b) {
            if (b["Z-score"] === a["Z-score"]) {
                return a["Statement Number"] - b["Statement Number"];
            } else {
                return b["Z-score"] - a["Z-score"];
            }
        });

        for (var i = 0, iLen = synFactorArray1[j].length; i < iLen; i++) {
            rankValue = i + 1;
            synFactorArray1[j][i].Rank = rankValue;
        }

        synFactorArray1[j].sort(function(a, b) {
            return a["Statement Number"] - b["Statement Number"];
        });
    }

    // re-sort for use below?
    // synFactorArray1[0]
    //     .sort(function(a, b) {
    //         return a["Statement Number"] - b["Statement Number"];
    //     });

    var compositeFactorMasterArray = store.getState("compositeFactorMasterArray");
    var factorScoreRanksArray = [];

    // sort by statement number and push num and statement and num into ranks array
    compositeFactorMasterArray[0].sort(function(a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return a[0] < b[0] ? -1 : 1;
        }
    });
    for (
        var ww = 0, wwLen = compositeFactorMasterArray[0].length;
        ww < wwLen;
        ww++
    ) {
        var tempArraymm1 = [];
        tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
        tempArraymm1.push(compositeFactorMasterArray[0][ww][1]);
        tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
        factorScoreRanksArray.push(tempArraymm1);
    }

    // cycle through user selected factors to get zScore and rank
    for (
        var kk = 0, kkLen = compositeFactorMasterArray.length;
        kk < kkLen;
        kk++
    ) {
        // sort by statement number
        compositeFactorMasterArray[kk].sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return a[0] < b[0] ? -1 : 1;
            }
        });
        // insert zScore
        for (
            var ii = 0, iiLen = compositeFactorMasterArray[kk].length;
            ii < iiLen;
            ii++
        ) {
            var tempZscore = evenRound(compositeFactorMasterArray[kk][ii][2], 2);
            factorScoreRanksArray[ii].push(tempZscore);
        }
        // re-sort by latest pushed zScore
        // var placeSetter = factorScoreRanksArray[0].length - 1;

        var placeSetter = 2;
        customSortHelper(compositeFactorMasterArray[kk], placeSetter);

        // compositeFactorMasterArray[kk].sort(function(a, b) {
        //     if (a[placeSetter] === b[placeSetter]) {
        //         return 0;
        //     } else {
        //         return b[placeSetter] < a[placeSetter] ? -1 : 1;
        //     }
        // });

        for (
            var rr = 0, rrLen = compositeFactorMasterArray[kk].length;
            rr < rrLen;
            rr++
        ) {
            var RankValue2 = rr + 1;
            compositeFactorMasterArray[kk][rr].push(RankValue2);
        }

        // re-sort to statement number
        compositeFactorMasterArray[kk].sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return a[0] < b[0] ? -1 : 1;
            }
        });

        // get and push ranking numbers
        for (
            var pp = 0, ppLen = compositeFactorMasterArray[kk].length;
            pp < ppLen;
            pp++
        ) {
            var RankValue3 = compositeFactorMasterArray[kk][pp].pop();
            factorScoreRanksArray[pp].push(RankValue3);
        }
    // placeSetter = placeSetter + 2;
    }

    var spacer = ["", ""];
    var tempArrayHeader = ["", "Factor Scores with Corresponding Ranks"];
    var tempArrayHeader2 = ["Statement Number", "Statement", "Statement Number"];
    var tempSubHeader = ["", "", ""];
    for (var yy = 0, yyLen = userSelectedFactors.length; yy < yyLen; yy++) {
        tempArrayHeader2.push(userSelectedFactors[yy], userSelectedFactors[yy]);
        tempSubHeader.push("Z-score", "Rank");
    }

    factorScoreRanksArray.unshift(
        spacer,
        tempArrayHeader,
        spacer,
        tempArrayHeader2,
        tempSubHeader
    );
    outputData.push(factorScoreRanksArray);

    // setup the array of ranked statements
    var factorScoreComparisonArray = [];
    for (var k = 0, kLen = synFactorArray1[0].length; k < kLen; k++) {
        rankingTempArray = [];
        tempArray1 = {};
        tempArray1.Num1 = synFactorArray1[0][k]["Statement Number"];
        tempArray1.Statement = synFactorArray1[0][k]["Statement"];
        tempArray1.Num2 = synFactorArray1[0][k]["Statement Number"];
        tempArray1.Zscore1 = synFactorArray1[0][k]["Z-score"];
        var rank1 = synFactorArray1[0][k]["Rank"];
        tempArray1.Rank1 = rank1;
        var tempSortValue = synFactorArray1[0][k]["Sort Values"];
        rankingTempArray.push(tempSortValue);
        for (var m = 1, mLen = synFactorArray1.length; m < mLen; m++) {
            var mm = m + 1;
            tempArray1["Zscore" + mm] = synFactorArray1[m][k]["Z-score"];
            tempArray1["Rank" + mm] = synFactorArray1[m][k]["Rank"];
            var tempSortValue2 = synFactorArray1[m][k]["Sort Values"];
            rankingTempArray.push(tempSortValue2);
        }
        factorScoreComparisonArray.push(tempArray1);
        statementRankingArray.push(rankingTempArray);
    }

    store.setState({
        statementRankingArray: statementRankingArray
    });

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

function customSortHelper(array, placeSetter) {
    array.sort(function(a, b) {
        if (a[placeSetter] === b[placeSetter]) {
            return 0;
        } else {
            return b[placeSetter] < a[placeSetter] ? -1 : 1;
        }
    });
}

export default pushFactorScoreComparisonRanksTableToOutput;
