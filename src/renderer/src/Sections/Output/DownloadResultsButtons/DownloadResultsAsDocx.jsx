import { useState } from 'react';
import styled from 'styled-components';
import { Button, Header, Modal } from 'semantic-ui-react';
// import downloadResultsAsCsv from "../downloadCsvLogic/downloadCsvOutputFile";
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import createOutputDoc from '../downloadDocxLogic/createOutputDoc';
import outputState from '../../GlobalState/outputState';

const DownloadResultsAsDocx = () => {
  const { t } = useTranslation();
  const [localStore, setLocalStore] = useState({
    modalOpen: false,
  });

  const handleClose = () => {
    setLocalStore({ modalOpen: false });
  };

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
    const userSelectedFactors = outputState((state) => state.userSelectedFactors);
    if (userSelectedFactors.length === 0) {
      setLocalStore({ modalOpen: true });
    } else {
      //downloadResultsAsCsv();
      createOutputDoc(translatedTextObj);
    }
  };

  const useZip = outputState((state) => state.willIncludeDataFiles);
  let buttonText;
  const buttonTextDocx = t('Download DOCX File');
  const buttonTextZip = t('Download KADE ZIP File');

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
          $isActive={active}
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
