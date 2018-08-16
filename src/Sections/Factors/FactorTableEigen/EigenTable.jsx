import React, { Component } from "react";
import { view } from "react-easy-state";
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
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal += "px";

    const gridColDefsFacTableEigen = state.getState("gridColDefsFacTableEigen");
    const gridRowDataFacTableEigen = state.getState("gridRowDataFacTableEigen");

    return (
      <div>
        <div
          style={{ marginTop: 30, height: 200, width: widthVal }}
          className="ag-fresh"
        >
          <AgGridReact
            columnDefs={gridColDefsFacTableEigen}
            rowData={gridRowDataFacTableEigen}
            onGridReady={this.onGridReady.bind(this)}
            domLayout={"autoHeight"}
            enableSorting
          />
        </div>
      </div>
    );
  }
}

export default view(EigenTable);
