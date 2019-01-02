import state from "../../../store";
import evenRound from "../../../Utils/evenRound";

const factorTableEigenDataPrep = (numFactors, eigenValues) => {
  const gridColDefsFacTableEigen = [
    {
      headerName: "",
      field: "EigenList",
      pinned: true,
      editable: false,
      width: 280,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];

  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    gridColDefsFacTableEigen.push({
      headerName: `Factor ${facNumber}`,
      field: `factor${facNumber}`,
      pinned: false,
      editable: false,
      width: 90,
      cellStyle: {
        textAlign: "center"
      }
    }); // end push
  } // end loop

  // add labels
  eigenValues[0].unshift("Eigenvalues");
  eigenValues[1].unshift("% Explained Variance");
  eigenValues[2].unshift("Cumulative % Expln Var");

  const gridRowDataFacTableEigen = [];

  for (let j = 0; j < eigenValues.length; j += 1) {
    // let responNum = j + 1;
    const tempArray = {};
    tempArray.EigenList = eigenValues[j][0];

    for (let k = 1; k < eigenValues[0].length; k += 1) {
      if (j === 0) {
        tempArray[`factor${k}`] = evenRound(eigenValues[j][k], 4);
      } else {
        tempArray[`factor${k}`] = eigenValues[j][k];
      }
    }

    gridRowDataFacTableEigen.push(tempArray);
  }

  state.setState({
    gridColDefsFacTableEigen,
    gridRowDataFacTableEigen
  });
};

export default factorTableEigenDataPrep;
