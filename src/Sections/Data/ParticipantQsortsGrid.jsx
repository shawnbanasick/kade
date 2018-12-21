import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import state from "../../store";
// import calculateCorrelations from "../correlationsLogic/calcCorrelations";

const localStore = store({
  numQsorts: 0
});

function getWidth(numStatements) {
  let widthVal = 230 + 65 * numStatements;
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
  const numQsorts = localStore.numQsorts;
  const numStatements = localStore.numStatements;
  const table = document.querySelector("#participantQsortData");
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numStatements);
  }
}

function generateGridColDefs(props) {
  if (props.data.length === undefined) {
    return;
  }
  const gridColDefsQsorts = [
    {
      headerName: "Num",
      field: "resNum",
      pinned: true,
      editable: false,
      width: 80,
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      headerName: "Participant",
      field: "respondent",
      width: 150,
      pinned: true,
      editable: false,
      cellStyle: {
        textAlign: "center"
      }
    }
  ];
  for (let i = 0; i < props.data[0].rawSort.length; i += 1) {
    const tempObj = {};
    tempObj.headerName = `S${i + 1}`;
    tempObj.field = `s${i + 1}`;
    tempObj.width = 65;
    tempObj.pinned = false;
    tempObj.editable = false;
    tempObj.cellStyle = {
      textAlign: "right"
    };
    gridColDefsQsorts.push(tempObj);
  }
  localStore.gridColDefsQsorts = gridColDefsQsorts;
}

function generateGridRowData(props) {
  if (props.data.length === undefined) {
    return;
  }
  const gridRowDataQsorts = [];
  for (let i = 0; i < props.data.length; i += 1) {
    const tempObj = {};
    tempObj.resNum = i + 1;
    tempObj.respondent = props.data[i].name;
    for (let j = 0; j < props.data[i].rawSort.length; j += 1) {
      tempObj[`s${j + 1}`] = props.data[i].rawSort[j];
    }
    gridRowDataQsorts.push(tempObj);
  }
  localStore.gridRowDataQsorts = gridRowDataQsorts;
}

class ParticipantQsortsGrid extends Component {
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
    let statements;
    let numQsorts;
    if (this.props) {
      generateGridColDefs(this.props);
      generateGridRowData(this.props);
      numQsorts = state.getState("numQsorts");
      statements = state.getState("statements");
      localStore.numQsorts = numQsorts;
      localStore.numStatements = statements.length;
    }

    const {onGridReady} = this;

    return (
      <TableHolder>
        <div id="participantQsortData" style={ { width: getWidth(statements.length), height: getHeight(numQsorts) } } className="ag-theme-fresh">
          <AgGridReact columnDefs={ localStore.gridColDefsQsorts } rowData={ localStore.gridRowDataQsorts } onGridReady={ onGridReady } enableSorting />
        </div>
      </TableHolder>
      );
  }
}

export default view(ParticipantQsortsGrid);

const TableHolder = styled.div``;

// const OuterMostContainer = styled.div`
//   height: 78vh;
//   width: ${props => props.width};
// `;
