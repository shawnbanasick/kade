import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { view } from "react-easy-state";

class RotationTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  }

  render() {
    const rowData = this.props.rowData;
    const colDefs = this.props.colDefs;
    const maxHeight = this.props.maxHeight;

    let heightVal = rowData.length * 28 + 3;

    if (heightVal > maxHeight) {
      heightVal = maxHeight;
    }

    if (heightVal > 800) {
      heightVal = 800;
    }

    const containerStyle = {
      marginTop: 10,
      height: heightVal,
      width: 515
    };

    return (
      <div>
        <p style={{ marginTop: 15, fontWeight: 300, fontSize: 14 }}>
          (Highlighting levels are set by the flagging options in Section 5){" "}
        </p>
        <div style={containerStyle} className="ag-theme-fresh">
          <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            enableSorting
            onGridReady={this.onGridReady.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default view(RotationTable);
