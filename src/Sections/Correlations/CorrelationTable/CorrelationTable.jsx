import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import state from "../../../store";
// import calculateCorrelations from "../correlationsLogic/calcCorrelations";

const localStore = store({ numQsorts: state.getState("numQsorts") });

function getWidth(numQsorts) {
  let widthVal = 152 + 80 * numQsorts;
  let x = window.innerWidth - 40 - 152;

  if (x < widthVal) {
    x += "px";
    return x;
  }
  widthVal += "px";
  return widthVal;
}

class CorrelationTable extends Component {
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    // params.api.sizeColumnsToFit();
  }

  render() {
    const gridColDefs = state.getState("gridColDefs");
    const gridRowData = state.getState("gridRowData");
    const showCorrelationMatrix = state.getState("showCorrelationMatrix");

    const numQsorts = state.getState("numQsorts");
    const width = getWidth(numQsorts);

    const { onGridReady } = this;

    if (showCorrelationMatrix) {
      return (
        <TableHolder>
          <p style={{ fontWeight: "normal", marginTop: 15, textAlign: "left" }}>
            Click the table headers to re-sort by column (low-to-high,
            high-to-low, original sort).
          </p>
          <OuterMostContainer id="outerMostContainer" width={width}>
            <div id="midContainer" style={{ width: "100%", height: "100%" }}>
              <div id="innerContainer1" className="ag-theme-fresh">
                <div id="innerContainer2">
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
          </OuterMostContainer>
        </TableHolder>
      );
    }
    return null;
  }
}

export default view(CorrelationTable);

const TableHolder = styled.div`
  grid-area: main;
`;

const OuterMostContainer = styled.div`
  height: 78vh;
  width: ${props => props.width};
`;
