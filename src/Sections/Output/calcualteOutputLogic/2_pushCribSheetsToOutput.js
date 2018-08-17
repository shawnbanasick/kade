import store from "../../store";
import {
  countBy,
  cloneDeep,
  clone,
  flatten,
  identity,
  flattenDeep
} from "lodash";
import checkIfDistinguishingOrConsensus from "./3_checkIfDistinguishingOrConsensus";

const pushCribSheetsToOutput = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  let appendText1 = " Rel. Ranks";
  let appendText2 = "Relative Ranking of Statements in ";
  let appendText3 = "Statement Number";
  let appendText5 = "Z-score";
  let appendText9 = "Distinguishing";
  let appendText8 = "Consensus";
  let appendTextHeader1 = "Highest Ranked Statements";
  let appendTextHeader2a = "Positive Statements Ranked Higher in ";
  let appendTextHeader2b = " Array than in Other Factor Arrays";
  let appendTextHeader3a = "Negative Statements Ranked Lower in ";
  let appendTextHeader3b = " Array than in Other Factor Arrays";
  let appendTextHeader4 = "Lowest Ranked Statements";
  // let maxStatementLength = store.getState("maxStatementLength");
  let appendText6 = "Statement";
  let appendText7 = "Sort Values";
  // let appendText8 = resources[language].translation["Note: "];

  let statementRankingArray = store.getState("statementRankingArray");
  let userSelectedFactors = store.getState("userSelectedFactors");
  let factorInformation,
    lowestRankStatements,
    cribArray = [];
  let cribArray2 = [];
  let highestRankStatements;
  let maxRankValue, minRankValue, compositeSortValue;

  // determine the number of statements in the extreme columns
  let sortTriangleShape = store.getState("qSortPattern");
  let synFactorArray1Holder = store.getState("synFactorArray1Holder");

  let arrayMax = +Math.max(...sortTriangleShape);
  let arrayMin = +Math.min(...sortTriangleShape);
  let triangleCounts = countBy(sortTriangleShape, identity);

  let maxCounts = triangleCounts[arrayMax];
  let minCounts = triangleCounts[arrayMin];

  // loop through factors
  for (let j = 0, jLen = userSelectedFactors.length; j < jLen; j++) {
    sheetNamesXlsx.push(userSelectedFactors[j] + appendText1);

    let columns = [
      {
        wch: 8
      },
      {
        wch: 80
      },
      {
        wch: 8
      },
      {
        wch: 12
      }
    ];
    colSizes.push(columns);

    cribArray = [[], [], [], []];

    cribArray2 = [[], [], [], []];

    factorInformation = cloneDeep(synFactorArray1Holder[j]);

    // sort by statement number
    factorInformation.sort(function(a, b) {
      return a[appendText3] - b[appendText3];
    });

    // append the ranking arrays
    for (let k = 0, kLen = factorInformation.length; k < kLen; k++) {
      factorInformation[k].rankArray = statementRankingArray[k];
    }

    // resort back to high to low z-score sort
    factorInformation.sort(function(a, b) {
      if (b[appendText5] === a[appendText5]) {
        return a[appendText3] - b[appendText3];
      } else {
        return b[appendText5] - a[appendText5];
      }
    });

    // push highest to cribArray
    for (let m = 0; m < minCounts; m++) {
      // tempObj1 = {};
      highestRankStatements = factorInformation.shift();
      let stateNum0 = highestRankStatements[appendText3];
      let statement0 = highestRankStatements[appendText6];
      let checkIfDisOrCon0 = checkIfDistinguishingOrConsensus(stateNum0, j);
      let compositeSortValue0 = highestRankStatements[appendText7];
      let otherValues = clone(highestRankStatements.rankArray);
      otherValues.splice(j, 1);
      let array0 = [
        stateNum0,
        statement0,
        compositeSortValue0,
        checkIfDisOrCon0
      ];
      let array0a = array0.concat(otherValues);
      cribArray2[0].push(array0a);
    }

    // push lowest to cribArray
    for (let p = 0; p < maxCounts; p++) {
      // tempObj2 = {};
      lowestRankStatements = factorInformation.pop();
      let stateNum3 = lowestRankStatements[appendText3];
      let statement3 = lowestRankStatements[appendText6];
      let checkIfDisOrCon3 = checkIfDistinguishingOrConsensus(stateNum3, j);
      let compositeSortValue3 = lowestRankStatements[appendText7];
      let otherValues3 = clone(lowestRankStatements.rankArray);
      otherValues3.splice(j, 1);
      let array3 = [
        stateNum3,
        statement3,
        compositeSortValue3,
        checkIfDisOrCon3
      ];
      let array3a = array3.concat(otherValues3);

      cribArray2[3].unshift(array3a);
    }

    // look for higher relative statements and push to cribArray
    for (let r = 0, rLen = factorInformation.length; r < rLen; r++) {
      compositeSortValue = factorInformation[r][appendText7];
      if (compositeSortValue > -1) {
        maxRankValue = Math.max(...factorInformation[r].rankArray);
        if (compositeSortValue === maxRankValue) {
          let otherValues2 = clone(factorInformation[r].rankArray);
          otherValues2.splice(j, 1);
          let stateNum = factorInformation[r][appendText3];
          let checkIfDisOrCon = checkIfDistinguishingOrConsensus(stateNum, j);
          let tempArray22 = [
            stateNum,
            factorInformation[r][appendText6],
            compositeSortValue,
            checkIfDisOrCon
          ];
          let combinedArray1 = tempArray22.concat(otherValues2);
          cribArray2[1].push(combinedArray1);
        }
      }
      if (compositeSortValue < 1) {
        minRankValue = Math.min(...factorInformation[r].rankArray);
        // let currentRank2 = factorInformation[r].rankArray[j];
        if (compositeSortValue === minRankValue) {
          let otherValuesLower = clone(factorInformation[r].rankArray);
          otherValuesLower.splice(j, 1);
          let stateNum2 = factorInformation[r][appendText3];
          let checkIfDisOrCon2 = checkIfDistinguishingOrConsensus(stateNum2, j);
          let tempArray33 = [
            stateNum2,
            factorInformation[r][appendText6],
            compositeSortValue,
            checkIfDisOrCon2
          ];
          let combinedArray2 = tempArray33.concat(otherValuesLower);
          cribArray2[2].push(combinedArray2);
        }
      }
    }

    let spacerArray = ["", ""];

    // construct headers for statement groups
    let facName = userSelectedFactors[j];

    // create column headers for other factors
    let otherFactorNames = clone(userSelectedFactors);
    otherFactorNames.splice(j, 1);
    let higherRankedHeader = [
      "",
      appendTextHeader2a + facName + appendTextHeader2b
    ];

    let header1 = ["", appendText2 + facName];
    let header0 = ["", appendTextHeader1, facName, appendText9].concat(
      otherFactorNames
    );
    cribArray2[0].unshift(
      spacerArray,
      header1,
      ["", "", "", appendText8],
      header0
    );

    cribArray2[1].unshift(spacerArray, higherRankedHeader);

    let header3 = {};
    header3.stateNum = "";
    header3.statement = appendTextHeader3a + facName + appendTextHeader3b;
    header3.sortValue = "";
    cribArray2[2].unshift(spacerArray, [
      "",
      appendTextHeader3a + facName + appendTextHeader3b,
      ""
    ]);

    let header4 = {};
    header4.stateNum = "";
    header4.statement = appendTextHeader4;
    header4.sortValue = "";
    cribArray2[3].unshift(spacerArray, ["", appendTextHeader4, ""]);

    output.push(flattenDeep(cribArray));
    outputData.push(flatten(cribArray2));
  }
  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushCribSheetsToOutput;
