import store from "../../../store";
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
  const appendText1 = " Rel. Ranks";
  const appendText2 = "Relative Ranking of Statements in ";
  const appendText3 = "Statement Number";
  const appendText5 = "Z-score";
  const appendText9 = "Distinguishing";
  const appendText8 = "Consensus";
  const appendTextHeader1 = "Highest Ranked Statements";
  const appendTextHeader2a = "Positive Statements Ranked Higher in ";
  const appendTextHeader2b = " Array than in Other Factor Arrays";
  const appendTextHeader3a = "Negative Statements Ranked Lower in ";
  const appendTextHeader3b = " Array than in Other Factor Arrays";
  const appendTextHeader4 = "Lowest Ranked Statements";
  // let maxStatementLength = store.getState("maxStatementLength");
  const appendText6 = "Statement";
  const appendText7 = "Sort Values";
  // let appendText8 = resources[language].translation["Note: "];

  const statementRankingArray = store.getState("statementRankingArray");
  const userSelectedFactors = store.getState("userSelectedFactors");
  let factorInformation,
    lowestRankStatements,
    cribArray = [];
  let cribArray2 = [];
  let highestRankStatements;
  let maxRankValue, minRankValue, compositeSortValue;

  // determine the number of statements in the extreme columns
  const sortTriangleShape = store.getState("qSortPattern");
  const synFactorArray1Holder = store.getState("synFactorArray1Holder");

  const arrayMax = +Math.max(...sortTriangleShape);
  const arrayMin = +Math.min(...sortTriangleShape);
  const triangleCounts = countBy(sortTriangleShape, identity);

  const maxCounts = triangleCounts[arrayMax];
  const minCounts = triangleCounts[arrayMin];

  // loop through factors
  for (let j = 0, jLen = userSelectedFactors.length; j < jLen; j++) {
    sheetNamesXlsx.push(userSelectedFactors[j] + appendText1);

    const columns = [
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
    factorInformation.sort((a, b) => a[appendText3] - b[appendText3]);

    // append the ranking arrays
    for (let k = 0, kLen = factorInformation.length; k < kLen; k++) {
      factorInformation[k].rankArray = statementRankingArray[k];
    }

    // resort back to high to low z-score sort
    factorInformation.sort((a, b) => {
      if (b[appendText5] === a[appendText5]) {
        return a[appendText3] - b[appendText3];
      } 
        return b[appendText5] - a[appendText5];
      
    });

    // push highest to cribArray
    for (let m = 0; m < minCounts; m++) {
      // tempObj1 = {};
      highestRankStatements = factorInformation.shift();
      const stateNum0 = highestRankStatements[appendText3];
      const statement0 = highestRankStatements[appendText6];
      const checkIfDisOrCon0 = checkIfDistinguishingOrConsensus(stateNum0, j);
      const compositeSortValue0 = highestRankStatements[appendText7];
      const otherValues = clone(highestRankStatements.rankArray);
      otherValues.splice(j, 1);
      const array0 = [
        stateNum0,
        statement0,
        compositeSortValue0,
        checkIfDisOrCon0
      ];
      const array0a = array0.concat(otherValues);
      cribArray2[0].push(array0a);
    }

    // push lowest to cribArray
    for (let p = 0; p < maxCounts; p++) {
      // tempObj2 = {};
      lowestRankStatements = factorInformation.pop();
      const stateNum3 = lowestRankStatements[appendText3];
      const statement3 = lowestRankStatements[appendText6];
      const checkIfDisOrCon3 = checkIfDistinguishingOrConsensus(stateNum3, j);
      const compositeSortValue3 = lowestRankStatements[appendText7];
      const otherValues3 = clone(lowestRankStatements.rankArray);
      otherValues3.splice(j, 1);
      const array3 = [
        stateNum3,
        statement3,
        compositeSortValue3,
        checkIfDisOrCon3
      ];
      const array3a = array3.concat(otherValues3);

      cribArray2[3].unshift(array3a);
    }

    // look for higher relative statements and push to cribArray
    for (let r = 0, rLen = factorInformation.length; r < rLen; r++) {
      compositeSortValue = factorInformation[r][appendText7];
      if (compositeSortValue > -1) {
        maxRankValue = Math.max(...factorInformation[r].rankArray);
        if (compositeSortValue === maxRankValue) {
          const otherValues2 = clone(factorInformation[r].rankArray);
          otherValues2.splice(j, 1);
          const stateNum = factorInformation[r][appendText3];
          const checkIfDisOrCon = checkIfDistinguishingOrConsensus(stateNum, j);
          const tempArray22 = [
            stateNum,
            factorInformation[r][appendText6],
            compositeSortValue,
            checkIfDisOrCon
          ];
          const combinedArray1 = tempArray22.concat(otherValues2);
          cribArray2[1].push(combinedArray1);
        }
      }
      if (compositeSortValue < 1) {
        minRankValue = Math.min(...factorInformation[r].rankArray);
        // let currentRank2 = factorInformation[r].rankArray[j];
        if (compositeSortValue === minRankValue) {
          const otherValuesLower = clone(factorInformation[r].rankArray);
          otherValuesLower.splice(j, 1);
          const stateNum2 = factorInformation[r][appendText3];
          const checkIfDisOrCon2 = checkIfDistinguishingOrConsensus(stateNum2, j);
          const tempArray33 = [
            stateNum2,
            factorInformation[r][appendText6],
            compositeSortValue,
            checkIfDisOrCon2
          ];
          const combinedArray2 = tempArray33.concat(otherValuesLower);
          cribArray2[2].push(combinedArray2);
        }
      }
    }

    const spacerArray = ["", ""];

    // construct headers for statement groups
    const facName = userSelectedFactors[j];

    // create column headers for other factors
    const otherFactorNames = clone(userSelectedFactors);
    otherFactorNames.splice(j, 1);
    const higherRankedHeader = [
      "",
      appendTextHeader2a + facName + appendTextHeader2b
    ];

    const header1 = ["", appendText2 + facName];
    const header0 = ["", appendTextHeader1, facName, appendText9].concat(
      otherFactorNames
    );
    cribArray2[0].unshift(
      spacerArray,
      header1,
      ["", "", "", appendText8],
      header0
    );

    cribArray2[1].unshift(spacerArray, higherRankedHeader);

    const header3 = {};
    header3.stateNum = "";
    header3.statement = appendTextHeader3a + facName + appendTextHeader3b;
    header3.sortValue = "";
    cribArray2[2].unshift(spacerArray, [
      "",
      appendTextHeader3a + facName + appendTextHeader3b,
      ""
    ]);

    const header4 = {};
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
