import factorState from '../../GlobalState/factorState';
import i18n from "i18next";
const clone = require('rfdc')()

const pushUnrotatedFactorsTableToOutputArray = function(
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // getState
  const unrotFactorMatrix = clone(factorState.unrotatedFactorMatrixOutput);
  const eigenvals = clone(factorState.eigenvalues); // "eigenValuesSorted");
  const expVar = clone(factorState.eigensPercentExpVar);

  sheetNamesXlsx.push(i18n.t("Unrotated Factor Matrix"));

  // set excel column widths
  const columns = [
    {
      wch: 8
    },
    {
      wch: 20
    }
  ];
  const iiiLen = unrotFactorMatrix[0].length - 2;
  for (let iii = 0; iii < iiiLen; iii++) {
    columns.push({
      wch: 8
    });
  }
  colSizes.push(columns);

  eigenvals.unshift("");
  
  expVar.unshift("");

  unrotFactorMatrix.push(["", ""], eigenvals, expVar);
  unrotFactorMatrix.unshift(["", ""], [i18n.t("Unrotated Factor Matrix")], ["", ""]);

  outputData.push(unrotFactorMatrix);

  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushUnrotatedFactorsTableToOutputArray;
