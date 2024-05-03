import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
import factorState from '../GlobalState/factorState';
import getFactorState from '../GlobalState/getFactorState';
import projectHistoryState from '../GlobalState/projectHistoryState';
import getProjectHistoryState from '../GlobalState/getProjectHistoryState';
import rotationState from '../GlobalState/rotationState';
import loadingState from '../GlobalState/loadingState';
import outputState from '../GlobalState/outputState';
import appState from '../GlobalState/appState';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const localStore = store({
  modalOpen: false
});

function handleOpen() {
  // State
  const numFactors = getFactorState('numCentroidFactors');

  if (isNaN(numFactors)) {
    localStore.modalOpen = true;
  } else {
    localStore.modalOpen = true;
  }
}

function handleClose() {
  localStore.modalOpen = false;
}

function resetAnalysis() {
  // getState
  const projectHistoryArray = getProjectHistoryState('projectHistoryArray');

  const newProjectHistoryArray = [projectHistoryArray.shift()];
  const userSelectedRotFactors = [];
  const abFactors = [];

  projectHistoryState.projectHistoryArray = newProjectHistoryArray;
  // reset num factors kept for rotation - so warning modal triggers on no selected
  rotationState.numFactorsKeptForRot = undefined;

  // hide section 3
  factorState.showUnrotatedFactorTable = false;
  factorState.showEigenvaluesTable = false;
  factorState.showScreePlot = false;
  factorState.didNotConverge = false;

  factorState.activePcaButton = false;
  factorState.activeCentroidRevealButton = false;
  factorState.activeTraditionalCentroidFactorButton = false;
  factorState.activeHorst55CentroidButton = false;
  factorState.activeTuckerMacCallumCentroidButton = false;

  factorState.centroid1FactorsActive = false;
  factorState.centroid2FactorsActive = false;
  factorState.centroid3FactorsActive = false;
  factorState.centroid4FactorsActive = false;
  factorState.centroid5FactorsActive = false;
  factorState.centroid6FactorsActive = false;
  factorState.centroid7FactorsActive = true;
  factorState.centroid8FactorsActive = false;

  factorState.isPcaButtonDisabled = false;
  factorState.isCentroidRevealButtonDisabled = false;
  factorState.isTraditionalCentroidDisabled = false;
  factorState.isHorst55Disabled = false;
  factorState.isTuckerMacCallumCentroidDisabled = false;
  factorState.isCentroidFacSelectDisabled = false;
  factorState.isCentroidExtractButtonDisabled = false;

  factorState.numCentroidFactors = 7;
  factorState.showCentroidSelection = false;
  factorState.showUseHorstLimit = false;
  factorState.showHeywoodCaseNotifications = false;
  factorState.heywoodButtonDisabled = false;
  factorState.heywoodAdjustButtonActive = false;
  factorState.heywoodContinueButtonActive = false;

  factorState.horstAutoStopYesActive = false;
  factorState.horstAutoStopNoDisabled = false;
  factorState.horstAutoStopNoActive = false;
  factorState.horstAutoStopYesDisabled = false;
  factorState.showUseHorstIterationSetup = false;
  factorState.showHorstIterationLimit = false;
  factorState.showNumberOfCentroidFacToExtract = false;

  factorState.horstExtractActive = false;
  factorState.horstExtractDisabled = false;

  // pcaButtonText: "Principal Components",
  // calculatingPca: false

  // set rotation active tab view
  rotationState.rotationActiveTabIndex = 0;
  // reset centroid factors dropdown

  // factor select re-enable
  rotationState.isFacSelectDisabled = false;

  // hide section 4
  rotationState.shouldDisplayFacKept = false;
  rotationState.showKeepFacForRotButton = false;
  rotationState.varimaxButtonDisabled = false;
  rotationState.varimaxButtonText = 'Varimax Rotation';
  rotationState.varimaxButtonActive = false;

  // reset manual rotation
  rotationState.shouldShowJudgeRotDiv = false;
  rotationState.judgeButtonActive = false;
  rotationState.showScatterPlotTableDiv = false;
  rotationState.abFactors = abFactors;
  rotationState.highlightRotfactor1 = false;
  rotationState.highlightRotfactor2 = false;
  rotationState.highlightRotfactor3 = false;
  rotationState.highlightRotfactor4 = false;
  rotationState.highlightRotfactor5 = false;
  rotationState.highlightRotfactor6 = false;
  rotationState.highlightRotfactor7 = false;
  rotationState.highlightRotfactor8 = false;
  rotationState.userSelectedRotFactors = userSelectedRotFactors;

  rotationState.factor1Active = false;
  rotationState.factor2Active = false;
  rotationState.factor3Active = false;
  rotationState.factor4Active = false;
  rotationState.factor5Active = false;
  rotationState.factor6Active = false;
  rotationState.factor7Active = false;
  rotationState.factor8Active = false;

  rotationState.variContinueButtonActive = false;
  rotationState.variContinueButtonDisabled = false;
  rotationState.variAdjustButtonActive = false;
  rotationState.variAdjustButtonDisabled = false;
  rotationState.variPqmAdjustButtonActive = false;
  rotationState.variPqmAdjustButtonDisabled = false;

  // bipolar
  loadingState.bipolarDisabled = false;
  loadingState.bipolarSplitCount = 0;
  // hide section 5
  loadingState.showLoadingsTable = false;
  loadingState.sendDataToOutputButtonColor = '#d6dbe0';
  loadingState.splitFactorsArrayArchive = [];
  loadingState.splitFactorsArray = [
    {
      key: 'factor1',
      text: '1',
      value: 1
    },
    {
      key: 'factor2',
      text: '2',
      value: 2
    },
    {
      key: 'factor3',
      text: '3',
      value: 3
    },
    {
      key: 'factor4',
      text: '4',
      value: 4
    },
    {
      key: 'factor5',
      text: '5',
      value: 5
    },
    {
      key: 'factor6',
      text: '6',
      value: 6
    },
    {
      key: 'factor7',
      text: '7',
      value: 7
    },
    {
      key: 'factor8',
      text: '8',
      value: 8
    }
  ];

  // hide section 6
  outputState.showOutputFactorSelection = false;
  outputState.shouldDisplayFactorVizOptions = false;
  outputState.showFactorCorrelationsTable = false;
  outputState.showStandardErrorsDifferences = false;
  outputState.showFactorCharacteristicsTable = false;
  outputState.showDownloadOutputButtons = false;
  outputState.showTableDataNotSentWarning = true;
  outputState.userSelectedFactors = [];
  outputState.displayFactorVisualizations = false;
  outputState.showDocxOptions = false;
  outputState.downloadDocxButtonActive = false;

  outputState.thresholdButtonActive = false;
  outputState.qSortValueButtonActive = false;
  outputState.statementNumButtonActive = true;
  outputState.zScoreButtonActive = false;
  outputState.distStateListSortKey = 'statementNum';

  appState.isLoadingsButtonGreen = false;
  appState.isRotationButtonGreen = false;
  appState.isFactorsButtonGreen = false;
  appState.isOutputButtonGreen = false;

  // reset dist statements list button

  handleClose();
}

const ResetAnalysisButton = () => {
  const { t } = useTranslation();

  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <GeneralButton id="resetAnalysisButton" style={{ marginLeft: 275 }} onClick={handleOpen}>
          {t('Reset Analysis')}
        </GeneralButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content="Reset Analysis" />
      <Modal.Content>
        <h2>{t('This will remove the current analysis and cannot be reversed')}</h2>
        <h2> {t('Are you sure you want to reset')}</h2>
      </Modal.Content>
      <Modal.Actions>
        <div style={{ display: 'flex' }}>
          <Button
            size={'big'}
            style={{ alignSelf: 'flexStart' }}
            color="green"
            onClick={handleClose}
            inverted
          >
            {t('No Go back')}
          </Button>
          <Button
            id="resetAnalysisModalGotItButton"
            size={'big'}
            style={{ alignSelf: 'flexEnd', marginLeft: 220 }}
            color="red"
            onClick={resetAnalysis}
            inverted
          >
            {t('Yes reset the analysis')}
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default view(ResetAnalysisButton);
