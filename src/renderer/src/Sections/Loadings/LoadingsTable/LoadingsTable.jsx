import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import SigLevelDropdown from './SigLevelDropdownSelect2';
import InvertFactorButton from './InvertFactorButton';
import autoFlagFactors from '../loadingsLogic/autoFlagFactors';
import SplitBipolarFactorModal from './SplitBipolarFactorModal';
import MajorityCommonVarianceCheckbox from './MajorityCommonVarianceCheckbox';
import GeneralButton from '../../../Utils/GeneralButton';
import i18n from 'i18next';
import generateOutputFromLoadingTable from './generateOutputFromLoadingTable';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import outputState from '../../GlobalState/outputState';
import rotationState from '../../GlobalState/rotationState';
import coreState from '../../GlobalState/coreState';
import resetSection6 from '../../../Utils/resetSection6';

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
  const [localStore, setLocalStore] = useState({
    numQsorts: 0,
    numFacsForTableWidth: 0,
    sendDataToOutputButtonColor: '#d6dbe0',
    autoflagButtonColor: '#d6dbe0',
  });

  // inline styles
  const gridColDefsLoadingsTable = loadingState((state) => state.gridColDefsLoadingsTable);
  const gridRowDataLoadingsTable = loadingState((state) => state.gridRowDataLoadingsTable);
  const isLoadingsTableInitialRender = loadingState((state) => state.isLoadingsTableInitialRender);
  const bipolarSplitCount1 = loadingState((state) => state.bipolarSplitCount);
  const sendDataToOutputButtonColor = loadingState((state) => state.sendDataToOutputButtonColor);
  const autoflagButtonColor = loadingState((state) => state.autoflagButtonColor);
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const numQsorts = coreState((state) => state.numQsorts);
  const highlightingAndFlaggingStyle = { marginRight: 255 };
  const grayHighlightButtonStyle = { marginRight: 150 };
  const autoFlagButtonStyle = { marginLeft: 10 };
  const atStyle = { marginLeft: 5, marginRight: 10, marginTop: 15 };
  const allButtonStyle = { marginLeft: '40px', width: 60 };
  const noneButtonStyle = { marginLeft: '40px' };
  let numFacsForTableWidth = Number(rotationState((state) => state.numFactorsKeptForRot));
  const updateSendDataToOutputButtonColor = loadingState(
    (state) => state.updateSendDataToOutputButtonColor
  );

  const updateNotifyDataSentToOutputSuccess = loadingState(
    (state) => state.updateNotifyDataSentToOutputSuccess
  );
  const updateIsLoadingsButtonGreen = appState((state) => state.updateIsLoadingsButtonGreen);
  const updateIsLoadingsTableInitialRender = loadingState(
    (state) => state.updateIsLoadingsTableInitialRender
  );
  const updateCurrentLoadingsTable = loadingState((state) => state.updateCurrentLoadingsTable);
  const updateShowSplitFactorModal = loadingState((state) => state.updateShowSplitFactorModal);
  const updateGridRowDataLoadingsTable = loadingState(
    (state) => state.updateGridRowDataLoadingsTable
  );
  const updateHighlighting = loadingState((state) => state.updateHighlighting);
  // getState - pull headers and data from states
  const updateOutputButtonsArray = outputState((state) => state.updateOutputButtonsArray);

  const gridRef = useRef();

  // notification of table data sent to output
  const notify = async () => {
    await toast.success(i18n.t('Data sent to Output'), {
      autoClose: 1500,
    });
    await updateNotifyDataSentToOutputSuccess(false);
    await updateIsLoadingsButtonGreen(true);
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
      resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight();
      });
    };
  }, []);

  // const onGridReady = (params) => {
  //   gridApi.current = params.api;
  //   // gridApi.current.sizeColumnsToFit();
  // };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
  };

  const grabTableLocalState = () => {
    // grab current table data (including user-added flags)
    const count = gridRef.current.api.getDisplayedRowCount();
    const currentLoadingsTable = [];
    for (let i = 0; i < count; i += 1) {
      const rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      currentLoadingsTable.push(rowNode.data);
    }
    return currentLoadingsTable;
  };

  // todo - fix this hack - button color shifted to different listener
  const updateTableLocalState = () => {
    const currentLoadingsTable = grabTableLocalState();
    // localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    resetSection6();
  };

  const changeOutputButtonColor = () => {
    updateSendDataToOutputButtonColor('orange');
  };

  const generateOutput = () => {
    // grab current table data
    const currentLoadingsTable = grabTableLocalState();
    // send current to local state
    // localStore.temp_gridRowDataLoadingsTable = currentLoadingsTable;
    generateOutputFromLoadingTable(currentLoadingsTable);
    notify();
  };

  const doSplitFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    updateCurrentLoadingsTable(currentLoadingsTable);
    updateShowSplitFactorModal(true);
  };

  const doInvertFactor = () => {
    const currentLoadingsTable = grabTableLocalState();
    updateCurrentLoadingsTable(currentLoadingsTable);
    updateShowSplitFactorModal(true);
  };

  const highlightRows = (highlightType) => {
    const currentLoadingsTable2 = [];
    const count = gridRef.current.api.getDisplayedRowCount();
    for (let i = 0; i < count; i += 1) {
      const rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      const holder = rowNode.data.highlightingClass;
      const holder2 = holder.slice(0, 2);
      const holder3 = `${holder2}${highlightType}`;
      rowNode.data.highlightingClass = holder3;
      currentLoadingsTable2.push(rowNode.data);
    }
    gridRef.current.api.redrawRows(currentLoadingsTable2);
    // updateGridRowDataLoadingsTable(currentLoadingsTable2);
    updateHighlighting(highlightType);
  };

  const flagAllQsorts = () => {
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
    console.log(JSON.stringify(currentLoadingsTable));
    gridRef.current.api.redrawRows(currentLoadingsTable);
    // setLocalStore({ temp_gridRowDataLoadingsTable: currentLoadingsTable });
    // updateGridRowDataLoadingsTable(currentLoadingsTable);

    // gridRef.current.api.redrawRows();

    updateSendDataToOutputButtonColor('orange');
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        const index = `check${k + 1}`;
        currentLoadingsTable[i][index] = false;
      }
    }
    gridRef.current.api.redrawRows(currentLoadingsTable);
    // setLocalStore({ temp_gridRowDataLoadingsTable: currentLoadingsTable });
    // updateGridRowDataLoadingsTable(currentLoadingsTable);
    updateSendDataToOutputButtonColor('#d6dbe0');
  };

  // push headers and data to preserve local state for remount after unmount
  // localStore.gridColDefsLoadingsTable = gridColDefsLoadingsTable;
  // localStore.gridRowDataLoadingsTable = gridRowDataLoadingsTable;

  if (isLoadingsTableInitialRender) {
    setLocalStore({ temp_gridColDefsLoadingsTable: gridColDefsLoadingsTable });
    setLocalStore({ temp_gridRowDataLoadingsTable: gridRowDataLoadingsTable });
    updateIsLoadingsTableInitialRender(false);
  }

  console.log(JSON.stringify(gridRowDataLoadingsTable));

  // getState - pull number Q sorts for table height calcs
  // setLocalStore({ numQsorts: numQsorts });

  // todo - create output buttons array here to stay in sync, but do performance check
  const outputButtonsArray2 = gridColDefsLoadingsTable.map((item) => item.field);
  const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
  outputButtonsArray3.shift();
  const outputButtonsArray4 = outputButtonsArray3.map((item) => item.slice(6));
  // delay to avoid react update error - can't update while rendering
  setTimeout(function () {
    updateOutputButtonsArray(outputButtonsArray4);
  }, 100);

  // increase height / width when bipolar split present
  const bipolarSplitCount = Number(bipolarSplitCount1);

  // communication with user - has data been sent to output section?

  // disable buttons after bipolar split

  // increase width if bipolar present
  if (bipolarSplitCount > 0) {
    numFacsForTableWidth += bipolarSplitCount;
  }

  // setLocalStore({ numFacsForTableWidth: numFacsForTableWidth });
  // setLocalStore({ sendDataToOutputButtonColor: sendDataToOutputButtonColor });
  // setLocalStore({ autoflagButtonColor: autoflagButtonColor });

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
              $buttoncolor={localStore.autoflagButtonColor}
              id="autoflagButton"
              onClick={autoFlagFactors}
              disabled={isDisabled}
              style={autoFlagButtonStyle}
            >
              {props.childTrans.autoflag}
            </GeneralButton>

            <span style={atStyle}>{props.childTrans.at}</span>
            <SigLevelDropdown data={'allData'} />
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
              ref={gridRef}
              id="loadingsTable"
              columnDefs={gridColDefsLoadingsTable}
              rowData={gridRowDataLoadingsTable}
              getRowClass={(params) => params.data.highlightingClass}
              // onGridReady={onGridReady}
              onCellClicked={updateTableLocalState}
              onCellFocused={changeOutputButtonColor}
              gridOptions={gridOptions}
              animateRows={true}
            />
          </div>
        </div>
        <ButtonBarBottom>
          <DataToOutputButton
            $buttonColor={localStore.sendDataToOutputButtonColor}
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
