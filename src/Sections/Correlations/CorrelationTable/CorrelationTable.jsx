import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import store from "../../../store";
// import calculateCorrelations from "../correlationsLogic/calcCorrelations";

class CorrelationTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    // params.api.sizeColumnsToFit();
  }

  render() {
    // let numQsorts = store.getState("numQsorts");
    // let widthVal = 152 + 75 * numQsorts;
    // if (widthVal > window.innerWidth - 100) {
    //   widthVal = window.innerWidth - 100;
    // }
    // widthVal = widthVal + "px";
    const gridColDefs = store.getState("gridColDefs");
    const gridRowData = store.getState("gridRowData");
    const showCorrelationMatrix = store.getState("showCorrelationMatrix");

    const { onGridReady } = this;

    if (showCorrelationMatrix) {
      return (
        <TableHolder>
          <p style={{ fontWeight: "normal", marginTop: 15, textAlign: "left" }}>
            Click the table headers to re-sort by column (low-to-high,
            high-to-low, original sort).
          </p>
          <div style={{ height: "70vh", width: "80vw" }}>
            <div className="ag-theme-fresh">
              <div>
                <AgGridReact
                  columnDefs={gridColDefs}
                  rowData={gridRowData}
                  onGridReady={onGridReady}
                  gridAutoHeight
                  enableSorting
                />
              </div>
            </div>
          </div>
        </TableHolder>
      );
    }
    return null;
  }
}

export default view(CorrelationTable);

/*
const Shared = styled.div`
  color: green;
`

// ... then later

const ComponentOne = styled(Shared)`
  /* some non-shared styles */
// `
// const ComponentTwo = styled(Shared)`
/* some non-shared styles */

// className="ag-fresh"

const TableHolder = styled.div`
  grid-area: main;
`;
