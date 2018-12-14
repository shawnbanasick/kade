import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const getArrayValues = userSelectedFactors => {
    const headerRow = ["Nm", "Statement", "N"];

    const colWidthVals = [60, 250, 60];
    // 110,
    //  90,

    const alignmentVals = ["center", "left", "center"];
    // center

    const pinnedVals = [true, true, true];
    // false

    for (let i = 0; i < userSelectedFactors.length; i++) {
        const identifier3 = userSelectedFactors[i].slice(7);
        const identifier2 = `F${identifier3} Z-score`;
        const identifier = `F${identifier3} Rank`;
        headerRow.push(identifier2, identifier);
        colWidthVals.push(110, 90);
        alignmentVals.push("center", "center");
        pinnedVals.push(false, false);
    }

    return [headerRow, colWidthVals, alignmentVals, pinnedVals];
};

const getCurrentData = (headerRow, numFacs) => {
    const data = state.getState("factorScoreRanksArray");

    const lengthCutOff = numFacs * 2 + 3;
    headerRow.length = lengthCutOff;

    return [data, numFacs];
};

const getGridColDefsFacTable = (
    numFacs,
    headerRow,
    pinnedVals,
    colWidthVals,
    alignmentVals
) => {
    const gridColDefsFacTable = [];

    for (let i = 0; i < headerRow.length; i++) {
        gridColDefsFacTable.push({
            headerName: headerRow[i],
            field: headerRow[i],
            pinned: pinnedVals[i],
            editable: false,
            width: colWidthVals[i],
            cellStyle: {
                textAlign: alignmentVals[i]
            }
        }); // end push
    } // end loop

    return gridColDefsFacTable;
};

const getGridRowDataFacTable = (data2, headerRow) => {
    // prevent empty component mount error
    if (data2 === undefined) {
        return;
    }
    const data = data2.slice(5);
    const gridRowDataFacTable = [];

    for (let j = 0; j < data.length; j++) {
        // let responNum = j + 1;
        const tempObj = {};
        tempObj.factorList = data[j][0];

        for (let k = 0; k < headerRow.length; k++) {
            tempObj[headerRow[k]] = data[j][k];
        }
        gridRowDataFacTable.push(tempObj);
    }

    return gridRowDataFacTable;
};

const localStore = store({
    numFactors: 0,
    numStatements: 0
});

function getWidth(numFactors) {
    let widthVal = 383 + 200 * numFactors;
    let x = window.innerWidth - 40 - 152;

    if (x < widthVal) {
        x += "px";
        return x;
    }
    widthVal += "px";
    return widthVal;
}

function getHeight(numStatements) {
    let heightVal = 40 + 25 * numStatements;
    let y = window.innerHeight - 120 - 50;
    if (y < heightVal) {
        y += "px";
        return y;
    }
    heightVal += "px";
    return heightVal;
}

function resetWidthAndHeight() {
    // this.gridApi.setGridAutoHeight(false);
    const numFactors = localStore.numFactors;
    const numStatements = localStore.numStatements;
    const table = document.querySelector("#innerContainerFactors");
    if (table !== null) {
        table.style.height = getHeight(numStatements);
        table.style.width = getWidth(numFactors);
    }
}

window.addEventListener("resize", () => {
    resetWidthAndHeight();
});

class FactorsTable extends Component {
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    }

    render() {
        const showFactorsTable = state.getState("showFactorCorrelationsTable");

        // return [headerRow, colWidthVals, alignmentVals, pinnedVals];
        const userSelectedFactors = state.getState("userSelectedFactors");
        const numFacs = userSelectedFactors.length;

        // const outputButtonsArrayNumbers = state.getState("outputButtonsArray");
        const arrayValues = getArrayValues(userSelectedFactors);

        const currentData = getCurrentData(arrayValues[0], numFacs);

        const numFactors = currentData[1];
        const numStatements = state.getState("numStatements");
        localStore.numFactors = numFactors;
        localStore.numStatements = numStatements;

        const {onGridReady} = this;

        const gridColDefsFacTable = getGridColDefsFacTable(
            currentData[1], // numFacs
            arrayValues[0], // headerRow
            arrayValues[3], // pinnedVals
            arrayValues[1], // colWidthVals
            arrayValues[2] // alighmentVals
        ); // store.getState("gridColDefsFacTableEigen");
        const gridRowDataFacTable = getGridRowDataFacTable(
            currentData[0], // data
            arrayValues[0] // headerRow
        );

        if (showFactorsTable) {
            return (
                <div>
                  <p style={ { fontWeight: "normal", marginTop: 15, textAlign: "left" } }>
                    Click the table headers to re-sort by column (low-to-high, high-to-low, original sort).
                  </p>
                  <div id="innerContainerFactors" style={ { width: getWidth(numFactors), height: getHeight(numStatements) } } className="ag-theme-fresh">
                    <AgGridReact id="factorsTable" columnDefs={ gridColDefsFacTable } rowData={ gridRowDataFacTable } onGridReady={ onGridReady } enableSorting />
                  </div>
                </div>
                );
        }
        return (
            <h2 style={ { marginTop: 50, marginLeft: 50 } }>Select factors to output in the Options tab</h2>
            );
    }
}

export default view(FactorsTable);
