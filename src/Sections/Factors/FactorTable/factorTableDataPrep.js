import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";

const factorTableDataPrep = (numFactors, factorMatrix) => {
    let respondentNames = store.getState("respondentNames");
    // clone matrix
    let factorMatrix1 = cloneDeep(factorMatrix);

    let gridColDefsFactorTable = [
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
            width: 200,
            cellStyle: {
                textAlign: "center"
            }
        }
    ];

    let unrotFacTableHeader = ["Part.Num.", "Participant"];
    for (let i = 0; i < numFactors; i++) {
        let facNumber = i + 1;
        unrotFacTableHeader.push("Factor " + facNumber);
        gridColDefsFactorTable.push({
            headerName: "Factor " + facNumber,
            field: "factor" + facNumber,
            pinned: false,
            editable: false,
            width: 80,
            cellStyle: {
                textAlign: "center"
            }
        }); // end push
    } // end loop

    let gridRowDataFactorTable = [];
    let unrotatedFactorArray = [];

    for (let j = 0; j < factorMatrix1[0].length; j++) {
        let tempArray = [];
        let responNum = j + 1;
        let tempObj = {};
        let tempVar,
            facNum;
        tempObj.resNum = responNum;
        tempObj.respondent = respondentNames[j];
        tempArray.push(responNum, respondentNames[j]);
        for (let k = 0; k < factorMatrix1.length; k++) {
            facNum = k + 1;
            tempVar = evenRound(factorMatrix1[k][j], 4);
            tempObj["factor" + facNum] = tempVar;
            tempArray.push(tempVar);
        }
        gridRowDataFactorTable.push(tempObj);
        unrotatedFactorArray.push(tempArray);
    }

    unrotatedFactorArray.unshift(unrotFacTableHeader);

    store.setState({
        gridColDefsFactorTable: gridColDefsFactorTable,
        gridRowDataFactorTable: gridRowDataFactorTable,
        unrotatedFactorMatrixOutput: unrotatedFactorArray
    });
};

export default factorTableDataPrep;

