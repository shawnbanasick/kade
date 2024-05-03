import evenRound from "../../../Utils/evenRound";
import i18n from "i18next";
import calcState from "../../GlobalState/calcState";
import getCalcState from "../../GlobalState/getCalcState";
import getOutputState from "../../GlobalState/getOutputState";
const clone = require("rfdc")();

function customSortHelper(array, placeSetter) {
  array.sort((a, b) => {
    if (a[placeSetter] === b[placeSetter]) {
      return 0;
    }
    return b[placeSetter] < a[placeSetter] ? -1 : 1;
  });
}

const pushFactorScoreComparisonRanksTableToOutput = function(
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // getState
  const synFactorArray1 = getCalcState("synFactorArray1Holder");
  const userSelectedFactors = getOutputState("userSelectedFactors");
  let tempArray1;
  let rankValue;
  let rankingTempArray;
  const statementRankingArray = [];

  // get sheetname - MS Excel has max 30 char. for tabs, so if long - shorten
  let sheetName1 = i18n.t("Factor Score Ranks");
  if (sheetName1.length > 30) {
    sheetName1 = i18n.t("Factor Score Ranks short");
  }

  // set sheetname
  sheetNamesXlsx.push(sheetName1);

  // set column width for Excel
  const maxStatementLength = getCalcState("maxStatementLength");
  const columns = [
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
  for (let ss = 0, ssLen = userSelectedFactors.length * 2; ss < ssLen; ss++) {
    columns.push({
      wch: 7
    });
  }
  colSizes.push(columns);

  // add factor ranks and round at 2 digits
  // reduce decimal places, sort by Z-score, assign Z-score rank value, sort by statement number
  for (let j = 0, jLen = synFactorArray1.length; j < jLen; j++) {
    for (let jj = 0, jjLen = synFactorArray1[j].length; jj < jjLen; jj++) {
      synFactorArray1[j][jj]["Z-score"] = evenRound(
        synFactorArray1[j][jj]["Z-score"],
        2
      );
    }
    synFactorArray1[j].sort((a, b) => {
      if (b["Z-score"] === a["Z-score"]) {
        return a["Statement Number"] - b["Statement Number"];
      }
      return b["Z-score"] - a["Z-score"];
    });

    for (let i = 0, iLen = synFactorArray1[j].length; i < iLen; i++) {
      rankValue = i + 1;
      synFactorArray1[j][i].Rank = rankValue;
    }

    synFactorArray1[j].sort(
      (a, b) => a["Statement Number"] - b["Statement Number"]
    );
  }

  // get Array from state
  const compositeFactorMasterArray = clone(
    calcState.compositeFactorMasterArray
  );
  const factorScoreRanksArray = [];

  // sort by statement number and push num and statement and num into ranks array
  compositeFactorMasterArray[0].sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    }
    return a[0] < b[0] ? -1 : 1;
  });
  for (
    let ww = 0, wwLen = compositeFactorMasterArray[0].length;
    ww < wwLen;
    ww++
  ) {
    const tempArraymm1 = [];
    tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
    tempArraymm1.push(compositeFactorMasterArray[0][ww][1]);
    tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
    factorScoreRanksArray.push(tempArraymm1);
  }

  // cycle through user selected factors to get zScore and rank
  for (
    let kk = 0, kkLen = compositeFactorMasterArray.length;
    kk < kkLen;
    kk++
  ) {
    // sort by statement number
    compositeFactorMasterArray[kk].sort((a, b) => {
      if (a[0] === b[0]) {
        return 0;
      }
      return a[0] < b[0] ? -1 : 1;
    });
    // insert zScore
    for (
      let ii = 0, iiLen = compositeFactorMasterArray[kk].length;
      ii < iiLen;
      ii++
    ) {
      const tempZscore = evenRound(compositeFactorMasterArray[kk][ii][2], 2);
      factorScoreRanksArray[ii].push(tempZscore);
    }

    // sorting by Z-score
    const placeSetter = 2;
    customSortHelper(compositeFactorMasterArray[kk], placeSetter);

    for (
      let rr = 0, rrLen = compositeFactorMasterArray[kk].length;
      rr < rrLen;
      rr++
    ) {
      const RankValue2 = rr + 1;
      compositeFactorMasterArray[kk][rr].push(RankValue2);
    }

    // re-sort to statement number
    compositeFactorMasterArray[kk].sort((a, b) => {
      if (a[0] === b[0]) {
        return 0;
      }
      return a[0] < b[0] ? -1 : 1;
    });

    // get and push ranking numbers
    for (
      let pp = 0, ppLen = compositeFactorMasterArray[kk].length;
      pp < ppLen;
      pp++
    ) {
      const RankValue3 = compositeFactorMasterArray[kk][pp].pop();
      factorScoreRanksArray[pp].push(RankValue3);
    }
    // placeSetter = placeSetter + 2;
  }

  const spacer = ["", ""];
  const tempArrayHeader = [
    "",
    i18n.t("Factor Scores with Corresponding Ranks")
  ];
  const tempArrayHeader2 = [
    i18n.t("Statement Number"),
    i18n.t("Statement"),
    i18n.t("Statement Number")
  ];
  const tempSubHeader = ["", "", ""];
  for (let yy = 0, yyLen = userSelectedFactors.length; yy < yyLen; yy++) {
    // get user selcted factor number
    const factorNum = userSelectedFactors[yy].slice(7);
    // tempArrayHeader2.push(userSelectedFactors[yy], userSelectedFactors[yy]);
    const factorName = `${i18n.t("Factor")} ${factorNum}`;
    tempArrayHeader2.push(factorName, factorName);
    tempSubHeader.push(i18n.t("Z-score"), i18n.t("Rank"));
  }

  factorScoreRanksArray.unshift(
    ["ranks", ""],
    spacer,
    tempArrayHeader,
    spacer,
    tempArrayHeader2,
    tempSubHeader
  );
  outputData.push(factorScoreRanksArray);

  calcState.factorScoreRanksArray = factorScoreRanksArray;

  // setup the array of ranked statements
  const factorScoreComparisonArray = [];
  for (let k = 0, kLen = synFactorArray1[0].length; k < kLen; k++) {
    rankingTempArray = [];
    tempArray1 = {};
    tempArray1.Num1 = synFactorArray1[0][k]["Statement Number"];
    tempArray1.Statement = synFactorArray1[0][k].Statement;
    tempArray1.Num2 = synFactorArray1[0][k]["Statement Number"];
    tempArray1.Zscore1 = synFactorArray1[0][k]["Z-score"];
    const rank1 = synFactorArray1[0][k].Rank;
    tempArray1.Rank1 = rank1;
    const tempSortValue = synFactorArray1[0][k]["Sort Values"];
    rankingTempArray.push(tempSortValue);
    for (let m = 1, mLen = synFactorArray1.length; m < mLen; m++) {
      const mm = m + 1;
      tempArray1[`Zscore${mm}`] = synFactorArray1[m][k]["Z score"];
      tempArray1[`Rank${mm}`] = synFactorArray1[m][k].Rank;
      const tempSortValue2 = synFactorArray1[m][k]["Sort Values"];
      rankingTempArray.push(tempSortValue2);
    }
    factorScoreComparisonArray.push(tempArray1);
    statementRankingArray.push(rankingTempArray);
  }

  calcState.statementRankingArray = statementRankingArray;

  console.log("dispatch - 10 - pushFactorScoreComparisonRanksTable complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushFactorScoreComparisonRanksTableToOutput;
