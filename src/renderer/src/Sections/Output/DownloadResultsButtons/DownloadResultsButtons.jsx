import styled from 'styled-components';
import { Transition } from 'semantic-ui-react';
import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();

  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  return (
    <Transition visible={showDownloadOutputButtons} animation="fade" duration={1000}>
      <Container1>
        <OutputDownloadLabel>{t('Download complete output as')}</OutputDownloadLabel>
        <DownloadOutputButtons>
          <DownloadResultsAsExcel />
          <DownloadResultsAsCsv />
          <DownloadDocxFile />
        </DownloadOutputButtons>
      </Container1>
    </Transition>
  );
};

export default DownloadResultsButtons;

const DownloadOutputButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 47px;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 1000px;
  height: 100px;
  // outline: 2px solid purple;
`;

const OutputDownloadLabel = styled.div`
  width: fit-content;
  font-size: 24px;
  line-height: 1.2;
  margin-right: 5px;
`;

// const ButtonRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// `;

const Container1 = styled.div`
  height: 150px;
`;
