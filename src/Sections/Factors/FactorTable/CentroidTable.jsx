import React, { Component } from "react";
import { view } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";
import store from "../../../store";

// let containerStyle = {
//   marginTop: 30,
//   // height: 400,
//   width: 922
// };

class CentroidTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render() {
    const numFacsForTableWidth = store.getState("numFacsForTableWidth");
    let widthVal = 80 + 202 + 80 * numFacsForTableWidth;
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal += "px";

    const gridColDefsFactorTable = store.getState("gridColDefsFactorTable");
    const gridRowDataFactorTable = store.getState("gridRowDataFactorTable");
    const { onGridReady } = this.onGridReady;
    return (
      <div>
        <div style={{ marginTop: 30, width: widthVal }} className="ag-fresh">
          <AgGridReact
            // properties
            columnDefs={gridColDefsFactorTable}
            rowData={gridRowDataFactorTable}
            // events
            onGridReady={onGridReady}
            domLayout={"autoHeight"}
            enableSorting
          />
        </div>
      </div>
    );
  }
}

export default view(CentroidTable);
