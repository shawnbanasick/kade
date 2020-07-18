import evenRound from "../../../Utils/evenRound";

const clone = require("rfdc")();

const factorTableDataPrep = (
  numFactors,
  factorMatrix,
  respondentNames,
  translationsText
) => {
  // clone matrix
  const factorMatrix1 = clone(factorMatrix);

  const gridColDefsFactorTable = [
    {
      headerName: translationsText.nmTrans,
      field: "resNum",
      pinned: true,
      editable: false,
      sortable: true,
      width: 80,
      sort: "asc",
      cellStyle: {
        textAlign: "center"
        // backgroundColor: "#eee"
      }
    },
    {
      headerName: translationsText.participantTrans,
      field: "respondent",
      pinned: true,
      editable: false,
      sortable: true,
      width: 180,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];

  const unrotFacTableHeader = [
    translationsText.nmTrans,
    translationsText.participantTrans
  ];
  for (let i = 0; i < numFactors; i += 1) {
    const facNumber = i + 1;
    unrotFacTableHeader.push(`${translationsText.factorTrans} ${facNumber}`);
    gridColDefsFactorTable.push({
      headerName: `${translationsText.factorTrans} ${facNumber}`,
      field: `factor${facNumber}`,
      pinned: false,
      sortable: true,
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

  const results = {
    gridColDefsFactorTable,
    gridRowDataFactorTable,
    unrotatedFactorArray
  };

  return results;
};

export default factorTableDataPrep;
