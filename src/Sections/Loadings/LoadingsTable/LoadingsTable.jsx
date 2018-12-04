import styled from "styled-components";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { AgGridReact } from "ag-grid-react";
import { view, store } from "react-easy-state";
import { ToastContainer, toast, Slide } from "react-toastify";
import state from "../../../store";
import SigLevelDropdown from "./SigLevelDropdown";
import InvertFactorButton from "./InvertFactorButton";
// import loadingsTableDataPrep from "./loadingsTableDataPrep";
import autoFlagFactors from "../loadingsLogic/autoFlagFactors";
import SplitBipolarFactorModal from "./SplitBipolarFactorModal";
import MajorityCommonVarianceCheckbox from "./MajorityCommonVarianceCheckbox";

const localStore = store({
  numQsorts: 0,
  numFacsForTableWidth: 0,
  sendDataToOutputButtonColor: "#d6dbe0"
});

// notification of table data sent to output
function notify() {
  toast.success("Data sent to Output", { autoClose: 1500 });
  state.setState({
    notifyDataSentToOutputSuccess: false,
    isLoadingsButtonGreen: true
  });
}

// helper function for filtering btnId when table loads => output buttons
const filterArray = item => {
  let shortened = item;
  shortened = shortened.substring(0, 6);
  if (shortened === "factor") {
    return item;
  }
  return null;
};

function getWidth(numFacsForTableWidth) {
  // + 10 to prevent scroll
  let tableWidth = 290 + 15 + 145 * numFacsForTableWidth;
  // let x = window.innerWidth - 50 - 152;
  let windowWidth = window.innerWidth - 202;

  if (windowWidth < tableWidth) {
    windowWidth += "px";
    return windowWidth;
  }

  tableWidth += "px";
  return tableWidth;
}

function getHeight(numQsorts) {
  let heightVal1 = 40 + 25 * numQsorts;
  let heightVal2 = window.innerHeight - 370;
  if (heightVal1 < heightVal2) {
    heightVal1 += "px";
    return heightVal1;
  }
  heightVal2 += "px";
  return heightVal2;
}

function resetWidthAndHeight() {
  // this.gridApi.setGridAutoHeight(false);
  const table = document.querySelector("#loadingsTableContainer");
  if (table !== null) {
    table.style.width = getWidth(localStore.numFacsForTableWidth);
    table.style.height = getHeight(localStore.numQsorts);
  }
}

window.addEventListener("resize", () => {
  resetWidthAndHeight();
});

/*
  Component start
*/

class LoadingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowClassRules: {}
    };
    this.onGridReady = this.onGridReady.bind(this);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  }

  generateOutput() {
    // grab current table data
    const count = this.gridApi.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }

    // console.log('current loadings ' + JSON.stringify(currentLoadingsTable));

    // initialize output select buttons highlighting to false
    const btnId = state.getState("outputButtonsArray");
    const tempObj2 = {};
    for (let i = 0; i < btnId.length; i++) {
      tempObj2[`highlightfactor${btnId[i]}`] = false;
    }
    tempObj2.currentLoadingsTable = currentLoadingsTable;
    tempObj2.userSelectedFactors = [];
    tempObj2.showOutputFactorSelection = true;
    tempObj2.showStandardErrorsDifferences = false;
    tempObj2.showFactorCharacteristicsTable = false;
    tempObj2.showDownloadOutputButtons = false;
    tempObj2.showFactorCorrelationsTable = false;
    tempObj2.displayFactorVisualizations = false;
    tempObj2.shouldDisplayFactorVizOptions = false;
    tempObj2.outputFactorSelectButtonsDisabled = false;
    tempObj2.notifyDataSentToOutputSuccess = true;
    // remove warning for no data in output section
    tempObj2.showTableDataNotSentWarning = false;
    // reset cache of factor viz data
    tempObj2.outputForDataViz2 = [];
    tempObj2.sendDataToOutputButtonColor = "rgba(144, 238, 144, 0.6)";

    state.setState(tempObj2);
    notify();
  }

  doSplitFactor() {
    // grab current table data (including user-added flags)
    const count = this.gridApi.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }
    state.setState({
      currentLoadingsTable,
      showSplitFactorModal: true
    });
  }

  highlightRows(highlightType) {
    const currentLoadingsTable2 = [];
    const count = this.gridApi.getDisplayedRowCount();
    for (let i = 0; i < count; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      const holder = rowNode.data.highlightingClass;
      const holder2 = holder.slice(0, 2);
      const holder3 = `${holder2}${highlightType}`;
      rowNode.data.highlightingClass = holder3;
      currentLoadingsTable2.push(rowNode.data);
    }
    this.gridApi.redrawRows(currentLoadingsTable2);
    state.setState({
      gridRowDataLoadingsTable: currentLoadingsTable2,
      highlighting: highlightType
    });
  }

  render() {
    const gridColDefsLoadingsTable = state.getState("gridColDefsLoadingsTable");
    const gridRowDataLoadingsTable = state.getState("gridRowDataLoadingsTable");

    localStore.gridColDefsLoadingsTable = gridColDefsLoadingsTable;
    localStore.gridRowDataLoadingsTable = gridRowDataLoadingsTable;

    const isLoadingAutoflag = state.getState("isLoadingAutoflag");
    const isLoadingGrayHighlighting = state.getState(
      "isLoadingGrayHighlighting"
    );
    const isLoadingColorsHighlighting = state.getState(
      "isLoadingColorsHighlighting"
    );
    const isLoadingNoHighlighting = state.getState("isLoadingNoHighlighting");
    const numQsorts = state.getState("numQsorts");
    localStore.numQsorts = numQsorts;

    // todo - create output buttons array here to stay in sync, but performance check
    const outputButtonsArray2 = gridColDefsLoadingsTable.map(
      item => item.field
    );
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray = outputButtonsArray3.map(item => item.slice(6));

    state.setState({ outputButtonsArray });

    let numFacsForTableWidth = state.getState("numFactorsKeptForRot");

    // increase height when bipolar split present
    const bipolarSplitCount = state.getState("bipolarSplitCount");

    const isDisabled = state.getState("bipolarDisabled");

    const sendDataToOutputButtonColor = state.getState(
      "sendDataToOutputButtonColor"
    );

    // increase width if bipolar present
    if (bipolarSplitCount > 0) {
      numFacsForTableWidth += bipolarSplitCount;
    }
    localStore.numFacsForTableWidth = numFacsForTableWidth;
    localStore.sendDataToOutputButtonColor = sendDataToOutputButtonColor;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <div style={{ display: "flex", marginTop: 25, paddingBottom: "4px" }}>
          <div style={{ width: 300 }}>
            <span style={{ width: "100%" }}>Row Highlighting:</span>
            <StyledWrapper style={{ width: "100%" }}>
              <Button
                id="noHighlightingButton"
                className="wrapper1"
                loading={isLoadingNoHighlighting}
                disabled={isDisabled}
                onClick={() => this.highlightRows("none")}
              >
                None
              </Button>
              <Button
                id="colorsHighlightingButton"
                className="wrapper1"
                loading={isLoadingColorsHighlighting}
                disabled={isDisabled}
                onClick={() => this.highlightRows("colors")}
              >
                Colors
              </Button>
              <Button
                id="graysHighlightingButton"
                className="wrapper1"
                onClick={() => this.highlightRows("grays")}
                disabled={isDisabled}
                loading={isLoadingGrayHighlighting}
                style={{ marginRight: "40px" }}
              >
                Gray
              </Button>
            </StyledWrapper>
          </div>
          <div style={{ width: 700 }}>
            <StyledWrapper style={{ width: "100%" }}>
              <span style={{ marginRight: 25 }}>Flagging:</span>
              {/* <Button>All</Button>
            <Button>None</Button> */}
              <Button
                id="autoflagButton"
                className="wrapper1"
                loading={isLoadingAutoflag}
                onClick={autoFlagFactors}
                disabled={isDisabled}
              >
                Auto-Flag
              </Button>
              <span style={{ marginLeft: 5, marginRight: 10 }}>at</span>
              <SigLevelDropdown style={{ marginLeft: 5 }} />
            </StyledWrapper>
            <MajorityCommonVarianceCheckbox />
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "normal", marginTop: 15, textAlign: "left" }}>
            Default sort is by factor group (FG - highest loading factor). Click
            the column headers to re-sort.
          </p>
          <div
            id="loadingsTableContainer"
            style={{
              marginTop: 5,
              height: getHeight(numQsorts),
              width: getWidth(numFacsForTableWidth),
              marginBottom: 15
            }}
            className="ag-theme-fresh"
          >
            <AgGridReact
              enableSorting
              id="loadingsTable"
              columnDefs={localStore.gridColDefsLoadingsTable}
              rowData={localStore.gridRowDataLoadingsTable}
              getRowClass={params => params.data.highlightingClass}
              onGridReady={this.onGridReady}
              gridAutoHeight={false}
            />
          </div>
          <StyledWrapper>
            <InvertFactorButton />
            <Button
              id="splitFactorsButton"
              className="wrapper1"
              style={{ marginRight: "250px" }} // loading={isLoadingFactorsKept}
              onClick={this.doSplitFactor.bind(this)}
            >
              Split Bipolar Factor
            </Button>
          </StyledWrapper>
        </div>
        <StyledWrapperOutput
          buttonColor={localStore.sendDataToOutputButtonColor}
          id="generateOutputButton"
          className="wrapper1"
          style={{ marginTop: "50px" }}
          onClick={this.generateOutput.bind(this)}
        >
          Send Table Data to Output
        </StyledWrapperOutput>
        <SplitBipolarFactorModal />
      </div>
    );
  }
}

export default view(LoadingsTable);

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }
`;

//
const StyledWrapperOutput = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 40px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
/*
  .wrapper1 {
    background-color: ${props => props.buttonColor || "#d6dbe0"};

    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      background-color: lightgreen;
    }
  }
*/

/*

99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

*/
