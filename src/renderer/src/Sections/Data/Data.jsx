import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

/* -------------------------------------------------------------------------- */
/*  Panels                                                                    */
/*  Defined at module scope so React keeps the same component type between    */
/*  renders. That preserves DOM and scroll position when store values change. */
/*  Each panel reads only the state it needs.                                 */
/* -------------------------------------------------------------------------- */

const InfoPanel = () => {
  const { t } = useTranslation();
  const projectName = coreState((state) => state.projectName);
  const numQsorts = coreState((state) => state.numQsorts);
  const numStatements = coreState((state) => state.numStatements);

  return (
    <div className="flex flex-col mt-9">
      <div className="text-4xl mb-10">{t('Project Information')}</div>
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
    </div>
  );
};

const PatternPanel = () => {
  const { t } = useTranslation();
  const multiplierArray = coreState((state) => state.multiplierArray);
  const texts = useMemo(() => calcPatternArray([...multiplierArray]), [multiplierArray]);

  return (
    <div className="flex flex-col mt-9">
      <div className="text-4xl mb-10">{t('Q Sort Grid Pattern')}</div>
      <section className="mb-8 space-y-2 pl-6">
        <QsortsPatternList texts={texts} />
      </section>
    </div>
  );
};

// Fixed header + ONE scrolling region. min-h-0 lets the flex child shrink
// below its content height so overflow-y-auto can actually engage.
const StatementsPanel = () => {
  const { t } = useTranslation();
  const statements = coreState((state) => state.statements);

  return (
    <div className="flex flex-col h-full min-h-0 p-4 pr-0 pt-0">
      <div className="text-4xl mt-4  ml-1 shrink-0">{t('Statements')}</div>
      <div className="flex-1 min-h-0 overflow-y-auto py-4">
        <StatementsList statements={statements} />
      </div>
    </div>
  );
};

const SortsPanel = () => {
  const { t } = useTranslation();
  const mainDataObject = coreState((state) => state.mainDataObject);
  const statements = coreState((state) => state.statements);
  const qSortPattern = coreState((state) => state.qSortPattern);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const showQsortsSpreadsheet = dataDisplayState((state) => state.showQsortsSpreadsheet);
  const showQsorts = dataDisplayState((state) => state.showQsorts);

  // Expensive: only recompute when the underlying data changes.
  const [sortsDisplayText, respondentNames, numUnforcedParts] = useMemo(() => {
    const statementNumArray = statements.map((_, index) => index + 1);
    return generateDisplaySortMaps(
      qSortPattern,
      mainDataObject,
      statementNumArray,
      multiplierArray
    );
  }, [qSortPattern, mainDataObject, statements, multiplierArray]);

  return (
    <div className="flex flex-col h-full min-h-0 pr-0 pt-0">
      <div className="flex flex-row gap-2 max-w-[85vw] justify-between mb-6 items-center flex-wrap shrink-0">
        <div className="text-4xl mt-8 mb-8 ml-1">{t('Participant Q Sorts')}</div>
        <div className="flex flex-row gap-4 max-w-[60vw]">
          <div className="flex flex-row items-center gap-4">
            <div className="text-[clamp(1.5rem,1.5vw,1.8rem)]">{t('Display sorts as')}</div>
            <DisplayDataQsortsButton />
            <DisplayDataSortsGridButton />
          </div>
        </div>
        <UnforcedSortsDisplay number={numUnforcedParts} display={numUnforcedParts === 0} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <section>
          {showQsortsSpreadsheet && <ParticipantsQsortsGrid data={mainDataObject} />}
          {showQsorts && (
            <SortsDisplayList
              sortsDisplayText={sortsDisplayText}
              respondentNames={respondentNames}
            />
          )}
        </section>
      </div>
    </div>
  );
};

const DownloadsPanel = () => {
  const { t } = useTranslation();
  const showExportButtons = inputState((state) => state.showExportButtons);

  return (
    <section className="py-3 mb-12">
      {showExportButtons ? (
        <>
          <div className="text-4xl mb-8 ml-1">{t('Downloads')}</div>
          <div className="flex flex-row flex-wrap w-4/5 items-center justify-between gap-4">
            <DownloadDatabookButton />
            <div className="flex flex-row gap-4 mt-1">
              <div className="text-[clamp(1.3rem,1.5vw,1.8rem)] font-bold self-center">
                {t('Export PQMethod')}
              </div>
              <div className="flex flex-row gap-4 mt-1">
                <StaFileButton />
                <DatFileButton />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row flex-wrap items-center text-center gap-4">
          <div className="text-[clamp(1.3rem,1.5vw,1.8rem)] ml-12! font-bold self-center">
            {t('Please verify Q Sorts to enable exports')}
          </div>
        </div>
      )}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  Data (tab shell)                                                          */
/* -------------------------------------------------------------------------- */

const TAB_BASE =
  'tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]';

// Bounded height + overflow-hidden so each panel's inner scroller takes over.
// Adjust 2.5rem to match your tab bar height.
const CONTENT_BASE =
  'tab-content bg-base-100 border-base-300 pl-6 pt-6 h-[calc(100%-2.5rem)] overflow-hidden';

const Data = () => {
  const { t } = useTranslation();

  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const isQsortPatternLoaded = inputState((state) => state.isQsortPatternLoaded);
  const areQsortsVerified = inputState((state) => state.areQsortsVerified);
  const dataActiveTab = dataDisplayState((state) => state.dataActiveTab);
  const updateDataActiveTab = dataDisplayState((state) => state.updateDataActiveTab);

  const tabs = [
    { id: 'tab1', title: t('Info'), Panel: InfoPanel },
    { id: 'tab2', title: t('Pattern'), Panel: PatternPanel },
    { id: 'tab3', title: t('Statements'), Panel: StatementsPanel },
    { id: 'tab4', title: t('Q Sorts'), Panel: SortsPanel, needsVerification: true },
    { id: 'tab5', title: t('Downloads'), Panel: DownloadsPanel },
  ];

  const tabColor = ({ id, needsVerification }) => {
    if (needsVerification && !areQsortsVerified) return 'bg-orange-button';
    return dataActiveTab === id ? 'tab-active bg-primary-button text-black' : 'bg-grey-button';
  };

  // todo - also require "areStatementsLoaded" so Data is inaccessible until all three are loaded
  if (!(areQsortsLoaded && isQsortPatternLoaded)) {
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

  return (
    <div className="bg-white box-border h-full text-black text-[clamp(1rem,1.5vw,1.1rem)]">
      <div className="tabs tabs-box flex bg-grey-button h-full rounded-none">
        {tabs.map((tab) => (
          <React.Fragment key={tab.id}>
            <input
              type="radio"
              name="data_tabs"
              className={`${TAB_BASE} ${tabColor(tab)}`}
              aria-label={tab.title}
              checked={dataActiveTab === tab.id}
              onChange={() => updateDataActiveTab(tab.id)}
            />
            <div className={CONTENT_BASE}>
              <tab.Panel />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Data;
