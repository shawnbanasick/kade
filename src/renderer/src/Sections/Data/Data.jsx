import React from 'react';
import StatementsList from './StatementsList';
import QsortsPatternList from './QsortsPatternList';
import ParticipantsQsortsGrid from './ParticipantQsortsGrid';
import UnforcedSortsDisplay from './UnforcedSortsDisplay';
import calcPatternArray from './calcPatternArray';
import DownloadDatabookButton from './Databook/DownloadDatabookButton';
import DisplayDataSortsGridButton from './DisplayDataSortsGridButton';
import DisplayDataQsortsButton from './DisplayDataQsortsButton';
import generateDisplaySortMaps from './Databook/generateDisplaySortMaps';
import SortsDisplayList from './SortsDisplayList';
import DatFileButton from './ExportDAT';
import StaFileButton from './ExportSTA';
import coreState from '../GlobalState/coreState';
import inputState from '../GlobalState/inputState';
import dataDisplayState from '../GlobalState/dataDisplayState';
import { useTranslation } from 'react-i18next';

const Data = () => {
  const { t } = useTranslation();

  const mainDataObject = coreState((state) => state.mainDataObject);
  const statements = coreState((state) => state.statements);
  const projectName = coreState((state) => state.projectName);
  const numQsorts = coreState((state) => state.numQsorts);
  const numStatements = coreState((state) => state.numStatements);
  const qSortPattern = coreState((state) => state.qSortPattern);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const isQsortPatternLoaded = inputState((state) => state.isQsortPatternLoaded);
  const showExportButtons = inputState((state) => state.showExportButtons);
  const showQsortsSpreadsheet = dataDisplayState((state) => state.showQsortsSpreadsheet);
  const showQsorts = dataDisplayState((state) => state.showQsorts);
  const dataActiveTab = dataDisplayState((state) => state.dataActiveTab);
  const updateDataActiveTab = dataDisplayState((state) => state.updateDataActiveTab);

  let showUnforcedConfirmMessage = false;

  let texts = calcPatternArray([...multiplierArray]);

  const statementNumArray = statements.map((item, index) => {
    return index + 1;
  });

  let sortMapsArray = generateDisplaySortMaps(
    qSortPattern,
    mainDataObject,
    statementNumArray,
    multiplierArray
  );

  let numUnforcedParts = sortMapsArray[2];

  let displayForcedComfirmMessage = false;
  if (numUnforcedParts > 0) {
    showUnforcedConfirmMessage = true;
    displayForcedComfirmMessage = false;
  } else {
    displayForcedComfirmMessage = true;
    showUnforcedConfirmMessage = true;
  }

  const InfoPanel = () => {
    return (
      <>
        <section className="mb-8 pl-6 space-y-2">
          <h2 className="text-2xl font-semibold">
            {t('Project Name')}: <span className="font-normal">{projectName}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            {t('Participants')}: <span className="font-normal">{numQsorts}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            {t('Number of Statements')}: <span className="font-normal">{numStatements}</span>
          </h2>
        </section>
      </>
    );
  };

  const PatternPanel = () => {
    return (
      <section className="mb-8 space-y-2 pl-6">
        <h2 className="text-2xl font-semibold">{t('Q Sort Pattern')}:</h2>
        <QsortsPatternList texts={texts} />
      </section>
    );
  };

  const StatementsPanel = () => {
    return (
      <section className="py-2 mb-12">
        <StatementsList statements={statements} />
      </section>
    );
  };

  const SortsPanel = () => {
    return (
      <>
        <div className="flex flex-row gap-1 max-w-[85vw] justify-between mb-6 items-center">
          {showUnforcedConfirmMessage && (
            <>
              <div className="flex flex-row items-center gap-4 max-w-[60vw] justify-between">
                <div className="flex flex-row items-center gap-4">
                  <div className="text-[clamp(1.3rem,1.5vw,1.8rem)]">
                    {t('Display Participant Q Sorts as')}
                  </div>
                  <DisplayDataQsortsButton />
                  <DisplayDataSortsGridButton />
                </div>
              </div>
              <UnforcedSortsDisplay
                number={numUnforcedParts}
                display={displayForcedComfirmMessage}
              />
            </>
          )}
        </div>
        <section className="h-[calc(100vh-200px)]">
          {showQsortsSpreadsheet && <ParticipantsQsortsGrid data={mainDataObject} />}
          {showQsorts && (
            <SortsDisplayList
              sortsDisplayText={sortMapsArray[0]}
              respondentNames={sortMapsArray[1]}
            />
          )}
        </section>
      </>
    );
  };

  const DownloadsPanel = () => {
    return (
      <section className="py-8 mb-12">
        {showExportButtons && (
          <div className="flex flex-row flex-wrap items-center text-center gap-4">
            <DownloadDatabookButton />
            <div className="text-[clamp(1.3rem,1.5vw,1.8rem)] ml-12! font-bold self-center align-center ">
              {t('Export PQMethod')}
            </div>
            <div className="flex flex-row gap-4 mt-1">
              <StaFileButton />
              <DatFileButton />
            </div>
          </div>
        )}
      </section>
    );
  };

  // Handler for tab clicks
  const handleTabClick = (tabId) => {
    updateDataActiveTab(tabId);
  };

  const tabs = [
    {
      title: t('Info'),
      content: <InfoPanel />,
    },
    {
      title: t('Pattern'),
      content: <PatternPanel />,
    },
    {
      title: t('Statements'),
      content: <StatementsPanel />,
    },
    {
      title: t('Q Sorts'),
      content: <SortsPanel />,
    },
    {
      title: t('Downloads'),
      content: <DownloadsPanel />,
    },
  ];

  if (areQsortsLoaded && isQsortPatternLoaded) {
    return (
      <div
        className={`
        bg-white
        w-[calc(100vw-135px)]
        box-border
        h-full
        overflow-auto
        transition-[visibility,opacity]
        duration-500
        text-black
        text-[clamp(1rem,1.5vw,1.1rem)] 
      `}
      >
        <div className="tabs tabs-box flex bg-grey-button h-full rounded-none">
          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${dataActiveTab === 'tab1' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[0].title}
            onClick={() => handleTabClick('tab1')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${dataActiveTab === 'tab2' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[1].title}
            onClick={() => handleTabClick('tab2')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[1].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${dataActiveTab === 'tab3' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[2].title}
            onClick={() => handleTabClick('tab3')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[2].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${dataActiveTab === 'tab4' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[3].title}
            onClick={() => handleTabClick('tab4')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-1 pl-6">{tabs[3].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${dataActiveTab === 'tab5' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[4].title}
            onClick={() => handleTabClick('tab5')}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[4].content}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-12 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('No data loaded')}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {t(
            'Confirm that the statements, Q sorts, and the Q sort pattern have all been entered correctly'
          )}
        </p>
      </div>
    );
  }
};

export default Data;
