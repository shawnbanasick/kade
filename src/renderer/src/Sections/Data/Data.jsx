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

  if (areQsortsLoaded && isQsortPatternLoaded) {
    return (
      <main className="w-[calc(100vw-135px)] max-h-[calc(100vh-22px)] overflow-auto bg-white p-4 pt-6 pl-6 pb-5 select-none font-sans text-lg animate-fade-in">
        {/* Project Title */}
        <h1 className="text-5xl font-bold mb-8">{t('Project Data')}</h1>

        {/* Information Container */}
        <section className="mb-8 space-y-2">
          <h2 className="text-2xl font-semibold">
            {t('Project Name')}: <span className="font-normal">{projectName}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            {t('Participants')}: <span className="font-normal">{numQsorts}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            {t('Number of Statements')}: <span className="font-normal">{numStatements}</span>
          </h2>
          {qSortPattern && (
            <>
              <h2 className="text-2xl font-semibold">{t('Q Sort Pattern')}:</h2>
              <QsortsPatternList texts={texts} />
            </>
          )}
        </section>

        {/* Statement List Container */}
        <section className="py-8 mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('Statements')}:</h1>
          <StatementsList statements={statements} />
        </section>

        {/* Unforced Container */}
        <div className="flex flex-row items-baseline h-[70px] justify-between gap-4 mt-4 max-w-[60vw] border-2 border-red-500 mb-4">
          {showUnforcedConfirmMessage && (
            <UnforcedSortsDisplay number={numUnforcedParts} display={displayForcedComfirmMessage} />
          )}
          {showExportButtons && (
            <div className="flex flex-row items-center text-center gap-4">
              <div className="text-[clamp(1.3rem,1.5vw,1.8rem)] font-bold self-center align-center ">
                {t('Export PQMethod')}
              </div>
              <div className="flex flex-row gap-4 mt-1">
                <StaFileButton />
                <DatFileButton />
              </div>
            </div>
          )}
        </div>

        {/* Sorts List Container */}
        <section className="min-h-[1000px]">
          <div className="flex flex-row items-center gap-4 max-w-[60vw] justify-between">
            <div className="flex flex-row items-center gap-4">
              <div className="text-[clamp(1.3rem,1.5vw,1.8rem)] font-bold">
                {t('Display Participant Q Sorts as')}
              </div>
              <DisplayDataQsortsButton />
              <DisplayDataSortsGridButton />
            </div>
            <DownloadDatabookButton />
          </div>
          {showQsortsSpreadsheet && <ParticipantsQsortsGrid data={mainDataObject} />}
          {showQsorts && (
            <SortsDisplayList
              sortsDisplayText={sortMapsArray[0]}
              respondentNames={sortMapsArray[1]}
            />
          )}
        </section>
      </main>
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
