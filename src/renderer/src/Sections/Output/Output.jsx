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

const Output = () => {
  const { t } = useTranslation();
  let displayState = outputState((state) => state.showDocxOptions);
  const updateOutputActiveTabIndex = outputState((state) => state.updateOutputActiveTabIndex);
  const outputActiveTabIndex = outputState((state) => state.outputActiveTabIndex);
  const updateNotifyOutputDistStateError = outputState(
    (state) => state.updateNotifyOutputDistStateError
  );
  let showTableDataNotSentWarning;

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
    `tab w-[10vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]  ${
      outputActiveTabIndex === tabId ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'
    }`;

  // Shared content window classes
  const window1Class =
    'bg-white grid grid-rows-[80px_80px_80px_1fr_auto] select-none min-w-[calc(100vw-166px)] h-[calc(100vh-80px)] overflow-auto box-border';

  const window2Class =
    'pt-[15px] bg-white select-none h-[calc(100vh-70px)] min-w-[calc(100vw-186px)] overflow-auto box-border';

  showTableDataNotSentWarning = outputState((state) => state.showTableDataNotSentWarning);
  const showNotification = outputState((state) => state.notifyOutputDistStateError);

  if (showNotification) {
    notify();
  }

  const tabs = [
    {
      title: t('Options'),
      content: (
        <div className={window1Class}>
          {showTableDataNotSentWarning && (
            <div className="text-[25px] ml-[50px] mt-[100px]">{t('No Data Click')}</div>
          )}
          <DistStateSigLevelDrop1 />
          <DistStateSigLevelDrop2 />
          <FactorSelectionForOutputButtons />
          <DownloadResultsButtons />
          {displayState && (
            <div className="flex flex-row">
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
        <div className={window2Class}>
          <FactorsTable />
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
        bg-[#d6dbe0]
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
      "
    >
      <div className="w-[calc(100vw-135px)] box-border h-full overflow-auto transition-[visibility,opacity] duration-500">
        <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100vh] rounded-none">
          <input
            type="radio"
            name="my_tabs_6"
            className={tabInputClass('tab1')}
            aria-label={tabs[0].title}
            onClick={() => handleTabClick('tab1')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

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
