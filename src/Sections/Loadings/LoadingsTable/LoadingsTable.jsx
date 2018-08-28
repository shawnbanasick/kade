import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { AgGridReact } from "ag-grid-react";
import { view } from "react-easy-state";
import store from "../../../store";
import autoFlagFactors from "../loadingsLogic/autoFlagFactors";
import InvertFactorButton from "./InvertFactorButton";
import SplitBipolarFactorModal from "./SplitBipolarFactorModal";
import loadingsTableDataPrep from "./loadingsTableDataPrep";
import SigLevelDropdown from "./SigLevelDropdown";
import MajorityCommonVarianceCheckbox from "./MajorityCommonVarianceCheckbox";

// helper function for filtering btnId when table loads => output buttons
const filterArray = item => {
  let shortened = item;
  shortened = shortened.substring(0, 6);
  if (shortened === "factor") {
    return item;
  }
  return null;
};

class LoadingsTable extends Component {
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
    const btnId = store.getState("outputButtonsArray");
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

    store.setState(tempObj2);
  }

  doSplitFactor() {
    // grab current table data (including user-added flags)
    const count = this.gridApi.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }
    store.setState({
      currentLoadingsTable,
      showSplitFactorModal: true
    });
  }

  highlightRowsWithGrays() {
    store.setState({ isLoadingGrayHighlighting: true });
    setTimeout(() => {
      store.setState({ highlighting: "grays" });
      const numFactors = store.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  highlightRowsWithColors() {
    store.setState({ isLoadingColorsHighlighting: true });
    setTimeout(() => {
      store.setState({ highlighting: "colors" });
      const numFactors = store.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  noRowHighlighting() {
    store.setState({ isLoadingNoHighlighting: true });
    setTimeout(() => {
      store.setState({ highlighting: "none" });
      const numFactors = store.getState("numFactorsKeptForRot");
      loadingsTableDataPrep(numFactors);
    }, 10);
  }

  render() {
    const gridColDefsLoadingsTable = store.getState("gridColDefsLoadingsTable");
    const gridRowDataLoadingsTable = store.getState("gridRowDataLoadingsTable");
    const isLoadingAutoflag = store.getState("isLoadingAutoflag");
    const isLoadingGrayHighlighting = store.getState(
      "isLoadingGrayHighlighting"
    );
    const isLoadingColorsHighlighting = store.getState(
      "isLoadingColorsHighlighting"
    );
    const isLoadingNoHighlighting = store.getState("isLoadingNoHighlighting");
    const numQsorts = store.getState("numQsorts");
    let height;

    // todo - create output buttons array here to stay in sync, but performance check
    const outputButtonsArray2 = gridColDefsLoadingsTable.map(
      item => item.field
    );
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray = outputButtonsArray3.map(item => item.slice(6));
    store.setState({ outputButtonsArray });

    // increase height for cases when scroll bar is visible
    if (gridColDefsLoadingsTable.length > 21) {
      height = numQsorts * 25 + 50 || 200;
    } else {
      height = numQsorts * 25 + 30 || 200;
    }

    // increase height when bipolar split present
    const bipolarSplitCount = store.getState("bipolarSplitCount");

    const isDisabled = store.getState("bipolarDisabled");

    let numFacsForTableWidth = store.getState("numFactorsKeptForRot");

    // increase width if bipolar present
    if (bipolarSplitCount > 0) {
      numFacsForTableWidth += bipolarSplitCount;
    }

    let widthVal = 252 + 110 * numFacsForTableWidth;
    if (widthVal > window.innerWidth - 100) {
      widthVal = window.innerWidth - 100;
    }
    widthVal += "px";

    const containerStyle = {
      marginTop: 5,
      height,
      width: widthVal,
      marginBottom: 15
    };

    return (
      <div>
        <div style={{ display: "flex", marginTop: 25, paddingBottom: "4px" }}>
          <div style={{ width: 300 }}>
            <span style={{ width: "100%" }}>Row Highlighting:</span>
            <div style={{ width: "100%" }}>
              <Button
                id="noHighlightingButton"
                loading={isLoadingNoHighlighting}
                disabled={isDisabled}
                onClick={this.noRowHighlighting}
              >
                None
              </Button>
              <Button
                id="colorsHighlightingButton"
                loading={isLoadingColorsHighlighting}
                disabled={isDisabled}
                onClick={this.highlightRowsWithColors}
              >
                Colors
              </Button>
              <Button
                id="graysHighlightingButton"
                onClick={this.highlightRowsWithGrays}
                disabled={isDisabled}
                loading={isLoadingGrayHighlighting}
                style={{ marginRight: "40px" }}
              >
                Gray
              </Button>
            </div>
          </div>
          <div style={{ width: 700 }}>
            <div style={{ width: "100%" }}>
              <span style={{ marginRight: 25 }}>Flagging:</span>
              {/* <Button>All</Button>
            <Button>None</Button> */}
              <Button
                id="autoflagButton"
                loading={isLoadingAutoflag}
                onClick={autoFlagFactors}
                disabled={isDisabled}
              >
                Auto-Flag
              </Button>
              <span style={{ marginLeft: 5, marginRight: 10 }}>at</span>
              <SigLevelDropdown style={{ marginLeft: 5 }} />
            </div>
            <MajorityCommonVarianceCheckbox />
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "normal", marginTop: 15, textAlign: "left" }}>
            Default sort is by factor group (FG - highest loading factor). Click
            the column headers to re-sort.
          </p>
          <div style={containerStyle} className="ag-theme-fresh">
            <AgGridReact
              enableSorting
              id="myGrid"
              columnDefs={gridColDefsLoadingsTable}
              rowData={gridRowDataLoadingsTable}
              getRowClass={params => params.data.highlightingClass}
              onGridReady={this.onGridReady.bind(this)}
            />
          </div>
          <InvertFactorButton />
          <Button
            id="splitFactorsButton"
            style={{ marginRight: "250px" }} // loading={isLoadingFactorsKept}
            onClick={this.doSplitFactor}
          >
            Split Bipolar Factor
          </Button>
        </div>
        <Button
          id="generateOutputButton"
          style={{ marginTop: "50px" }}
          onClick={this.generateOutput.bind(this)}
        >
          Send Table Data to Output
        </Button>
        <SplitBipolarFactorModal />
      </div>
    );
  }
}

export default view(LoadingsTable);

/*

99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

*/
