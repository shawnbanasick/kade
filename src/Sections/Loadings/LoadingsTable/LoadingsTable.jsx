import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { AgGridReact } from "ag-grid-react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../../store";
import autoFlagFactors from "../loadingsLogic/autoFlagFactors";
import InvertFactorButton from "./InvertFactorButton";
import SplitBipolarFactorModal from "./SplitBipolarFactorModal";
import loadingsTableDataPrep from "./loadingsTableDataPrep";
import SigLevelDropdown from "./SigLevelDropdown";
import MajorityCommonVarianceCheckbox from "./MajorityCommonVarianceCheckbox";

const localStore = store({ numQsorts: 0, numFacsForTableWidth: 0 });

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
  let widthVal = 202 + 110 * numFacsForTableWidth;
  // let x = window.innerWidth - 50 - 152;
  let x = window.innerWidth - 202;

  if (x < widthVal) {
    x += "px";

    return x;
  }
  widthVal += "px";

  return widthVal;
}

function getHeight(numQsorts) {
  let heightVal = 40 + 25 * numQsorts;
  let y = window.innerHeight - 390;
  if (y < heightVal) {
    y += "px";
    return y;
  }
  heightVal += "px";
  return heightVal;
}

function resetWidthAndHeight() {
  // this.gridApi.setGridAutoHeight(false);
  const table = document.querySelector("#loadingsTableContainer");
  if (table !== null) {
    table.style.height = getHeight(localStore.numQsorts);
    table.style.width = getWidth(localStore.numFacsForTableWidth);
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
    // reset cache of factor viz data
    tempObj2.outputForDataViz2 = [];

    state.setState(tempObj2);
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

  highlightRowsWithGrays() {
    state.setState({ isLoadingGrayHighlighting: true });
    setTimeout(() => {
      state.setState({ highlighting: "grays" });
      const numFactors = state.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  highlightRowsWithColors() {
    state.setState({ isLoadingColorsHighlighting: true });
    setTimeout(() => {
      state.setState({ highlighting: "colors" });
      const numFactors = state.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  noRowHighlighting() {
    state.setState({ isLoadingNoHighlighting: true });
    setTimeout(() => {
      state.setState({ highlighting: "none" });
      const numFactors = state.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  render() {
    const { onGridReady } = this;

    const gridColDefsLoadingsTable = state.getState("gridColDefsLoadingsTable");
    const gridRowDataLoadingsTable = state.getState("gridRowDataLoadingsTable");
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
    // let height;

    // todo - create output buttons array here to stay in sync, but performance check
    const outputButtonsArray2 = gridColDefsLoadingsTable.map(
      item => item.field
    );
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray = outputButtonsArray3.map(item => item.slice(6));
    state.setState({ outputButtonsArray });

    // increase height for cases when scroll bar is visible
    // if (gridColDefsLoadingsTable.length > 21) {
    //   height = numQsorts * 25 + 50 || 200;
    // } else {
    //   height = numQsorts * 25 + 40 || 200;
    // }

    let numFacsForTableWidth = state.getState("numFactorsKeptForRot");

    // increase height when bipolar split present
    const bipolarSplitCount = state.getState("bipolarSplitCount");

    const isDisabled = state.getState("bipolarDisabled");

    // increase width if bipolar present
    if (bipolarSplitCount > 0) {
      numFacsForTableWidth += bipolarSplitCount;
    }
    localStore.numFacsForTableWidth = numFacsForTableWidth;

    // let widthVal = 252 + 110 * numFacsForTableWidth;
    // if (widthVal > window.innerWidth - 100) {
    //   widthVal = window.innerWidth - 100;
    // }
    // widthVal += "px";

    // const containerStyle = {
    //   marginTop: 5,
    //   height: getHeight(numQsorts),
    //   width: getWidth(numFacsForTableWidth),
    //   marginBottom: 15
    // };

    return (
      <div>
        <div style={{ display: "flex", marginTop: 25, paddingBottom: "4px" }}>
          <div style={{ width: 300 }}>
            <span style={{ width: "100%" }}>Row Highlighting:</span>
            <StyledWrapper style={{ width: "100%" }}>
              <Button
                id="noHighlightingButton"
                className="wrapper1"
                loading={isLoadingNoHighlighting}
                disabled={isDisabled}
                onClick={this.noRowHighlighting}
              >
                None
              </Button>
              <Button
                id="colorsHighlightingButton"
                className="wrapper1"
                loading={isLoadingColorsHighlighting}
                disabled={isDisabled}
                onClick={this.highlightRowsWithColors}
              >
                Colors
              </Button>
              <Button
                id="graysHighlightingButton"
                className="wrapper1"
                onClick={this.highlightRowsWithGrays}
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
              id="myGrid"
              columnDefs={gridColDefsLoadingsTable}
              rowData={gridRowDataLoadingsTable}
              getRowClass={params => params.data.highlightingClass}
              onGridReady={this.onGridReady.bind(this)}
            />
          </div>
          <StyledWrapper>
            <InvertFactorButton />
            <Button
              id="splitFactorsButton"
              className="wrapper1"
              style={{ marginRight: "250px" }} // loading={isLoadingFactorsKept}
              onClick={this.doSplitFactor}
            >
              Split Bipolar Factor
            </Button>
          </StyledWrapper>
        </div>
        <StyledWrapper>
          <Button
            id="generateOutputButton"
            className="instagram wrapper1"
            style={{ marginTop: "50px" }}
            onClick={this.generateOutput.bind(this)}
          >
            Send Table Data to Output
          </Button>
        </StyledWrapper>
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

/*

99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

*/
