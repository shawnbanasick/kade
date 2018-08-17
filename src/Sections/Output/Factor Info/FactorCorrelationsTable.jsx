import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";

// let containerStyle = {
//   marginTop: 30,
//   height: 200,
//   width: 862
// };

const getCurrentData = () => {
    let data = store.getState("factorCorrelationsTableData");
    let numFacs2 = store.getState("userSelectedFactors");
    let numFacs = numFacs2.length;
    // pull out header row
    let headerRow = data[3];

    return [data, numFacs, headerRow];
};

let gridRowDataFacCorrTable = [];
let gridColDefsFacCorrTable = [];

const getGridColDefsFacCorrTable = (data, numFacs, headerRow) => {
    gridColDefsFacCorrTable = [
        {
            headerName: "",
            field: "factorList",
            pinned: true,
            editable: false,
            width: 180,
            cellStyle: {
                textAlign: "center"
            }
        }
    ];

    for (let i = 1; i < numFacs + 1; i++) {
        gridColDefsFacCorrTable.push({
            headerName: headerRow[i],
            field: headerRow[i],
            pinned: false,
            editable: false,
            width: 80,
            cellStyle: {
                textAlign: "center"
            }
        }); // end push
    } // end loop

    return gridColDefsFacCorrTable;
};

const getGridRowDataFacCorrTable = (data, headerRow) => {
    gridRowDataFacCorrTable = [];

    for (let j = 4; j < data.length; j++) {
        // let responNum = j + 1;
        let tempObj = {};
        tempObj.factorList = data[j][0];

        for (let k = 1; k < headerRow.length; k++) {
            tempObj[headerRow[k]] = data[j][k];
        }
        gridRowDataFacCorrTable.push(tempObj);
    }

    return gridRowDataFacCorrTable;
};

class FactorCorrelationsTable extends Component {
    onGridReady = params => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    };

    render() {
        let currentData = getCurrentData();

        let widthVal = 182 + 80 * currentData[1];
        if (widthVal > window.innerWidth - 100) {
            widthVal = window.innerWidth - 100;
        }
        widthVal = widthVal + "px";

        let gridColDefsFacCorrTable = getGridColDefsFacCorrTable(...currentData); // store.getState("gridColDefsFacTableEigen");
        let gridRowDataFacCorrTable = getGridRowDataFacCorrTable(
            currentData[0],
            currentData[2]
        ); 

        return (
            <div>
              <div style={ { height: "auto", width: widthVal } } className="ag-fresh">
                <AgGridReact id="facCorTable" columnDefs={ gridColDefsFacCorrTable } rowData={ gridRowDataFacCorrTable } 
                onGridReady={ this.onGridReady.bind(this) } domLayout={ 'autoHeight' } enableSorting={ true }
                />
              </div>
            </div>
            );
    }
}

export default easyComp(FactorCorrelationsTable);