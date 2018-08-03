import store from "../../../store";

export function getRespondentSortsExcelT1(
  sortData,
  respondentNames,
  numStatements
) {
  // generate the original load value for statement number array
  let statementNumArray = [];
  for (let i = 0; i < numStatements; i++) {
    statementNumArray.push(i + 1);
  }
  let testValue = statementNumArray.join(",");
  let excelType1NonsymmetricArray = [];

  // transpose data
  // todo - check to see if util transposer will work for this
  let sortDataTransposed = sortData[0].map(function(col, i) {
    return sortData.map(function(row) {
      return row[i];
    });
  });

  let sortBy = require("lodash/sortBy");
  let data2 = [];
  for (let p = 0; p < sortDataTransposed.length; p++) {
    let sortedArray1 = sortBy(sortDataTransposed[p], function(obj) {
      return obj.statementNum;
    });
    data2.push(sortedArray1);
  }
  let temp2, temp2a;
  let respondentDataSorts3 = [];
  for (let q = 0; q < data2.length; q++) {
    let temp11 = data2[q];
    let tempArray3 = [];
    let tempArray33 = [];
    for (let r = 0; r < temp11.length; r++) {
      temp2 = temp11[r].sortValue;
      temp2a = temp11[r].statementNum;
      tempArray3.push(temp2);
      tempArray33.push(temp2a);
    }
    respondentDataSorts3.push(tempArray3);

    // do error check for symmetry (no duplicate statement numbers)
    let respondentDataCheck = tempArray33.join(",");
    if (respondentDataCheck !== testValue) {
      excelType1NonsymmetricArray.push(respondentNames[q]);
    }

    // todo - check if this is needed?
    statementNumArray.push(tempArray33);
  }

  let excelType1NonsymmetricArrayText = excelType1NonsymmetricArray.join(",");

  store.setState({
    excelType1NonsymmetricArrayText: excelType1NonsymmetricArrayText
  });

  // let returnedValue = [respondentDataSorts3, statementNumArray];
  return [respondentDataSorts3, statementNumArray];
}
