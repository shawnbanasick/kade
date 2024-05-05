import React from 'react';
import styled, { keyframes } from 'styled-components';
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
  // const sortsDisplayText = coreState((state) => state.sortsDisplayText);
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

  // check for unforced participants??

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
      <MainContent>
        <ProjectTitle>{t('Project Data')}</ProjectTitle>
        <InformationContainer>
          <h2>
            {t('Project Name')}: {projectName}
          </h2>
          <h2>
            {t('Participants')}: {numQsorts}
          </h2>
          <h2>{`${t('Number of Statements')}: ${numStatements}`}</h2>
          {qSortPattern ? (
            <React.Fragment>
              <h2>{`${t('Q Sort Pattern')}: `}</h2>
              <QsortsPatternList texts={texts} />
            </React.Fragment>
          ) : null}
        </InformationContainer>
        <StatementListContainer>
          <h1>{`${t('Statements')}: `}</h1>
          <StatementsList statements={statements} />
        </StatementListContainer>
        <UnforcedContainer>
          {showUnforcedConfirmMessage && (
            <UnforcedSortsDisplay number={numUnforcedParts} display={displayForcedComfirmMessage} />
          )}
          {showExportButtons && (
            <>
              <ExportText>{t('Export PQMethod')}</ExportText>
              <StaFileButton />
              <DatFileButton />
            </>
          )}
        </UnforcedContainer>
        <SortsListContainer>
          <ButtonsContainer>
            <h1>{`${t('Display Participant Q Sorts as')}: `}</h1>
            <DisplayDataQsortsButton />
            <DisplayDataSortsGridButton />
            <DownloadDatabookButton />
          </ButtonsContainer>
          {showQsortsSpreadsheet && <ParticipantsQsortsGrid data={mainDataObject} />}
          {showQsorts && (
            <SortsDisplayList
              sortsDisplayText={sortMapsArray[0]}
              respondentNames={sortMapsArray[1]}
            />
          )}
        </SortsListContainer>{' '}
      </MainContent>
    );
  } else {
    return (
      <NoDataDiv>
        <h2>{t('No data loaded')}</h2>
        <p>
          {t(
            'Confirm that the statements, Q sorts, and the Q sort pattern have all been entered correctly'
          )}
        </p>
      </NoDataDiv>
    );
  }
};

export default Data;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 190px 270px 190px 1fr;
  grid-template-rows: 100px 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'pageTitle pageTitle pageTitle pageTitle'
    'informationContainer informationContainer informationContainer informationContainer '
    'statementList statementList statementList statementList'
    'unforcedContainer unforcedContainer unforcedContainer unforcedContainer'
    'sortsList sortsList sortsList sortsList'
    'linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2';
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 5px;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;

  width: calc(100vw - 135px);
  max-height: calc(100vh - 22px);
  box-sizing: border-box;
  overflow: auto;
  user-select: none;
`;

const NoDataDiv = styled.div`
  margin: 50px;
`;

const ProjectTitle = styled.h1`
  grid-area: pageTitle;
  font-family: Helvetica, sans-serif;
  font-size: 50px;
  align-items: center;
  justify-items: center;
`;

const StatementListContainer = styled.div`
  grid-area: statementList;
  padding-top: 30px;
  padding-bottom: 50px;
`;

const SortsListContainer = styled.div`
  grid-area: sortsList;
  min-height: 1000px;
`;

const InformationContainer = styled.div`
  grid-area: informationContainer;
`;

const UnforcedContainer = styled.div`
  grid-area: unforcedContainer;
  display: flex;
  flex-direction: row;
  height: 80px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 50px;
  align-items: baseline;
`;

const ExportText = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-right: 15px;
  margin-left: 50px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
