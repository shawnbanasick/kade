import store from "../../../store";

const pushStatementsToOutputArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const statements = store.getState("statements");

  // var newSheet = {
  //     sheetid: "Statements",
  //     header: true
  // };
  sheetNamesXlsx.push("Statements");

  let maxStatementLength = 0;
  const arrayOfStatements = [];
  arrayOfStatements.push(["", ""], ["Statement Number", "Statements"]);
  for (let ii = 0, iiLen = statements.length; ii < iiLen; ii++) {
    const tempArray1 = [];
    tempArray1.push(ii + 1, statements[ii]);
    arrayOfStatements.push(tempArray1);
    const stringLength = statements[ii].length;
    if (stringLength > maxStatementLength) {
      maxStatementLength = stringLength;
    }
  }
  outputData.push(arrayOfStatements);

  const columns = [
    {
      wch: 10
    },
    {
      wch: maxStatementLength
    }
  ];
  colSizes.push(columns);

  store.setState({
    maxStatementLength
  });

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushStatementsToOutputArray;
