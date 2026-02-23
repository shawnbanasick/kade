import { ToastContainer, toast, Zoom } from 'react-toastify';
import FactorsTable from './Factors Table/FactorsTable';
import FactorVizOptions from './FactorViz/FactorVizOptions';
import FactorVizDispatch from './FactorVisualizations/FactorVizDispatch';
import RefreshFactorVizButton from './FactorVisualizations/RefreshFactorVizButton';
import DownloadResultsButtons from './DownloadResultsButtons/DownloadResultsButtons';
import MultipleFactorsFlaggedWarningModal from './MultipleFactorsFlaggedWarningModal';
import ShowVizOptionsButton from './DisplayVisualizationsButtons/ShowVizOptionsButton';
import OutputFactorTablesTransitionContainer from './OutputFactorTablesTransitionContainer';
import NoLoadingsFlaggedWarningModal from '../Loadings/LoadingsTable/NoLoadingsFlaggedWarningModal';
import DisplayVisualizationsButtons from './DisplayVisualizationsButtons/DisplayVisualizationsButtons';
import FactorSelectionForOutputButtons from './FactorSelectionForOutput/FactorSelectionForOutputButtons';
import DistStateSigLevelDrop1 from './FactorSelectionForOutput/DistStateSigLevelDrop1';
import DistStateSigLevelDrop2 from './FactorSelectionForOutput/DistStateSigLevelDrop2';
import DistinguishingStatementsList from './DistinguishingStatementsDisplay/DistingishingStatementsList';
import { useTranslation } from 'react-i18next';
import DownloadDocxOptionsBox from './DownloadResultsButtons/DownloadDocxOptionsBox';
import DocxFormatButtons from './DownloadResultsButtons/DocxFormatButtons';
import DocxIncludeDataOption from './DownloadResultsButtons/DocxIncludeDataOption';
import DownloadResultsAsDocx from './DownloadResultsButtons/DownloadResultsAsDocx';
// import vizState from '../GlobalState/vizState';
import outputState from '../GlobalState/outputState';
import calcState from '../GlobalState/calcState';

import i18n from 'i18next';

const Output = () => {
  const { t } = useTranslation();
  let displayState = outputState((state) => state.showDocxOptions);
  const updateOutputActiveTabIndex = outputState((state) => state.updateOutputActiveTabIndex);
  const outputActiveTabIndex = outputState((state) => state.outputActiveTabIndex);
  const updateNotifyOutputDistStateError = outputState(
    (state) => state.updateNotifyOutputDistStateError
  );
  const showTableDataNotSentWarning = outputState((state) => state.showTableDataNotSentWarning);
  const showNotification = outputState((state) => state.notifyOutputDistStateError);

  const notify = async () => {
    await toast.error('Error >>> Reset threshold levels', {
      className: 'outputToast',
      progressClassName: 'outputToastProgress',
      bodyClassName: 'outputToastBody',
    });
    await updateNotifyOutputDistStateError(false);
  };

  const handleTabClick = (tabId) => {
    updateOutputActiveTabIndex(tabId);
  };

  const tabInputClass = (tabId) =>
    `tab w-[10vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]  ${
      outputActiveTabIndex === tabId ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'
    }`;

  // Shared content window classes
  const window1Class =
    'bg-white flex flex-col select-none min-w-[calc(100vw-166px)] h-[calc(100vh-80px)] overflow-auto box-border';

  const window2Class =
    'pt-[10px] bg-white select-none h-[calc(100vh-80px)] min-w-[calc(100vw-186px)] overflow-auto box-border';

  if (showNotification) {
    notify();
  }

  const userSelectedFactors = outputState((state) => state.userSelectedFactors);

  const getArrayValues = (userSelectedFactors) => {
    const headerRow = [i18n.t('Nm'), i18n.t('Statement'), i18n.t('Nm')];
    const colWidthVals = [60, 250, 60];
    const alignmentVals = ['center', 'left', 'center'];
    const pinnedVals = [true, true, true];

    for (let i = 0; i < userSelectedFactors.length; i += 1) {
      const identifier3 = userSelectedFactors[i].slice(7);
      const identifier2 = `F${identifier3} ${i18n.t('Z score')}`;
      const identifier = `F${identifier3} ${i18n.t('Rank')}`;
      headerRow.push(identifier2, identifier);
      colWidthVals.push(110, 90);
      alignmentVals.push('center', 'center');
      pinnedVals.push(false, false);
    }
    return [headerRow, colWidthVals, alignmentVals, pinnedVals];
  };

  const numFacs = userSelectedFactors.length;
  const arrayValues = getArrayValues(userSelectedFactors);

  const data = calcState((state) => state.factorScoreRanksArray);
  const currentData = ((data) => {
    const lengthCutOff = numFacs * 2 + 3;
    arrayValues[0].length = lengthCutOff;
    return [data, numFacs];
  })(data);

  const getGridColDefsFacTable = (numFacs, headerRow, pinnedVals, colWidthVals, alignmentVals) => {
    const gridColDefsFacTable = [];
    for (let i = 0; i < headerRow.length; i += 1) {
      gridColDefsFacTable.push({
        headerName: headerRow[i],
        field: headerRow[i],
        pinned: pinnedVals[i],
        editable: false,
        sortable: true,
        width: colWidthVals[i],
        cellStyle: { textAlign: alignmentVals[i] },
      });
    }
    return gridColDefsFacTable;
  };

  const gridRowDataFacTable = getGridRowDataFacTable(currentData[0], arrayValues[0]);

  function getGridRowDataFacTable(data2, headerRow) {
    if (data2 === undefined) return null;
    const data = data2.slice(5);
    const gridRowDataFacTable = [];
    for (let j = 0; j < data.length; j += 1) {
      const tempObj = {};
      tempObj.factorList = data[j][0];
      for (let k = 0; k < headerRow.length; k += 1) {
        tempObj[headerRow[k]] = data[j][k];
      }
      gridRowDataFacTable.push(tempObj);
    }
    return gridRowDataFacTable;
  }

  const gridColDefsFacTable = getGridColDefsFacTable(
    currentData[1],
    arrayValues[0],
    arrayValues[3],
    arrayValues[1],
    arrayValues[2]
  );

  const tabs = [
    {
      title: t('Options'),
      content: (
        <div className={window1Class}>
          {showTableDataNotSentWarning ? (
            <div className="text-[25px] ml-[50px] mt-[50px]">{t('No Data Click')}</div>
          ) : (
            <>
              <DistStateSigLevelDrop1 />
              <DistStateSigLevelDrop2 />
              <FactorSelectionForOutputButtons />
            </>
          )}
          <DownloadResultsButtons />
          {displayState && (
            <div className="flex flex-row mt-[25px]">
              <DownloadDocxOptionsBox />
              <div className="flex flex-col h-full">
                <DocxFormatButtons />
                <DocxIncludeDataOption />
                <DownloadResultsAsDocx />
              </div>
            </div>
          )}
          <NoLoadingsFlaggedWarningModal />
          <MultipleFactorsFlaggedWarningModal />
        </div>
      ),
    },
    {
      title: t('Factor Characteristics'),
      content: (
        <div className={window2Class}>
          <OutputFactorTablesTransitionContainer />
        </div>
      ),
    },
    {
      title: t('Factors Table'),
      content: (
        <div
          className={
            'bg-white flex select-none w-full min-w-0 overflow-hidden h-[calc(100vh-80px)]'
          }
        >
          <FactorsTable
            gridColDefsFacTable={gridColDefsFacTable}
            gridRowDataFacTable={gridRowDataFacTable}
          />
        </div>
      ),
    },
    {
      title: t('Distinguishing Statements'),
      content: (
        <div className={window2Class}>
          <DistinguishingStatementsList />
        </div>
      ),
    },
    {
      title: t('Factor Visualizations'),
      content: (
        <>
          <ToastContainer transition={Zoom} autoClose={5000} />
          <div className={window2Class}>
            <div className="flex h-[50px] ml-[20px]">
              <DisplayVisualizationsButtons />
              <ShowVizOptionsButton />
            </div>
            <RefreshFactorVizButton marginTop={50} marginBottom={10} />
            <FactorVizOptions />
            <RefreshFactorVizButton marginTop={10} marginBottom={50} />
            <div style={{ height: 50 }} />
            <FactorVizDispatch />
          </div>
        </>
      ),
    },
  ];

  return (
    <div
      className="
        bg-grey-button
        w-[calc(100vw-135px)]
        box-border
        h-screen
        overflow-auto
        animate-fadeIn
        [&_.outputToast]:text-white
        [&_.outputToast]:font-bold
        [&_.outputToastProgress]:bg-white
        [&_.outputToastBody]:text-white
        [&_.Toastify\_\_close-button]:text-white
        text-black
      "
    >
      <div className="w-[calc(100vw-135px)] box-border h-full overflow-auto transition-[visibility,opacity] duration-500">
        <div className="tabs tabs-box flex bg-grey-button h-full rounded-none">
          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab1')}
            aria-label={tabs[0].title}
            onClick={() => handleTabClick('tab1')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 pt-1">{tabs[0].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab2')}
            aria-label={tabs[1].title}
            onClick={() => handleTabClick('tab2')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[1].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab3')}
            aria-label={tabs[2].title}
            onClick={() => handleTabClick('tab3')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[2].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab4')}
            aria-label={tabs[3].title}
            onClick={() => handleTabClick('tab4')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[3].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab5')}
            aria-label={tabs[4].title}
            onClick={() => handleTabClick('tab5')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[4].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Output;
