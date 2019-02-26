export default function getExcelT1SortText(inputData1, numStatements) {
  const sortData = [];
  const sortLength = 29 + numStatements;
  const counter = inputData1[28].length - 1;

  for (let k = 28; k < sortLength; k += 1) {
    const key = inputData1[k][0];
    let value;
    const tempArray1 = [];
    let j = 1;
    let tempObj1;

    for (let kr = 0; kr < counter; kr += 1) {
      value = inputData1[k][j];

      // catch the respondent names first
      if (k === 28 && value !== "") {
        tempObj1 = {};
        tempObj1.sortValue = key;
        tempObj1.statementNum = value;
        tempArray1.push(tempObj1);
      } else if (value !== "") {
        tempObj1 = {};
        tempObj1.sortValue = +key;
        tempObj1.statementNum = +value;
        tempArray1.push(tempObj1);
      }
      j += 1;
    }
    sortData.push(tempArray1);
  }
  console.log(
    "TCL: exportdefaultfunctiongetExcelT1SortText -> sortData",
    sortData
  );
  return sortData;
}
