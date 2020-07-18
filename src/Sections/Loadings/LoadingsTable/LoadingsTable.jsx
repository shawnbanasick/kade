import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { view, store } from "react-easy-state";
import { ToastContainer, toast, Zoom } from "react-toastify";
import SigLevelDropdown from "./SigLevelDropdown";
import InvertFactorButton from "./InvertFactorButton";
import autoFlagFactors from "../loadingsLogic/autoFlagFactors";
import SplitBipolarFactorModal from "./SplitBipolarFactorModal";
import MajorityCommonVarianceCheckbox from "./MajorityCommonVarianceCheckbox";
import loadingState from "../../GlobalState/loadingState";
import appState from "../../GlobalState/appState";
import coreState from "../../GlobalState/coreState";
import rotationState from "../../GlobalState/rotationState";
import outputState from "../../GlobalState/outputState";
import GeneralButton from "../../../Utils/GeneralButton";
import generateOutputFromLoadingTable from "./generateOutputFromLoadingTable";
import i18n from "i18next";

const clone = require("rfdc")();

const localStore = store({
  numQsorts: 0,
  numFacsForTableWidth: 0,
  sendDataToOutputButtonColor: "#d6dbe0",
  autoflagButtonColor: "#d6dbe0"
});

// inline styles
const highlightingAndFlaggingStyle = { marginRight: 255 };
const grayHighlightButtonStyle = { marginRight: 150 };
const autoFlagButtonStyle = { marginLeft: 10 };
const atStyle = { marginLeft: 5, marginRight: 10, marginTop: 15 };
const allButtonStyle = { marginLeft: "40px", width: 60 };
const noneButtonStyle = { marginLeft: "40px" };

// notification of table data sent to output
function notify() {
  toast.success(i18n.t("Data sent to Output"), {
    autoClose: 1500
  });
  loadingState.notifyDataSentToOutputSuccess = false;
  appState.isLoadingsButtonGreen = true;
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

// set table width and height
function getWidth(numFacsForTableWidth) {
  let tableWidth = 310 + 15 + 125 * numFacsForTableWidth;
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
  const table = document.querySelector("#loadingsTableContainer");
  if (table !== null) {
    table.style.width = getWidth(localStore.numFacsForTableWidth);
    table.style.height = getHeight(localStore.numQsorts);
  }
}

window.addEventListener("resize", () => {
  resetWidthAndHeight();
});

/* ********************************************
  Component start
 **********************************************  */

const LoadingsTable = props => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        resetWidthAndHeight();
      });
    };
  }, []);

  const gridApi = useRef();

  const onGridReady = params => {
    gridApi.current = params.api;
    // gridApi.current.sizeColumnsToFit();
  };

  const grabTableLocalState = () => {
    // grab current table data (including user-added flags)
    const count = gridApi.current.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i += 1) {
      const rowNode = gridApi.current.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }
    return currentLoadingsTable;
  };

  // todo - fix this hack - button color shifted to different listener
  const updateTableLocalState = () => {
    const currentLoadingsTable = grabTableLocalState();
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    outputState.showOutputFactorSelection = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.displayFactorVisualizations = false;
  };

  const changeOutputButtonColor = () => {
    loadingState.sendDataToOutputButtonColor = "orange";
  };

  const generateOutput = () => {
    // grab current table data
    const currentLoadingsTable = grabTableLocalState();
    // send current to local state
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    generateOutputFromLoadingTable(currentLoadingsTable);
    notify();
  };

  const doSplitFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    loadingState.currentLoadingsTable = currentLoadingsTable;
    loadingState.showSplitFactorModal = true;
  };

  const doInvertFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    loadingState.currentLoadingsTable = currentLoadingsTable;
    loadingState.showInvertFactorModal = true;
  };

  const highlightRows = highlightType => {
    const currentLoadingsTable2 = [];
    const count = gridApi.current.getDisplayedRowCount();
    for (let i = 0; i < count; i += 1) {
      const rowNode = gridApi.current.getDisplayedRowAtIndex(i);
      const holder = rowNode.data.highlightingClass;
      const holder2 = holder.slice(0, 2);
      const holder3 = `${holder2}${highlightType}`;
      rowNode.data.highlightingClass = holder3;
      currentLoadingsTable2.push(rowNode.data);
    }
    gridApi.current.redrawRows(currentLoadingsTable2);
    loadingState.gridRowDataLoadingsTable = currentLoadingsTable2;
    loadingState.highlighting = highlightType;
  };

  const flagAllQsorts = () => {
    const currentLoadingsTable = grabTableLocalState();
    // getState
    const numFacsForTableWidth = rotationState.numFactorsKeptForRot;
    const factorGroupArray = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"];
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      const factorGroup = currentLoadingsTable[i].factorGroup.slice(0, 2);
      const factorGroupIndexValue = factorGroupArray.indexOf(factorGroup);
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const checkboxIndex = `check${k + 1}`;
        if (factorGroupIndexValue === k) {
          currentLoadingsTable[i][checkboxIndex] = true;
        } else {
          currentLoadingsTable[i][checkboxIndex] = false;
        }
      }
    }
    gridApi.current.redrawRows(currentLoadingsTable);
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    loadingState.gridRowDataLoadingsTable = currentLoadingsTable;
    loadingState.sendDataToOutputButtonColor = "orange";
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    const numFacsForTableWidth = rotationState.numFactorsKeptForRot;
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const index = `check${k + 1}`;
        currentLoadingsTable[i][index] = false;
      }
    }
    gridApi.current.redrawRows(currentLoadingsTable);
    localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    loadingState.gridRowDataLoadingsTable = currentLoadingsTable;
    loadingState.sendDataToOutputButtonColor = "#d6dbe0";
  };

  // getState - pull headers and data from states
  const gridColDefsLoadingsTable = clone(loadingState.gridColDefsLoadingsTable);
  const gridRowDataLoadingsTable = clone(loadingState.gridRowDataLoadingsTable);

  // push headers and data to preserve local state for remount after unmount
  localStore.gridColDefsLoadingsTable = gridColDefsLoadingsTable;
  localStore.gridRowDataLoadingsTable = gridRowDataLoadingsTable;

  // getState - push data on initial render so if user unmounts without doing anything, will still remount properly
  const isLoadingsTableInitialRender =
    loadingState.isLoadingsTableInitialRender;
  if (isLoadingsTableInitialRender) {
    localStore.temp_gridColDefsLoadingsTable = gridColDefsLoadingsTable;
    localStore.temp_gridRowDataLoadingsTable = gridRowDataLoadingsTable;
    loadingState.isLoadingsTableInitialRender = false;
  }

  // getState - pull number Q sorts for table height calcs
  const numQsorts = coreState.numQsorts;
  localStore.numQsorts = numQsorts;

  // todo - create output buttons array here to stay in sync, but do performance check
  const outputButtonsArray2 = gridColDefsLoadingsTable.map(item => item.field);
  const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
  outputButtonsArray3.shift();
  const outputButtonsArray = outputButtonsArray3.map(item => item.slice(6));
  // delay to avoid react update error - can't update while rendering
  setTimeout(function() {
    outputState.outputButtonsArray = outputButtonsArray;
  }, 100);

  // pull number factors to calc responsive table width
  let numFacsForTableWidth = Number(rotationState.numFactorsKeptForRot);

  // increase height / width when bipolar split present
  const bipolarSplitCount = Number(loadingState.bipolarSplitCount);

  // communication with user - has data been sent to output section?
  const sendDataToOutputButtonColor = loadingState.sendDataToOutputButtonColor;

  const autoflagButtonColor = loadingState.autoflagButtonColor;

  // disable buttons after bipolar split
  const isDisabled = loadingState.bipolarDisabled;

  // increase width if bipolar present
  if (bipolarSplitCount > 0) {
    numFacsForTableWidth += bipolarSplitCount;
  }

  localStore.numFacsForTableWidth = numFacsForTableWidth;
  localStore.sendDataToOutputButtonColor = sendDataToOutputButtonColor;
  localStore.autoflagButtonColor = autoflagButtonColor;

  const loadingsTableContainerStyle = {
    marginTop: 2,
    height: getHeight(numQsorts),
    width: getWidth(numFacsForTableWidth),
    marginBottom: 15
  };

  return (
    <div>
      <LoadingsContainerDiv>
        <ToastContainer transition={Zoom} />
        <HighlightingAndFlaggingTextBar>
          <span style={highlightingAndFlaggingStyle}>
            {props.childTrans.row}
          </span>
          <span>{props.childTrans.flagging}</span>
        </HighlightingAndFlaggingTextBar>
        <HighlightingAndFlaggingButtonBar>
          <RowColorsContainer>
            <NoHighlightingButton
              id="noHighlightingButton"
              className="wrapper1"
              disabled={isDisabled}
              onClick={() => highlightRows("none")}
            >
              {props.childTrans.none}
            </NoHighlightingButton>
            <ColorHighlightButton
              id="colorsHighlightingButton"
              className="wrapper1"
              disabled={isDisabled}
              onClick={() => highlightRows("colors")}
            >
              {props.childTrans.colors}
            </ColorHighlightButton>
            <GrayHighlightButton
              id="graysHighlightingButton"
              className="wrapper1"
              onClick={() => highlightRows("grays")}
              disabled={isDisabled}
              style={grayHighlightButtonStyle}
            >
              {props.childTrans.gray}
            </GrayHighlightButton>
          </RowColorsContainer>

          <RowColorsContainer>
            <GeneralButton
              buttoncolor={localStore.autoflagButtonColor}
              id="autoflagButton"
              onClick={autoFlagFactors}
              disabled={isDisabled}
              style={autoFlagButtonStyle}
            >
              {props.childTrans.autoflag}
            </GeneralButton>

            <span style={atStyle}>{props.childTrans.at}</span>
            <SigLevelDropdown data={"allData"} />
            <GeneralButton
              style={allButtonStyle}
              disabled={isDisabled}
              onClick={flagAllQsorts}
            >
              {props.childTrans.all}
            </GeneralButton>
            <GeneralButton
              style={noneButtonStyle}
              disabled={isDisabled}
              onClick={clearAllCheckboxes}
            >
              {props.childTrans.none}
            </GeneralButton>
          </RowColorsContainer>
        </HighlightingAndFlaggingButtonBar>
        <CommonVarianceCheckboxDiv>
          <MajorityCommonVarianceCheckbox />
        </CommonVarianceCheckboxDiv>
        <div>
          <ColumnSortText>
            {props.childTrans.default} {props.childTrans.fg}{" "}
            {props.childTrans.click}
          </ColumnSortText>
          <div
            id="loadingsTableContainer"
            style={loadingsTableContainerStyle}
            className="ag-theme-fresh"
          >
            <AgGridReact
              id="loadingsTable"
              ref={gridApi}
              columnDefs={localStore.gridColDefsLoadingsTable}
              rowData={localStore.gridRowDataLoadingsTable}
              getRowClass={params => params.data.highlightingClass}
              onGridReady={onGridReady}
              modules={AllCommunityModules}
              onCellClicked={updateTableLocalState}
              onCellFocused={changeOutputButtonColor}
            />
          </div>
        </div>
        <ButtonBarBottom>
          <DataToOutputButton
            buttonColor={localStore.sendDataToOutputButtonColor}
            id="generateOutputButton"
            onClick={generateOutput}
          >
            {props.childTrans.send}
          </DataToOutputButton>
          <GeneralButton
            id="invertFactorsButton"
            disabled={isDisabled}
            onClick={doInvertFactor}
          >
            {props.childTrans.invert}
          </GeneralButton>
          <GeneralButton id="splitFactorsButton" onClick={doSplitFactor}>
            {props.childTrans.split}
          </GeneralButton>
        </ButtonBarBottom>
        <SplitBipolarFactorModal />
        <InvertFactorButton />
      </LoadingsContainerDiv>
    </div>
  );
};

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
  display: grid;
  grid-template-columns: 410px auto;
  width: 1100px;
  height: 30px;
`;

const HighlightingAndFlaggingButtonBar = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  height: 50px;
  width: 1100px;
`;

const CommonVarianceCheckboxDiv = styled.div`
  width: 900px;
  padding-left: 16px;
  margin-top: 3px;
  margin-bottom: 25px;
`;

const ButtonBarBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 910px;
  height: 50px;
`;

const DataToOutputButton = styled(GeneralButton)`
  background-color: ${props => props.buttonColor};
  transition: background-color 0.3s ease;
`;

const NoHighlightingButton = styled(GeneralButton)`
  min-width: 80px;
`;

const ColorHighlightButton = styled(GeneralButton)`
  min-width: 80px;
`;

const GrayHighlightButton = styled(GeneralButton)`
  min-width: 80px;
`;

const RowColorsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

/*
99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28
*/
