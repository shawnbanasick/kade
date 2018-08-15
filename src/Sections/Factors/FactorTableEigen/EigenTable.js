import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { AgGridReact } from "ag-grid-react";
import store from "../../store";

// let containerStyle = {
//   marginTop: 30,
//   height: 200,
//   width: 862
// };

class EigenTable extends Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  // this.gridApi.sizeColumnsToFit();
  };

  render() {
    let numFacsForTableWidth = store.getState("numFacsForTableWidth");
    let widthVal = 282 + 80 * numFacsForTableWidth;
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal = widthVal + "px";

    let gridColDefsFacTableEigen = store.getState("gridColDefsFacTableEigen");
    let gridRowDataFacTableEigen = store.getState("gridRowDataFacTableEigen");

    return (
      <div>
        <div style={ { marginTop: 30, height: 200, width: widthVal } } className="ag-fresh">
          <AgGridReact columnDefs={ gridColDefsFacTableEigen } rowData={ gridRowDataFacTableEigen } onGridReady={ this.onGridReady.bind(this) } domLayout={ "autoHeight" } enableSorting={ true }
          />
        </div>
      </div>
      );
  }
}

export default easyComp(EigenTable);
