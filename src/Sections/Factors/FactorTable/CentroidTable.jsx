import React, { Component } from "react";
import { view } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";
import state from "../../../store";

class CentroidTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render() {
    const numFacsForTableWidth = state.getState("numFacsForTableWidth");
    let widthVal = 80 + 190 + 90 * numFacsForTableWidth;
    widthVal += "px";

    const gridColDefsFactorTable = state.getState("gridColDefsFactorTable");
    const gridRowDataFactorTable = state.getState("gridRowDataFactorTable");
    const { onGridReady } = this.onGridReady;
    return (
      <div>
        <div
          style={{ marginTop: 30, width: widthVal }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            // properties
            columnDefs={gridColDefsFactorTable}
            rowData={gridRowDataFactorTable}
            // events
            onGridReady={onGridReady}
            gridAutoHeight
            enableSorting
          />
        </div>
      </div>
    );
  }
}

export default view(CentroidTable);
