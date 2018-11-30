import { view, store } from "react-easy-state";
import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import state from "../../../store";

const getCurrentData = () => {
  const data = state.getState("factorScoreRanksArray");
  const numFacs2 = state.getState("userSelectedFactors");
  const numFacs = numFacs2.length;
  // set up header row
  const headerRow = [
    "Nm", "Statement", "N", "F1 Z-score", "F1 Rank", "F2 Z-score", "F2 Rank", "F3 Z-score", "F3 Rank", "F4 Z-score", "F4 Rank", "F5 Z-score", "F5 Rank", "F6 Z-score", "F6 Rank", "F7 Z-score", "F7 Rank", "F8 Z-score", "F8 Rank"
  ];

  const lengthCutOff = (numFacs * 2) + 3;
  headerRow.length = lengthCutOff;

  return [data, numFacs, headerRow];
};

const getGridColDefsFacTable = (numFacs, headerRow) => {

  const colWidthVals = [60, 250, 60, 110, 90, 110, 90, 110, 90, 110, 90, 110, 90, 110, 90, 110, 90, 110, 90];
  const alignmentVals = ["center", "left", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center", "center"];
  const pinnedVals = [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

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
  let widthVal = 375 + (200 * numFactors);
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
    const currentData = getCurrentData();
    const numFactors = currentData[1];
    const numStatements = state.getState("numStatements");
    localStore.numFactors = numFactors;
    localStore.numStatements = numStatements;

    const {onGridReady} = this;

    const gridColDefsFacTable = getGridColDefsFacTable(currentData[1], currentData[2]); // store.getState("gridColDefsFacTableEigen");
    const gridRowDataFacTable = getGridRowDataFacTable(currentData[0], currentData[2]);

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
}

export default view(FactorsTable);
