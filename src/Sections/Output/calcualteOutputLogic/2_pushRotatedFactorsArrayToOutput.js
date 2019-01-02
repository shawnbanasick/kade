import state from "../../../store";
// import evenRound from "../../Utils/evenRound";
// import transposeMatrix from "../../Utils/transposeMatrix";
import calcEigenValues from "../../Factors/centroidLogic/calcEigenValues";

const pushRotFactorsArrayToOutput = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const results = state.getState("currentLoadingsTable");

  // add worksheet name
  sheetNamesXlsx.push("Factor Loadings");

  // resort the array of objects
  results.sort((a, b) => a.resNum - b.resNum);

  const formattedResults = [];

  // populate header row
  // pulls array - ["factor 1", "factor 2", "factor 3", "factor 4", "factor 5", "factor 6", "factor 7", "factor 8"]
  let userSelectedFactors = state.getState("userSelectedFactors");
  const jLoopLen = userSelectedFactors.length;
  const iLoopLen = results.length;

  // strip spaces from userSelectedFactors
  // create check array of userSelectedFactors
  // add to header array
  const headerRow = ["Part.No.", "Q-sort"];
  const userSelectedFactorsArray = [...userSelectedFactors];
  const newUserSelectedFactorsArray = [];
  const userSelectedFactorsCheckArray = [];
  for (let k = 0; k < userSelectedFactorsArray.length; k++) {
    // userSelectedFactors[k] = userSelectedFactors[k].replace(/\s/g, "");
    const temp1 = userSelectedFactorsArray[k].split(" ");
    const check = `check${temp1[1]}`;
    const factorName = `factor${temp1[1]}`;
    const headerFactorName = `Factor ${temp1[1]}`;
    headerRow.push(headerFactorName, "");
    userSelectedFactorsCheckArray.push(check);
    newUserSelectedFactorsArray.push(factorName);
  }
  userSelectedFactors = [...newUserSelectedFactorsArray];

  // pull results to calc eigenvals
  const eigensArray1 = [];
  // change from true / false to "flagged"
  // for each row
  for (let i = 0; i < iLoopLen; i++) {
    // along each row
    const tempArray = [];
    const tempArrayEigen = [];
    tempArray.push(results[i].resNum, results[i].respondent);
    for (let j = 0; j < jLoopLen; j++) {
      const key1 = newUserSelectedFactorsArray[j];
      const key2 = userSelectedFactorsCheckArray[j];
      tempArray.push(results[i][key1]);
      tempArrayEigen.push(results[i][key1]);
      const temp = results[i][key2];
      if (temp === true) {
        tempArray.push("flagged");
      } else {
        tempArray.push("");
      }
    } // end j loop
    formattedResults.push(tempArray);
    eigensArray1.push(tempArrayEigen);
  } // end i loop

  // calc and output percent explained variance for rotated factors
  const factorMatrix = state.getState("factorMatrix");
  const numQsorts = state.getState("numQsorts");
  const eigensCalc = calcEigenValues(factorMatrix, numQsorts);
  const expVarArray = ["%Explained Variance", ""];

  // grab just factor indicators from end of string to get index values
  const userSelectedFactors2 = [...userSelectedFactors];
  const userSelectedFactors3 = userSelectedFactors2.map(item => {
    const length = item.length;
    const item2 = item.substring(6, length);
    return item2;
  });

  // use index values to get appropriate eigen ONLY for user selected factor from calcs above
  // create eigen look-up table
  const eigenLookupTable = {};
  for (let m = 0; m < eigensCalc[1].length; m++) {
    const val = (m + 1).toString();
    eigenLookupTable[val] = eigensCalc[1][m];
  }

  // use the lookup table to push corresponding values
  for (let k = 0; k < userSelectedFactors3.length; k++) {
    const searchVal = userSelectedFactors3[k].charAt(0);
    expVarArray.push(eigenLookupTable[searchVal], "");
  }
  formattedResults.push(expVarArray);

  // set excel column widths
  const columns = [
    {
      wch: 20
    }
  ];
  for (let ii = 0, iiLen = formattedResults[0].length; ii < iiLen; ii++) {
    columns.push({
      wch: 8
    });
  }
  colSizes.push(columns);

  output.push(formattedResults);

  formattedResults.unshift(
    ["", ""],
    ["Factor Matrix with Defining Sorts Flagged"],
    ["", ""],
    headerRow
  );
  outputData.push(formattedResults);

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushRotFactorsArrayToOutput;
