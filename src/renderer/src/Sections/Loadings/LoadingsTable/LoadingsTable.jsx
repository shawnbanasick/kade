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
  let tableWidth = 310 + 15 + 125 * numFacsForTableWidth;
  let windowWidth = window.innerWidth - 205;
  if (windowWidth < tableWidth) {
    return windowWidth + 'px';
  }
  return tableWidth + 'px';
}

function getHeight(numQsorts) {
  let heightVal1 = 40 + 25 * numQsorts;
  let heightVal2 = window.innerHeight - 270;
  if (heightVal1 < heightVal2) {
    return heightVal1 + 'px';
  }
  return heightVal2 + 'px';
}

const LoadingsTable = (props) => {
  const [localStore, setLocalStore] = useState({
    numQsorts: 0,
    numFacsForTableWidth: 0,
    sendDataToOutputButtonColor: '#d6dbe0',
    autoflagButtonColor: 'bg-grey-button',
  });

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

  window.addEventListener('resize', () => {
    resetWidthAndHeight();
  });

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
    updateSendDataToOutputButtonColor('orange');
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
    updateSendDataToOutputButtonColor('orange');
  };

  const clearAllCheckboxes = () => {
    const currentLoadingsTable = grabTableLocalState();
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      for (let k = 0; k < numFacsForTableWidth; k += 1) {
        currentLoadingsTable[i][`check${k + 1}`] = false;
      }
    }
    gridRef.current.api.redrawRows(currentLoadingsTable);
    updateSendDataToOutputButtonColor('#d6dbe0');
  };

  if (isLoadingsTableInitialRender) {
    setLocalStore({ temp_gridColDefsLoadingsTable: gridColDefsLoadingsTable });
    setLocalStore({ temp_gridRowDataLoadingsTable: gridRowDataLoadingsTable });
    updateIsLoadingsTableInitialRender(false);
  }

  const outputButtonsArray2 = gridColDefsLoadingsTable.map((item) => item.field);
  const outputButtonsArray3 = outputButtonsArray2.filter(filterArray);
  outputButtonsArray3.shift();
  const outputButtonsArray4 = outputButtonsArray3.map((item) => item.slice(6));
  setTimeout(function () {
    updateOutputButtonsArray(outputButtonsArray4);
  }, 100);

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

  console.log('autoflagButtonColor', autoflagButtonColor);

  return (
    <div>
      <div className="grid grid-cols-1">
        <ToastContainer transition={Zoom} />
        <div className="grid grid-cols-[410px_auto] w-[1100px] h-[30px]">
          <span className="mr-[255px]">{props.childTrans.row}</span>
          <span>{props.childTrans.flagging}</span>
        </div>
        <div className="grid grid-cols-[400px_auto] h-[50px] w-[1100px]">
          <div className="flex flex-row gap-3">
            <GeneralButton
              id="noHighlightingButton"
              className="wrapper1 min-w-[80px] bg-grey-button h-[30px]"
              disabled={isDisabled}
              onClick={() => highlightRows('none')}
            >
              {props.childTrans.none}
            </GeneralButton>
            <GeneralButton
              id="colorsHighlightingButton"
              className="wrapper1 min-w-[80px] bg-grey-button h-[30px]"
              disabled={isDisabled}
              onClick={() => highlightRows('colors')}
            >
              {props.childTrans.colors}
            </GeneralButton>
            <GeneralButton
              id="graysHighlightingButton"
              className="wrapper1 min-w-[80px] mr-[150px] bg-grey-button h-[30px]"
              onClick={() => highlightRows('grays')}
              disabled={isDisabled}
            >
              {props.childTrans.gray}
            </GeneralButton>
          </div>
          <div className="flex flex-row gap-3 h-[30px] items-center justify-left">
            <GeneralButton
              id="autoflagButton"
              onClick={autoFlagFactors}
              disabled={isDisabled}
              className={`h-[30px] ${autoflagButtonColor}`}
            >
              {props.childTrans.autoflag}
            </GeneralButton>
            <span className="">{props.childTrans.at}</span>
            <SigLevelDropdown data={'allData'} />
            <GeneralButton
              className="ml-[40px] w-[60px] h-[30px] bg-grey-button"
              disabled={isDisabled}
              onClick={flagAllQsorts}
            >
              {props.childTrans.all}
            </GeneralButton>
            <GeneralButton
              className=" h-[30px] bg-grey-button"
              disabled={isDisabled}
              onClick={clearAllCheckboxes}
            >
              {props.childTrans.none}
            </GeneralButton>
          </div>
        </div>
        <div className="w-[900px] pl-[16px] mt-[3px] mb-[25px]">
          <MajorityCommonVarianceCheckbox />
        </div>
        <div>
          <p className="text-[12px] font-normal mt-[15px] text-left w-[900px]">
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
        <div className="flex flex-row justify-between w-[910px] h-[30px]">
          <GeneralButton
            id="generateOutputButton"
            onClick={generateOutput}
            style={{
              backgroundColor: sendDataToOutputButtonColor,
              transition: 'background-color 0.3s ease',
            }}
            className="h-[30px] bg-grey-button w-[260px]"
          >
            {props.childTrans.send}
          </GeneralButton>
          <GeneralButton
            id="invertFactorsButton"
            className="ml-[40px] h-[30px] bg-grey-button w-[160px]"
            disabled={isDisabled}
            onClick={doInvertFactor}
          >
            {props.childTrans.invert}
          </GeneralButton>
          <GeneralButton
            id="splitFactorsButton"
            className="ml-[40px] h-[30px] bg-grey-button w-[260px]"
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
