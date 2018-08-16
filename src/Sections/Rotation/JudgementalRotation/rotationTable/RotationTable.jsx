import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
// import store from "../../../store";
import { easyComp } from "react-easy-state";

class RotationTable extends Component {
  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  };

  render() {
    let rowData = this.props.rowData;
    let colDefs = this.props.colDefs;

    let heightVal = rowData.length * 28 + 3;
    if (heightVal > 600) {
      heightVal = 600;
    }

    let containerStyle = {
      marginTop: 10,
      height: heightVal,
      width: 515
    };

    return (
      <div>
        <p style={{ marginTop: 15, fontWeight: 300, fontSize: 14 }}>
          (Highlighting levels are set by the flagging options in Section 5){" "}
        </p>
        <div style={containerStyle} className="ag-fresh">
          <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            enableSorting={true}
            onGridReady={this.onGridReady.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default easyComp(RotationTable);
