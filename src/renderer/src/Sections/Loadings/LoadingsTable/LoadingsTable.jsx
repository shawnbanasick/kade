import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import SigLevelDropdown2 from './SigLevelDropdownSelect2';
import InvertFactorButton from './InvertFactorButton';
import autoFlagFactors from '../loadingsLogic/autoFlagFactors';
import SplitBipolarFactorModal from './SplitBipolarFactorModal';
import MajorityCommonVarianceCheckbox from './MajorityCommonVarianceCheckbox';
import GeneralButton from '../../../Utils/GeneralButton';
import generateOutputFromLoadingTable from './generateOutputFromLoadingTable';
import i18n from 'i18next';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import outputState from '../../GlobalState/outputState';
import rotationState from '../../GlobalState/rotationState';
import coreState from '../../GlobalState/coreState';

// inline styles
const highlightingAndFlaggingStyle = { marginRight: 255 };
const grayHighlightButtonStyle = { marginRight: 150 };
const autoFlagButtonStyle = { marginLeft: 10 };
const atStyle = { marginLeft: 5, marginRight: 10, marginTop: 15 };
const allButtonStyle = { marginLeft: '40px', width: 60 };
const noneButtonStyle = { marginLeft: '40px' };

// helper function for filtering btnId when table loads => output buttons
const filterArray = (item) => {
  let shortened = item;
  shortened = shortened.substring(0, 6);
  if (shortened === 'factor') {
    return item;
  }
  return null;
};

// set table width and height
function getWidth(numFacsForTableWidth) {
  let tableWidth = 310 + 15 + 125 * numFacsForTableWidth;
  let windowWidth = window.innerWidth - 205;

  if (windowWidth < tableWidth) {
    windowWidth += 'px';
    return windowWidth;
  }

  tableWidth += 'px';
  return tableWidth;
}

function getHeight(numQsorts) {
  let heightVal1 = 40 + 25 * numQsorts;
  let heightVal2 = window.innerHeight - 270;
  if (heightVal1 < heightVal2) {
    heightVal1 += 'px';
    return heightVal1;
  }
  heightVal2 += 'px';
  return heightVal2;
}

/* ********************************************
  Component start
 **********************************************  */

const LoadingsTable = (props) => {
  const updateNotifyDataSentToOutputSuccess = loadingState(
    (state) => state.updateNotifyDataSentToOutputSuccess
  );
  const updateIsLoadingsButtonGreen = appState((state) => state.updateIsLoadingsButtonGreen);
  const updateShowOutputFactorSelection = outputState(
    (state) => state.updateShowOutputFactorSelection
  );
  const updateShowFactorCorrelationsTable = outputState(
    (state) => state.updateShowFactorCorrelationsTable
  );
  const updateShowStandardErrorsDifferences = outputState(
    (state) => state.updateShowStandardErrorsDifferences
  );
  const updateShowFactorCharacteristicsTable = outputState(
    (state) => state.updateShowFactorCharacteristicsTable
  );
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );
  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );
  const updateDisplayFactorVisualizations = outputState(
    (state) => state.updateDisplayFactorVisualizations
  );
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateCurrentLoadingsTable = loadingState((state) => state.updateCurrentLoadingsTable);
  const updateShowSplitFactorModal = loadingState((state) => state.updateShowSplitFactorModal);
  const updateShowInvertFactorModal = loadingState((state) => state.updateShowInvertFactorModal);
  const updateGridRowDataLoadingsTable = loadingState(
    (state) => state.updateGridRowDataLoadingsTable
  );
  const updateHighlighting = loadingState((state) => state.updateHighlighting);
  const updateSendDataToOutputButtonColor = loadingState(
    (state) => state.updateSendDataToOutputButtonColor
  );
  const updateTempGridColDefsLoadingsTable = loadingState(
    (state) => state.updateTempGridColDefsLoadingsTable
  );
  const updateTempGridRowDataLoadingsTable = loadingState(
    (state) => state.updateTempGridRowDataLoadingsTable
  );
  const updateIsLoadingsTableInitialRender = loadingState(
    (state) => state.updateIsLoadingsTableInitialRender
  );
  const updateOutputButtonsArray = outputState((state) => state.updateOutputButtonsArray);

  let numFacsForTableWidth = Number(rotationState((state) => state.numFactorsKeptForRot));
  const numQsorts = coreState((state) => state.numQsorts);
  const gridColDefsLoadingsTable = loadingState((state) => state.gridColDefsLoadingsTable);
  const gridRowDataLoadingsTable = loadingState((state) => state.gridRowDataLoadingsTable);
  const autoflagButtonColor = loadingState((state) => state.autoflagButtonColor);
  const sendDataToOutputButtonColor = loadingState((state) => state.sendDataToOutputButtonColor);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  function resetWidthAndHeight() {
    const table = document.querySelector('#loadingsTableContainer');
    if (table !== null) {
      table.style.width = getWidth(numFacsForTableWidth);
      table.style.height = getHeight(numQsorts);
    }
  }

  window.addEventListener('resize', () => {
    resetWidthAndHeight();
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      // resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener('resize', () => {
        // resetWidthAndHeight();
      });
    };
  }, []);

  // notification of table data sent to output
  const notify = async () => {
    await updateNotifyDataSentToOutputSuccess(false);
    await updateIsLoadingsButtonGreen(true);
    await toast.success(i18n.t('Data sent to Output'), {
      autoClose: 1500,
    });
  };

  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    // gridApi.current.sizeColumnsToFit();
  };

  // let gridOptions = {
  //   suppressRowHoverHighlight: false,
  //   // turns ON column hover, it's off by default
  //   columnHoverHighlight: true,
  // };

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
  const updateTableLocalState = async () => {
    const currentLoadingsTable = grabTableLocalState();
    await updateTempGridRowDataLoadingsTable(currentLoadingsTable);
    await updateShowOutputFactorSelection(false);
    await updateShowFactorCorrelationsTable(false);
    await updateShowStandardErrorsDifferences(false);
    await updateShowFactorCharacteristicsTable(false);
    await updateShowDownloadOutputButtons(false);
    await updateShouldDisplayFactorVizOptions(false);
    await updateDisplayFactorVisualizations(false);
    await updateShowDocxOptions(false);
  };

  const changeOutputButtonColor = () => {
    updateSendDataToOutputButtonColor('orange');
  };

  const generateOutput = async () => {
    // grab current table data
    const currentLoadingsTable = grabTableLocalState();
    // send current to local state
    await updateTempGridRowDataLoadingsTable(currentLoadingsTable);
    await generateOutputFromLoadingTable(currentLoadingsTable);
    await notify();
  };

  const doSplitFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    updateCurrentLoadingsTable(currentLoadingsTable);
    updateShowSplitFactorModal(true);
  };

  const doInvertFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    updateCurrentLoadingsTable(currentLoadingsTable);
    updateShowInvertFactorModal(true);
  };

  const highlightRows = (highlightType) => {
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
    updateGridRowDataLoadingsTable(currentLoadingsTable2);
    updateHighlighting(highlightType);
  };

  const flagAllQsorts = async () => {
    const currentLoadingsTable = grabTableLocalState();
    const factorGroupArray = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'];
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
    await gridApi.current.redrawRows(currentLoadingsTable);
    await updateTempGridRowDataLoadingsTable(currentLoadingsTable);
    await updateGridRowDataLoadingsTable(currentLoadingsTable);
    await updateSendDataToOutputButtonColor('orange');
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const index = `check${k + 1}`;
        currentLoadingsTable[i][index] = false;
      }
    }
    gridApi.current.redrawRows(currentLoadingsTable);
    updateTempGridRowDataLoadingsTable(currentLoadingsTable);
    updateGridRowDataLoadingsTable(currentLoadingsTable);
    updateSendDataToOutputButtonColor('#d6dbe0');
  };

  // push headers and data to preserve local state for remount after unmount
  updateTempGridColDefsLoadingsTable(gridColDefsLoadingsTable);
  updateGridRowDataLoadingsTable(gridRowDataLoadingsTable);

  // getState - push data on initial render so if user unmounts without doing anything, will still remount properly
  const isLoadingsTableInitialRender = loadingState((state) => state.isLoadingsTableInitialRender);
  if (isLoadingsTableInitialRender) {
    updateTempGridColDefsLoadingsTable(gridColDefsLoadingsTable);
    updateTempGridRowDataLoadingsTable(gridRowDataLoadingsTable);
    updateIsLoadingsTableInitialRender(false);
  }

  // todo - create output buttons array here to stay in sync, but do performance check
  const outputButtonsArray2 = gridColDefsLoadingsTable.map((item) => item.field);
  const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
  outputButtonsArray3.shift();
  const outputButtonsArray = outputButtonsArray3.map((item) => item.slice(6));
  // delay to avoid react update error - can't update while rendering
  setTimeout(function () {
    updateOutputButtonsArray(outputButtonsArray);
  }, 100);

  // pull number factors to calc responsive table width

  // increase height / width when bipolar split present
  const bipolarSplitCount1 = loadingState((state) => state.bipolarSplitCount);
  const bipolarSplitCount = Number(bipolarSplitCount1);

  // disable buttons after bipolar split
  const isDisabled = loadingState((state) => state.bipolarDisabled);

  // increase width if bipolar present
  if (bipolarSplitCount > 0) {
    numFacsForTableWidth += bipolarSplitCount;
  }

  const loadingsTableContainerStyle = {
    marginTop: 2,
    height: getHeight(numQsorts),
    width: getWidth(numFacsForTableWidth),
    marginBottom: 15,
  };

  return (
    <div>
      <LoadingsContainerDiv>
        <ToastContainer transition={Zoom} />
        <HighlightingAndFlaggingTextBar>
          <span style={highlightingAndFlaggingStyle}>{props.childTrans.row}</span>
          <span>{props.childTrans.flagging}</span>
        </HighlightingAndFlaggingTextBar>
        <HighlightingAndFlaggingButtonBar>
          <RowColorsContainer>
            <NoHighlightingButton
              id="noHighlightingButton"
              className="wrapper1"
              disabled={isDisabled}
              onClick={() => highlightRows('none')}
            >
              {props.childTrans.none}
            </NoHighlightingButton>
            <ColorHighlightButton
              id="colorsHighlightingButton"
              className="wrapper1"
              disabled={isDisabled}
              onClick={() => highlightRows('colors')}
            >
              {props.childTrans.colors}
            </ColorHighlightButton>
            <GrayHighlightButton
              id="graysHighlightingButton"
              className="wrapper1"
              onClick={() => highlightRows('grays')}
              disabled={isDisabled}
              style={grayHighlightButtonStyle}
            >
              {props.childTrans.gray}
            </GrayHighlightButton>
          </RowColorsContainer>

          <RowColorsContainer>
            <GeneralButton
              $buttoncolor={autoflagButtonColor}
              id="autoflagButton"
              onClick={autoFlagFactors}
              disabled={isDisabled}
              style={autoFlagButtonStyle}
            >
              {props.childTrans.autoflag}
            </GeneralButton>

            <span style={atStyle}>{props.childTrans.at}</span>
            <SigLevelDropdown2 data={'allData'} />
            <GeneralButton style={allButtonStyle} disabled={isDisabled} onClick={flagAllQsorts}>
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
            {props.childTrans.default} {props.childTrans.fg} {props.childTrans.click}
          </ColumnSortText>
          <div
            id="loadingsTableContainer"
            style={loadingsTableContainerStyle}
            className="ag-theme-fresh"
          >
            <AgGridReact
              id="loadingsTable"
              ref={gridApi}
              columnDefs={gridColDefsLoadingsTable}
              rowData={gridRowDataLoadingsTable}
              getRowClass={(params) => params.data.highlightingClass}
              onGridReady={onGridReady}
              onCellClicked={updateTableLocalState}
              onCellFocused={changeOutputButtonColor}
              gridOptions={gridOptions}
              animateRows={true}
              enableBrowserTooltips={true}
            />
          </div>
        </div>
        <ButtonBarBottom>
          <DataToOutputButton
            $buttonColor={sendDataToOutputButtonColor}
            id="generateOutputButton"
            onClick={generateOutput}
          >
            {props.childTrans.send}
          </DataToOutputButton>
          <GeneralButton id="invertFactorsButton" disabled={isDisabled} onClick={doInvertFactor}>
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

export default LoadingsTable;

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
  background-color: ${(props) => props.buttonColor};
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
