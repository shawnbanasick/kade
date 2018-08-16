import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { AgGridStyleWrapper } from "styled-components";
import { AgGridReact } from "ag-grid-react";
import state from "../../../store";

// let containerStyle = {
//   marginTop: 30,
//   height: 200,
//   width: 862
// };

class EigenTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  }

  render() {
    const numFacsForTableWidth = state.getState("numFacsForTableWidth");
    let widthVal = 282 + 80 * numFacsForTableWidth;
    // if (widthVal > window.innerWidth - 100) {
    //   widthVal = window.innerWidth - 100;
    // }
    widthVal += "px";

    const gridColDefsFacTableEigen = state.getState("gridColDefsFacTableEigen");
    const gridRowDataFacTableEigen = state.getState("gridRowDataFacTableEigen");
    // console.log(`defs: ${  JSON.stringify(gridColDefsFacTableEigen)}`);
    // console.log(`defs: ${  JSON.stringify(gridRowDataFacTableEigen)}`);

    const { onGridReady } = this;

    return (
      <div style={{ marginTop: 30, height: 200, width: widthVal }}>
        <div className="ag-theme-fresh">
          <div>
            <AgGridReact
              columnDefs={gridColDefsFacTableEigen}
              rowData={gridRowDataFacTableEigen}
              onGridReady={onGridReady}
              gridAutoHeight
              enableSorting
            />
          </div>
        </div>
      </div>
    );
  }
}

export default view(EigenTable);

// className="ag-theme-fresh"
