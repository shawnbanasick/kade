import styled from "styled-components";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { AgGridReact } from "ag-grid-react";
import { view, store } from "react-easy-state";
import { ToastContainer, toast, Zoom } from "react-toastify";
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
  toast.success("Data sent to Output", {
    autoClose: 1500
  });
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
  let windowWidth = window.innerWidth - 205;

  if (windowWidth < tableWidth) {
    windowWidth += "px";
    return windowWidth;
  }

  tableWidth += "px";
  return tableWidth;
}

function getHeight(numQsorts) {
  let heightVal1 = 40 + 25 * numQsorts;
  let heightVal2 = window.innerHeight - 270;
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

function sendLocalStoreToState() {
  state.setState({
    gridRowDataLoadingsTable: localStore.temp_gridRowDataLoadingsTable
  });
}



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
    this.updateTableLocalState = this.updateTableLocalState.bind(this);
    this.generateOutput = this.generateOutput.bind(this);
    this.doInvertFactor = this.doInvertFactor.bind(this);
    this.doSplitFactor = this.doSplitFactor.bind(this);
    this.flagAllQsorts = this.flagAllQsorts.bind(this);
    this.clearAllCheckboxes = this.clearAllCheckboxes.bind(this);
  }

  componentWillUnmount() {
    sendLocalStoreToState();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  // this.gridApi.sizeColumnsToFit();
  }


  grabTableLocalState() {
    // grab current table data (including user-added flags)
    const count = this.gridApi.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }
    return currentLoadingsTable;
  }


  updateTableLocalState() {
    const currentLoadingsTable = this.grabTableLocalState();
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
  }

  generateOutput() {
    // grab current table data
    const currentLoadingsTable = this.grabTableLocalState();

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
    const currentLoadingsTable = this.grabTableLocalState();
    state.setState({
      currentLoadingsTable,
      showSplitFactorModal: true
    });
  }

  doInvertFactor() {
    const currentLoadingsTable = this.grabTableLocalState();
    state.setState({
      currentLoadingsTable,
      showInvertFactorModal: true
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

  flagAllQsorts() {
    const currentLoadingsTable = this.grabTableLocalState();
    const numFacsForTableWidth = state.getState("numFactorsKeptForRot");
    const factorGroupArray = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"]
    for (let i = 0; i < currentLoadingsTable.length; i++) {
      const factorGroup = currentLoadingsTable[i].factorGroup.slice(0, 2);
      const factorGroupIndexValue = factorGroupArray.indexOf(factorGroup);
      for (let k = 0; k < numFacsForTableWidth; k++) {
        const checkboxIndex = `check${ k + 1}`;
        if (factorGroupIndexValue === (k)) {
          currentLoadingsTable[i][checkboxIndex] = true;
        } else {
          currentLoadingsTable[i][checkboxIndex] = false;
        }
      }
    }
    this.gridApi.redrawRows(currentLoadingsTable);
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    state.setState({
      gridRowDataLoadingsTable: currentLoadingsTable,
    });
  }

  clearAllCheckboxes() {
    const currentLoadingsTable = this.grabTableLocalState();
    const numFacsForTableWidth = state.getState("numFactorsKeptForRot");
    for (let i = 0; i < currentLoadingsTable.length; i++) {
      for (let k = 0; k < numFacsForTableWidth; k++) {
        const index = `check${  k + 1}`;
        currentLoadingsTable[i][index] = false;
      }
    }
    this.gridApi.redrawRows(currentLoadingsTable);
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    state.setState({
      gridRowDataLoadingsTable: currentLoadingsTable,
    });
  }


  render() {
    // pull headers and data from states
    const gridColDefsLoadingsTable = state.getState("gridColDefsLoadingsTable");
    const gridRowDataLoadingsTable = state.getState("gridRowDataLoadingsTable");

    // push headers and data to preserve local state for remount after unmount
    localStore.gridColDefsLoadingsTable = gridColDefsLoadingsTable;
    localStore.gridRowDataLoadingsTable = gridRowDataLoadingsTable;

    // push data on initial render so if user unmounts without doing anything, will still remount properly
    const isLoadingsTableInitialRender = state.getState("isLoadingsTableInitialRender");
    if (isLoadingsTableInitialRender) {
      localStore.temp_gridColDefsLoadingsTable = gridColDefsLoadingsTable;
      localStore.temp_gridRowDataLoadingsTable = gridRowDataLoadingsTable;
      state.setState({
        isLoadingsTableInitialRender: false
      });
    }

    // get highlighting options
    const isLoadingAutoflag = state.getState("isLoadingAutoflag");
    const isLoadingGrayHighlighting = state.getState(
      "isLoadingGrayHighlighting"
    );
    const isLoadingColorsHighlighting = state.getState(
      "isLoadingColorsHighlighting"
    );
    const isLoadingNoHighlighting = state.getState("isLoadingNoHighlighting");

    // pull number Q sorts for table height calcs
    const numQsorts = state.getState("numQsorts");
    localStore.numQsorts = numQsorts;

    // todo - create output buttons array here to stay in sync, but performance check
    const outputButtonsArray2 = gridColDefsLoadingsTable.map(
      item => item.field
    );
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray = outputButtonsArray3.map(item => item.slice(6));
    state.setState({
      outputButtonsArray
    });

    // pull number factors to calc responsive table width
    let numFacsForTableWidth = state.getState("numFactorsKeptForRot");

    // increase height / width when bipolar split present
    const bipolarSplitCount = state.getState("bipolarSplitCount");

    // communication with user - has data been sent to output section?
    const sendDataToOutputButtonColor = state.getState(
      "sendDataToOutputButtonColor"
    );

    // disable buttons after bipolar split
    const isDisabled = state.getState("bipolarDisabled");

    // increase width if bipolar present
    if (bipolarSplitCount > 0) {
      numFacsForTableWidth += bipolarSplitCount;
    }
    localStore.numFacsForTableWidth = numFacsForTableWidth;
    localStore.sendDataToOutputButtonColor = sendDataToOutputButtonColor;



    return (
      <div>
        <LoadingsContainerDiv>
          <ToastContainer transition={ Zoom } />
          <HighlightingAndFlaggingTextBar>
            <span style={ { marginRight: 255 } }>Row Highlighting:</span>
            <span>Flagging:</span>
          </HighlightingAndFlaggingTextBar>
          <HighlightingAndFlaggingButtonBar>
            <StyledWrapper>
              <Button id="noHighlightingButton" className="wrapper1" loading={ isLoadingNoHighlighting } disabled={ isDisabled } onClick={ () => this.highlightRows("none") }>
                None
              </Button>
              <Button id="colorsHighlightingButton" className="wrapper1" loading={ isLoadingColorsHighlighting } disabled={ isDisabled } onClick={ () => this.highlightRows("colors") }>
                Colors
              </Button>
              <Button id="graysHighlightingButton" className="wrapper1" onClick={ () => this.highlightRows("grays") } disabled={ isDisabled } loading={ isLoadingGrayHighlighting } style={ { marginRight: 150 } }>
                Gray
              </Button>
              <Button id="autoflagButton" className="wrapper1" loading={ isLoadingAutoflag } onClick={ autoFlagFactors } disabled={ isDisabled }>
                Auto-Flag
              </Button>
              <span style={ { marginLeft: 5, marginRight: 10 } }>at</span>
              <SigLevelDropdown style={ { marginLeft: 5 } } />
              <Button className="wrapper1" style={ { marginLeft: "40px" } } disabled={ isDisabled } onClick={ this.flagAllQsorts }>
                All
              </Button>
              <Button className="wrapper1" style={ { marginLeft: "40px" } } disabled={ isDisabled } onClick={ this.clearAllCheckboxes }>
                None
              </Button>
            </StyledWrapper>
          </HighlightingAndFlaggingButtonBar>
          <CommonVarianceCheckboxDiv>
            <MajorityCommonVarianceCheckbox style={ { marginLeft: 300 } } />
          </CommonVarianceCheckboxDiv>
          <div>
            <ColumnSortText>
              Default sort is by factor group (FG - highest loading factor). Click the column headers to re-sort.
            </ColumnSortText>
            <div id="loadingsTableContainer" style={ { marginTop: 2, height: getHeight(numQsorts), width: getWidth(numFacsForTableWidth), marginBottom: 15 } } className="ag-theme-fresh">
              <AgGridReact enableSorting id="loadingsTable" columnDefs={ localStore.gridColDefsLoadingsTable } rowData={ localStore.gridRowDataLoadingsTable } getRowClass={ params => params.data.highlightingClass } onGridReady={ this.onGridReady }
                gridAutoHeight={ false } onCellClicked={ this.updateTableLocalState } />
            </div>
          </div>
          <ButtonBarBottom>
            <StyledWrapperOutput buttonColor={ localStore.sendDataToOutputButtonColor } id="generateOutputButton" className="wrapper1" onClick={ this.generateOutput }>
              Send Table Data to Output
            </StyledWrapperOutput>
            <StyledWrapper>
              <Button id="invertFactorsButton" className="wrapper1" disabled={ isDisabled } onClick={ this.doInvertFactor }>
                Invert Factor
              </Button>
            </StyledWrapper>
            <StyledWrapper>
              <Button id="splitFactorsButton" className="wrapper1" onClick={ this.doSplitFactor }>
                Split Bipolar Factor
              </Button>
            </StyledWrapper>
          </ButtonBarBottom>
          <SplitBipolarFactorModal />
          <InvertFactorButton />
        </LoadingsContainerDiv>
      </div>
      );
  }
}

//  {/* data={localStore.temp_gridRowDataLoadingsTable} */}

export default view(LoadingsTable);

const ColumnSortText = styled.p`
  font-size: 12px;
  font-weight: normal;
  margin-top: 15px;
  text-align: left;
  width: 900px;
`;

const LoadingsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const HighlightingAndFlaggingTextBar = styled.div`
  display: flex;
  width: 900px;
  height: 30px;
`;

const HighlightingAndFlaggingButtonBar = styled.div`
  width: 900px;
`;

const CommonVarianceCheckboxDiv = styled.div`
  width: 900px;
  margin-top: 3px;
  margin-bottom: 25px;
`;

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;
    user-select: none

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
  /* display: grid;
  align-items: center;
  justify-items: center; 
  
  background-color: #abafb3;
  */
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
  user-select: none;

  &:hover {
    
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;

const ButtonBarBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 900px;
  height: 60px;
`;

/*
99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28
*/
