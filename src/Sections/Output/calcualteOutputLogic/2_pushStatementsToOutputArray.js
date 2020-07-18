// import { max } from "d3";

// import coreState from '../../GlobalState/coreState';
// import calcState from '../../GlobalState/calcState';
// import i18n from "i18next";
// const clone = require('rfdc')()

const pushStatementsToOutputArray = function(
  outputData,
  sheetNamesXlsx,
  colSizes,
  statements,
  stateTranslations
) {
  // // get translations
  const statementsTrans = stateTranslations.statementsTrans;
  const statementNumTrans = stateTranslations.statementNumTrans;

  // // getState
  // const statements = clone(coreState.statements);

  sheetNamesXlsx.push(statementsTrans);

  const arrayOfStatements = [];
  arrayOfStatements.push(["", ""], [statementNumTrans, statementsTrans]);

  let maxStatementLength = 0;
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

  // calcState.maxStatementLength = maxStatementLength;

  return [[outputData, sheetNamesXlsx, colSizes], maxStatementLength];
};

export default pushStatementsToOutputArray;
