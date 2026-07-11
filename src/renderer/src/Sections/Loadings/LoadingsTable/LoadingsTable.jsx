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

const filterArray = (item) => {
  let shortened = item;
  shortened = shortened.substring(0, 6);
  if (shortened === 'factor') {
    return item;
  }
  return null;
};

function getWidth(numFacsForTableWidth) {
  const tableWidth = 315 + 15 + 125 * numFacsForTableWidth;
  const container = document.querySelector('#loadingsTableContainer');
  const parent = container ? container.parentElement : null;
  // Measure the actual available space in the DOM rather than guessing
  // from window.innerWidth, which doesn't account for the wrapper's
  // own width (w-[90%]) and padding/margins stacked on top of it.
  const availableWidth = parent ? parent.clientWidth : window.innerWidth - 205;
  if (availableWidth < tableWidth) {
    return availableWidth + 'px';
  }
  return tableWidth + 'px';
}

function getHeight(numQsorts) {
  let heightVal1 = 40 + 25 * numQsorts;
  let heightVal2 = window.innerHeight - 320;
  if (heightVal1 < heightVal2) {
    return heightVal1 + 'px';
  }
  return heightVal2 + 'px';
}

// *** COMPONENT START***
const LoadingsTable = (props) => {
  const gridColDefsLoadingsTable = loadingState((state) => state.gridColDefsLoadingsTable);
  const gridRowDataLoadingsTable = loadingState((state) => state.gridRowDataLoadingsTable);
  const isLoadingsTableInitialRender = loadingState((state) => state.isLoadingsTableInitialRender);
  const bipolarSplitCount1 = loadingState((state) => state.bipolarSplitCount);
  const sendDataToOutputButtonColor = loadingState((state) => state.sendDataToOutputButtonColor);
  const autoflagButtonColor = loadingState((state) => state.autoflagButtonColor);
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const numQsorts = coreState((state) => state.numQsorts);
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
  const updateOutputButtonsArray = outputState((state) => state.updateOutputButtonsArray);

  const gridRef = useRef();

  const [localStore, setLocalStore] = useState({
    numQsorts: 0,
    numFacsForTableWidth: 0,
    sendDataToOutputButtonColor: '#d6dbe0',
    autoflagButtonColor: 'bg-grey-button',
  });

  const notify = async () => {
    await toast.success(i18n.t('Data sent to Output'), { autoClose: 1500 });
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

  useEffect(() => {
    const handleResize = () => resetWidthAndHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    theme: 'legacy',
  };

  const grabTableLocalState = () => {
    const currentLoadingsTable = [];
    const nodeArray = gridRef.current.api.getRenderedNodes();
    for (let i = 0; i < nodeArray.length; i += 1) {
      currentLoadingsTable.push(nodeArray[i].data);
    }
    return currentLoadingsTable;
  };

  const updateTableLocalState = () => {
    grabTableLocalState();
    resetSection6();
  };

  const changeOutputButtonColor = () => {
    setTimeout(() => {
      updateSendDataToOutputButtonColor('orange');
    }, 100);
  };

  const generateOutput = () => {
    const currentLoadingsTable = grabTableLocalState();
    updateCurrentLoadingsTable(currentLoadingsTable);
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
      rowNode.data.highlightingClass = `${holder2}${highlightType}`;
      currentLoadingsTable2.push(rowNode.data);
    }
    gridRef.current.api.redrawRows(currentLoadingsTable2);
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
        currentLoadingsTable[i][checkboxIndex] = factorGroupIndexValue === k;
      }
    }
    gridRef.current.api.redrawRows(currentLoadingsTable);
    setTimeout(() => {
      updateSendDataToOutputButtonColor('orange');
    }, 100);
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        currentLoadingsTable[i][`check${k + 1}`] = false;
      }
    }
    gridRef.current.api.redrawRows(currentLoadingsTable);
    setTimeout(() => {
      updateSendDataToOutputButtonColor('#d6dbe0');
    }, 100);
  };

  useEffect(() => {
    if (isLoadingsTableInitialRender) {
      setLocalStore({ temp_gridColDefsLoadingsTable: gridColDefsLoadingsTable });
      setLocalStore({ temp_gridRowDataLoadingsTable: gridRowDataLoadingsTable });
      updateIsLoadingsTableInitialRender(false);
    }
  }, [isLoadingsTableInitialRender]);

  useEffect(() => {
    const outputButtonsArray2 = gridColDefsLoadingsTable.map((item) => item.field);
    const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
    outputButtonsArray3.shift();
    const outputButtonsArray4 = outputButtonsArray3.map((item) => item.slice(6));
    updateOutputButtonsArray(outputButtonsArray4);
  }, [gridColDefsLoadingsTable]);

  const bipolarSplitCount = Number(bipolarSplitCount1);
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
    <div className="flex flex-col w-[90%] min-w-0 items-center ml-10">
      <div className="flex flex-col items-center">
        <ToastContainer transition={Zoom} />
        <div className="flex flex-row w-full items-center">
          <span className="">{props.childTrans.row}</span>
          <span className="ml-102">{props.childTrans.flagging}</span>
        </div>
        {/* Row Highlighting Buttons */}
        <div
          id="colorAndFlaggingButtonGroupContainer"
          className="flex flex-row w-full min-w-0 justify-between px-2 flex-wrap gap-y-2"
        >
          <div id="rowHighlightingButtonGroup" className="flex flex-row gap-2 min-w-0">
            <GeneralButton
              id="noHighlightingButton"
              className="wrapper1 min-w-20 bg-grey-button h-7.5"
              disabled={isDisabled}
              onClick={() => highlightRows('none')}
            >
              {props.childTrans.none}
            </GeneralButton>
            <GeneralButton
              id="colorsHighlightingButton"
              className="wrapper1 min-w-20 bg-grey-button h-7.5"
              disabled={isDisabled}
              onClick={() => highlightRows('colors')}
            >
              {props.childTrans.colors}
            </GeneralButton>
            <GeneralButton
              id="graysHighlightingButton"
              className="wrapper1 min-w-20 bg-grey-button h-7.5"
              onClick={() => highlightRows('grays')}
              disabled={isDisabled}
            >
              {props.childTrans.gray}
            </GeneralButton>
          </div>
          {/* Flagging Buttons */}
          <div id="flaggingButtonGroup" className="flex flex-row flex-wrap gap-3 h-7.5 min-w-0">
            <GeneralButton
              id="autoflagButton"
              onClick={autoFlagFactors}
              disabled={isDisabled}
              className={`h-7.5 ${autoflagButtonColor}`}
            >
              {props.childTrans.autoflag}
            </GeneralButton>
            <span className="">{props.childTrans.at}</span>
            <SigLevelDropdown data={'allData'} />
            <GeneralButton
              className="w-15 h-7.5 bg-grey-button"
              disabled={isDisabled}
              onClick={flagAllQsorts}
            >
              {props.childTrans.all}
            </GeneralButton>
            <GeneralButton
              className=" h-7.5 bg-grey-button"
              disabled={isDisabled}
              onClick={clearAllCheckboxes}
            >
              {props.childTrans.none}
            </GeneralButton>
          </div>
        </div>
        <div className="flex items-center w-full max-w-250 min-w-0 pr-15 mt-0.75 justify-end">
          <MajorityCommonVarianceCheckbox />
        </div>
        <div className="flex flex-col items-center mb-2">
          <p className="flex items-center text-[16px]   text-center">
            {props.childTrans.default} {props.childTrans.fg} {props.childTrans.click}
          </p>
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
              onCellClicked={updateTableLocalState}
              onCellFocused={changeOutputButtonColor}
              gridOptions={gridOptions}
              animateRows={true}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap w-full justify-between gap-x-10 gap-y-2 min-w-0 px-2">
          <GeneralButton
            id="generateOutputButton"
            onClick={generateOutput}
            style={{
              backgroundColor: sendDataToOutputButtonColor,
              transition: 'background-color 0.3s ease',
            }}
            className="h-[30px] bg-grey-button flex-1 min-w-[200px] max-w-[260px]"
          >
            {props.childTrans.send}
          </GeneralButton>
          <GeneralButton
            id="invertFactorsButton"
            className="h-[30px] bg-grey-button flex-1 min-w-[120px] max-w-[160px]"
            disabled={isDisabled}
            onClick={doInvertFactor}
          >
            {props.childTrans.invert}
          </GeneralButton>
          <GeneralButton
            id="splitFactorsButton"
            className="h-[30px] bg-grey-button flex-1 min-w-[160px] max-w-[260px]"
            onClick={doSplitFactor}
          >
            {props.childTrans.split}
          </GeneralButton>
        </div>
        <SplitBipolarFactorModal />
        <InvertFactorButton />
      </div>
    </div>
  );
};

export default LoadingsTable;

/*
99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28
*/
