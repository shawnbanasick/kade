import { countBy, flatten, identity } from "lodash";
import calcState from "../../GlobalState/calcState";
import outputState from "../../GlobalState/outputState";
import coreState from "../../GlobalState/coreState";
import getCribSheetsHighestStatements from "./3_getCribSheetsHighestStatements";
import getCribSheetsLowestStatements from "./3_getCribSheetsLowestStatements";
import getCribSheetsRankedHigherThanOtherFactors from "./3_getCribSheetsRankedHigherThanOtherFactors";
import getCribSheetsRankedLowerThanOtherFactors from "./3_getCribSheetsRankedLowerThanOtherFactors";
import i18n from "i18next";

const clone = require("rfdc")();

const pushCribSheetsToOutput = function(outputData, sheetNamesXlsx, colSizes) {
  const appendText1 = i18n.t("Rel Ranks");
  const appendText2 = i18n.t("Relative Ranking of Statements in");
  const statementNumTrans = "Statement Number";
  // const zScoreTrans = i18n.t("Z score");
  const zScoreTrans = "Z-score";
  const statementTrans = "Statement";
  const sortValuesTrans = i18n.t("Sort Values");
  const appendText8 = i18n.t("Consensus");
  const appendText9 = i18n.t("Distinguishing");

  const appendTextHeader1 = i18n.t("Highest Ranked Statements");
  const appendTextHeader2a = i18n.t("Positive Statements Ranked Higher in");
  const appendTextHeader2b = i18n.t("Array than in Other Factor Arrays 1");
  const appendTextHeader3a = i18n.t("Negative Statements Ranked Lower in");
  const appendTextHeader3b = i18n.t("Array than in Other Factor Arrays 2");
  const appendTextHeader4 = i18n.t("Lowest Ranked Statements");

  // getState
  const statementRankingArray = clone(calcState.statementRankingArray);
  const userSelectedFactors = clone(outputState.userSelectedFactors);
  const sortTriangleShape = clone(coreState.qSortPattern);
  const synFactorArray1Holder = clone(calcState.synFactorArray1Holder);

  // initialize variables
  let cribArray2 = [];

  // determine the number of statements in the extreme positive / negative columns
  const arrayMax = +Math.max(...sortTriangleShape);
  const arrayMin = +Math.min(...sortTriangleShape);
  const triangleCounts = countBy(sortTriangleShape, identity);
  const maxCounts = triangleCounts[arrayMax];
  const minCounts = triangleCounts[arrayMin];

  // big loop through all factors
  for (let j = 0, jLen = userSelectedFactors.length; j < jLen; j++) {
    let name = userSelectedFactors[j];
    let facNum = name.slice(7);
    sheetNamesXlsx.push(`${i18n.t("Factor")} ${facNum} - ${appendText1}`);

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

    // highest, higher than all other factors, lower than all other factors, lowest
    cribArray2 = [[], [], [], []];

    const factorInformation2 = synFactorArray1Holder[j];

    // add sort key
    const factorInformation = factorInformation2.map((item, index) => {
      item.highLowZorder = index + 1;
      return item;
    });

    // sort by statement number
    factorInformation.sort(
      (a, b) => a[statementNumTrans] - b[statementNumTrans]
    );

    // append the ranking arrays
    for (let k = 0, kLen = factorInformation.length; k < kLen; k++) {
      factorInformation[k].rankArray = statementRankingArray[k];
    }

    // resort back to high to low z-score sort
    factorInformation.sort((a, b) => {
      if (b.highLowZorder === a.highLowZorder) {
        return a[statementNumTrans] - b[statementNumTrans];
      }
      return b[zScoreTrans] - a[zScoreTrans];
    });

    // push highest to cribArray
    const highestStatements = getCribSheetsHighestStatements(
      j,
      minCounts,
      factorInformation,
      statementNumTrans,
      statementTrans,
      sortValuesTrans
    );

    cribArray2[0] = [...highestStatements];

    // push lowest to cribArray
    const lowestStatements = getCribSheetsLowestStatements(
      j,
      maxCounts,
      factorInformation,
      statementNumTrans,
      statementTrans,
      sortValuesTrans
    );

    cribArray2[3] = [...lowestStatements];

    const higherStatements = getCribSheetsRankedHigherThanOtherFactors(
      j,
      factorInformation,
      sortValuesTrans,
      statementTrans,
      statementNumTrans
    );

    cribArray2[1] = [...higherStatements];

    const lowerStatements = getCribSheetsRankedLowerThanOtherFactors(
      j,
      factorInformation,
      sortValuesTrans,
      statementTrans,
      statementNumTrans
    );

    cribArray2[2] = [...lowerStatements];

    const spacerArray = ["", ""];

    // construct headers for statement groups
    const facName = `${i18n.t("Factor")} ${userSelectedFactors[j].slice(7)}`;

    // create column headers for other factors
    const otherFactorNames = clone(userSelectedFactors);
    otherFactorNames.splice(j, 1);

    // translate user selected factors
    const translatedFactorNames = [];
    otherFactorNames.forEach(item => {
      const number = item.slice(7);
      translatedFactorNames.push(`${i18n.t("Factor")} ${number}`);
    });

    // format worksheet
    const higherRankedHeader = [
      "",
      appendTextHeader2a + facName + appendTextHeader2b
    ];

    const header1 = ["", appendText2 + facName];
    const header0 = ["", appendTextHeader1, facName, appendText9].concat(
      translatedFactorNames
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

    outputData.push(flatten(cribArray2));
  }
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushCribSheetsToOutput;
