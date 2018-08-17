import store from "../../store";

const pushUnrotatedFactorsTableToOutputArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  let unrotFactorMatrix = store.getState("unrotatedFactorMatrixOutput");
  let eigenvals = store.getState("eigenvalues"); // "eigenValuesSorted");
  let expVar = store.getState("eigensPercentExpVar");

  sheetNamesXlsx.push("Unrotated Factor Matrix");

  // set excel column widths
  let columns = [
    {
      wch: 8
    },
    {
      wch: 20
    }
  ];
  let iiiLen = unrotFactorMatrix[0].length - 2;
  for (let iii = 0; iii < iiiLen; iii++) {
    columns.push({
      wch: 8
    });
  }
  colSizes.push(columns);

  //add eigenvals
  if (eigenvals[0] === "Eigenvalues") {
    eigenvals.unshift("");
  } else {
    eigenvals.unshift("", "Eigenvalues");
  }
  expVar.unshift("");

  unrotFactorMatrix.push(["", ""], eigenvals, expVar);
  unrotFactorMatrix.unshift(["", ""], ["Unrotated Factor Matrix"], ["", ""]);

  outputData.push(unrotFactorMatrix);

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushUnrotatedFactorsTableToOutputArray;
