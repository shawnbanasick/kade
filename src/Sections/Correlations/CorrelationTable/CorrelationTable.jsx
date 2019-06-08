import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import state from "../../../store";

const localStore = store({
  numQsorts: 0
});

// const widthVal = firstColMaxWidth + 10 + colMaxWidth * numQsorts;

function getWidth(numQsorts) {
  const width1 = state.getState("firstColMaxWidth");
  const width2 = state.getState("colMaxWidth");

  let widthVal = width1 + 10 + width2 * numQsorts;
  let x = window.innerWidth - 40 - 152;

  if (x < widthVal) {
    x += "px";
    return x;
  }
  widthVal += "px";
  return widthVal;
}

function getHeight(numQsorts) {
  let heightVal = 40 + 25 * numQsorts;
  let y = window.innerHeight - 120 - 100;
  if (y < heightVal) {
    y += "px";
    return y;
  }
  heightVal += "px";
  return heightVal;
}

function resetWidthAndHeight() {
  // this.gridApi.setGridAutoHeight(false);
  const numQsorts = localStore.numQsorts;
  const table = document.querySelector("#innerContainerCorrelations");
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numQsorts);
  }
}

class CorrelationTable extends Component {
  componentDidMount() {
    window.addEventListener("resize", () => {
      resetWidthAndHeight();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      resetWidthAndHeight();
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
    // params.api.sizeColumnsToFit();
  }

  render() {
    const gridColDefs = state.getState("gridColDefs");
    const gridRowData = state.getState("gridRowData");
    const numQsorts = state.getState("numQsorts");
    localStore.numQsorts = numQsorts;

    const { onGridReady } = this;

    return (
      <TableHolder>
        <p style={{ fontWeight: "normal", marginTop: 15, textAlign: "left" }}>
          Click the table headers to re-sort by column (low-to-high,
          high-to-low, original sort).
        </p>
        <div
          id="innerContainerCorrelations"
          style={{
            width: getWidth(numQsorts),
            height: getHeight(numQsorts)
          }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            columnDefs={gridColDefs}
            rowData={gridRowData}
            onGridReady={onGridReady}
            enableSorting
          />
        </div>
      </TableHolder>
    );
  }
}

export default view(CorrelationTable);

const TableHolder = styled.div``;

// const OuterMostContainer = styled.div`
//   height: 78vh;
//   width: ${props => props.width};
// `;
