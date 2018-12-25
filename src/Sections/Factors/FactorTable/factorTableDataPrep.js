import cloneDeep from "lodash/cloneDeep";
import store from "../../../store";
import evenRound from "../../../Utils/evenRound";

const factorTableDataPrep = (numFactors, factorMatrix) => {
  const respondentNames = store.getState("respondentNames");
  // clone matrix
  const factorMatrix1 = cloneDeep(factorMatrix);

  const gridColDefsFactorTable = [
    {
      headerName: "Part. Num.",
      field: "resNum",
      pinned: true,
      editable: false,
      width: 80,
      sort: "asc",
      cellStyle: {
        textAlign: "center"
        // backgroundColor: "#eee"
      }
    },
    {
      headerName: "Participant",
      field: "respondent",
      pinned: true,
      editable: false,
      width: 180,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];

  const unrotFacTableHeader = ["Part.Num.", "Participant"];
  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    unrotFacTableHeader.push(`Factor ${facNumber}`);
    gridColDefsFactorTable.push({
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

  const gridRowDataFactorTable = [];
  const unrotatedFactorArray = [];

  for (let j = 0; j < factorMatrix1[0].length; j += 1) {
    const tempArray = [];
    const responNum = j + 1;
    const tempObj = {};
    let tempVar;
    let facNum;
    tempObj.resNum = responNum;
    tempObj.respondent = respondentNames[j];
    tempArray.push(responNum, respondentNames[j]);
    for (let k = 0; k < factorMatrix1.length; k += 1) {
      facNum = k + 1;
      tempVar = evenRound(factorMatrix1[k][j], 4);
      tempObj[`factor${facNum}`] = tempVar;
      tempArray.push(tempVar);
    }
    gridRowDataFactorTable.push(tempObj);
    unrotatedFactorArray.push(tempArray);
  }

  unrotatedFactorArray.unshift(unrotFacTableHeader);

  store.setState({
    gridColDefsFactorTable,
    gridRowDataFactorTable,
    unrotatedFactorMatrixOutput: unrotatedFactorArray
  });
};

export default factorTableDataPrep;
