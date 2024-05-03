import getLoadingState from "../../GlobalState/getLoadingState";
import i18n from "i18next";

const pushLoadingsTableToOutput = function(
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const gridColDefsLoadingsTable = getLoadingState("gridColDefsLoadingsTable");

  // add worksheet name
  sheetNamesXlsx.push(i18n.t("Factor Loadings Table"));

  const tableData = getLoadingState("currentLoadingsTable");
  // confirm proper sort by factor group
  const results = tableData
    .slice()
    .sort((a, b) => a.defaultSort - b.defaultSort);

  const formattedResults = [];

  const headerRow = [i18n.t("Nm"), i18n.t("Q-sort"), i18n.t("Factor Group")];

  const key1Array = [];
  const key2Array = [];
  for (let m = 5; m < gridColDefsLoadingsTable.length; m += 1) {
    headerRow.push(gridColDefsLoadingsTable[m].headerName);
    if (m % 2 === 0) {
      key2Array.push(gridColDefsLoadingsTable[m].field);
    } else {
      key1Array.push(gridColDefsLoadingsTable[m].field);
    }
  }

  // populate header row
  // getState - pulls array - ["factor 1", "factor 2", "factor 3", "factor 4", "factor 5", "factor 6", "factor 7", "factor 8"]
  const iLoopLen = results.length;

  // change from true / false to "flagged"
  // for each row
  for (let i = 0; i < iLoopLen; i++) {
    // along each row
    const tempArray = [];
    tempArray.push(
      results[i].resNum,
      results[i].respondent,
      results[i].factorGroup
    );
    for (let j = 0; j < key2Array.length; j++) {
      const key1 = key1Array[j];
      const key2 = key2Array[j];
      tempArray.push(results[i][key1]);
      const temp = results[i][key2];
      if (temp === true) {
        tempArray.push(i18n.t("Flagged"));
      } else {
        tempArray.push("");
      }
    } // end j loop
    formattedResults.push(tempArray);
  } // end i loop

  // set excel column widths
  const columns = [
    {
      wch: 8
    }
  ];
  for (let ii = 0, iiLen = formattedResults[0].length; ii < iiLen; ii++) {
    columns.push({
      wch: 8
    });
  }

  colSizes.push(columns);

  formattedResults.unshift(
    ["loadingsTable", ""],
    ["", ""],
    [i18n.t("Loadings Table with Defining Sorts Flagged")],
    ["", ""],
    headerRow
  );
  outputData.push(formattedResults);

  console.log("dispatch - 7b - pushLoadingsTable complete");
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushLoadingsTableToOutput;
