import state from "../../../store";

const pushUnrotatedFactorsTableToOutputArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const unrotFactorMatrix = state.getState("unrotatedFactorMatrixOutput");
  const eigenvals = state.getState("eigenvalues"); // "eigenValuesSorted");
  const expVar = state.getState("eigensPercentExpVar");

  sheetNamesXlsx.push("Unrotated Factor Matrix");

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

  // add eigenvals
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
