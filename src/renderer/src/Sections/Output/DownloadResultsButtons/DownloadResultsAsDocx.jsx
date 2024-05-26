import React from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
// import downloadResultsAsCsv from "../downloadCsvLogic/downloadCsvOutputFile";
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';
import createOutputDoc from '../downloadDocxLogic/createOutputDoc';

const localStore = store({
  modalOpen: false,
});

const handleClose = () => {
  localStore.modalOpen = false;
};

const DownloadResultsAsDocx = () => {
  const { t } = useTranslation();

  let projectOverTxt = t('Project Overview');
  let projectLogTxt = t('Project Log');
  let downloadTxt = t('Analysis results downloaded on');
  let correlationMatrixTxt = t('Correlation Matrix');
  let diagonalText = t('Diagonal Entries are Standard Errors within Factors');
  let contributingText = t('Contributing Q Sorts');
  let relativeWeightsText = t('Relative Weights');
  let factorZScoresTxt = t("Factor Z-scores, Q sort values, and contributors' raw sort values");
  let flaggedFactorLoadingsText = t(
    'Flagged factor loadings are listed using bold font and orange highlighting'
  );
  let contTxt = t('cont');
  let noDistinguishingText = t('No distinguishing statements for this factor');

  let translatedTextObj = {
    projectOverTxt,
    projectLogTxt,
    downloadTxt,
    correlationMatrixTxt,
    diagonalText,
    contributingText,
    relativeWeightsText,
    factorZScoresTxt,
    flaggedFactorLoadingsText,
    contTxt,
    noDistinguishingText,
  };

  const handleOpen = () => {
    // getState
    const userSelectedFactors = getOutputState('userSelectedFactors');
    if (userSelectedFactors.length === 0) {
      localStore.modalOpen = true;
    } else {
      //downloadResultsAsCsv();
      createOutputDoc(translatedTextObj);
    }
  };

  let buttonText;
  const buttonTextDocx = t('Download DOCX File');
  const buttonTextZip = t('Download KADE ZIP File');
  let useZip = getOutputState('willIncludeDataFiles');
  if (useZip) {
    buttonText = buttonTextZip;
  } else {
    buttonText = buttonTextDocx;
  }

  const { active } = localStore;
  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <DocxButton
          as={GeneralButton}
          id="downloadResultsAsDocxButton"
          isActive={active}
          onClick={handleOpen}
        >
          {buttonText}
        </DocxButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content={t('Analysis Output')} />
      <Modal.Content>
        <span style={{ fontSize: 30 }}>{t('Select the factors to output first')}</span>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="downloadResultsAsCsvModalGotItButton"
          size={'huge'}
          color="green"
          onClick={handleClose}
          inverted
        >
          {t('Got it')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DownloadResultsAsDocx;

const DocxButton = styled.div`
  min-width: 250px;
  background-color: orange;
  // margin-top: 60px;
`;
