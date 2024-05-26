import { Tab } from 'semantic-ui-react';
import React from 'react';

import styled, { keyframes } from 'styled-components';
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
import outputState from '../GlobalState/outputState';
import { useTranslation } from 'react-i18next';
import getOutputState from '../GlobalState/getOutputState';
import getVizState from '../GlobalState/getVizState';
import DownloadDocxOptionsBox from './DownloadResultsButtons/DownloadDocxOptionsBox';
import DocxFormatButtons from './DownloadResultsButtons/DocxFormatButtons';
import DocxIncludeDataOption from './DownloadResultsButtons/DocxIncludeDataOption';
import DownloadResultsAsDocx from './DownloadResultsButtons/DownloadResultsAsDocx';

let showTableDataNotSentWarning;

function notify() {
  toast.error('Error >>> Reset threshold levels', {
    className: 'outputToast',
    progressClassName: 'outputToastProgress',
    bodyClassName: 'outputToastBody',
  });
  outputState.notifyOutputDistStateError = false;
}

const Output = () => {
  const { t } = useTranslation();
  let displayState = outputState.showDocxOptions;

  const panes = [
    {
      menuItem: t('Options'),
      render: () => (
        <Tab.Pane>
          <OutputDataWindow1>
            {showTableDataNotSentWarning && <NoDataMessage>{t('No Data Click')}</NoDataMessage>}
            <DistStateSigLevelDrop1 />
            <DistStateSigLevelDrop2 />
            <FactorSelectionForOutputButtons />
            <DownloadResultsButtons />
            {displayState && (
              <OptionsContainer>
                <DownloadDocxOptionsBox />
                <RightColDiv>
                  <DocxFormatButtons />
                  <DocxIncludeDataOption />
                  <DownloadResultsAsDocx />
                </RightColDiv>
              </OptionsContainer>
            )}

            <NoLoadingsFlaggedWarningModal />
            <MultipleFactorsFlaggedWarningModal />
          </OutputDataWindow1>
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('Factor Characteristics'),
      render: () => (
        <Tab.Pane className="facChar">
          <OutputDataWindow2>
            <OutputFactorTablesTransitionContainer />
          </OutputDataWindow2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('Factors Table'),
      render: () => (
        <Tab.Pane className="facTablePane">
          <OutputDataWindow2>
            <FactorsTable />
          </OutputDataWindow2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('Distinguishing Statements'),
      render: () => (
        <Tab.Pane className="distState">
          <OutputDataWindow2>
            <DistinguishingStatementsList />
          </OutputDataWindow2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: t('Factor Visualizations'),
      render: () => (
        <React.Fragment>
          <ToastContainer transition={Zoom} autoClose={5000} />

          <Tab.Pane className="facVizPane">
            <OutputDataWindow2>
              <ButtonContainer1>
                <DisplayVisualizationsButtons />
                <ShowVizOptionsButton />
              </ButtonContainer1>

              <RefreshFactorVizButton marginTop={50} marginBottom={10} />
              <FactorVizOptions />
              <RefreshFactorVizButton marginTop={10} marginBottom={50} />

              <div style={{ height: 50 }} />

              <FactorVizDispatch />
            </OutputDataWindow2>
          </Tab.Pane>
        </React.Fragment>
      ),
    },
  ];

  function handleTabChange(e, { activeIndex }) {
    outputState.outputActiveTabIndex = activeIndex;
  }

  const activeIndex = getOutputState('outputActiveTabIndex');
  showTableDataNotSentWarning = getOutputState('showTableDataNotSentWarning');
  const facVizContainerHeight = getVizState('facVizContainerHeight');
  const facVizContainerWidth = getVizState('facVizContainerWidth');
  const showNotification = getOutputState('notifyOutputDistStateError');
  if (showNotification) {
    notify();
  }
  return (
    <OutputMainContent>
      <Tab
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        width={facVizContainerWidth}
        height={facVizContainerHeight}
      />
    </OutputMainContent>
  );
};

export default Output;

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

const OutputMainContent = styled.div`
  background-color: #d6dbe0;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  /* border: 2px solid red; */

  width: calc(100vw - 135px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

  .tabular-menu {
    display: grid;
    grid-template-columns: 100px 100px 140px 110px 150px 170px;
    background-color: #d6dbe0;
    padding-left: 20px !important;
    height: 45px;
    align-items: end;
    list-style: none;
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    font-size: 25px;
  }

  .tabular-menu-item {
    display: grid;
    align-items: center;
    justify-items: center;
    margin-right: 20px;
    background-color: #d6dbe0;
    height: 80%;
    border-top: 5px solid #d6dbe0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tabular-menu-item a {
    cursor: pointer;
    color: black;
  }

  .tabs-menu-item:not(.is-active):hover {
    color: #3498db;
    background-color: white;
  }

  .tabular-menu-item.is-active {
    color: #3498db;
    border-top: 5px solid #0080ff;
    transition: all 0.25s linear;
  }

  /* 
  .tabular-panel {
    padding: 10px 50px;
    background-color: white;
    padding-left: 20px !important;
  } */

  .outputToast {
    color: white;
    font-weight: bold;
  }

  .outputToastProgress {
    background-color: white;
  }

  .outputToastBody {
    color: white;
  }

  .Toastify__close-button {
    color: white;
  }

  .ui.bottom.attached.segment.active.tab {
    border-bottom-color: white;
    border-left-color: white;
    padding-right: 0px;
  }
`;

const OutputDataWindow1 = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: 80px 80px 80px 80fr 1fr;
  user-select: none;
  min-width: calc(100vw - 166px);
  height: calc(100vh - 80px);
  overflow: auto;
  box-sizing: border-box;
  /* border: 2px solid green; */
`;

const OutputDataWindow2 = styled.div`
  padding-top: 15px;
  background-color: white;
  user-select: none;
  height: calc(100vh - 48px);
  min-width: calc(100vw - 166px);
  overflow: auto;
  box-sizing: border-box;
`;
// max-height: calc(100vh-22px);
// padding: 5px;
// padding-top: 5px;
// padding-left: 5px;
// box-sizing: border-box;

const NoDataMessage = styled.div`
  font-size: 25px;
  margin-left: 50px;
  margin-top: 100px;
`;

const ButtonContainer1 = styled.div`
  display: flex;
  height: 50px;
  margin-left: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightColDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 448px;
  // outline: 2px solid orange;
`;

// const ScrollContainer = styled.div`
//   width: calc(100vw - 135);
//   height: calc(100vh - 25);
//   overflow: auto;
//   border: 2px solid #83cafe;
// `;

//<div class="ui bottom attached segment active tab distState"><div
// class="sc-gtfDJT dOVqJu"><h2 style="margin-top: 50px;
// margin-left: 50px;">Select factors for output in the Options tab</h2></div></div>
