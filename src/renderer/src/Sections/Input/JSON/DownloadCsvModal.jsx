import styled from 'styled-components';
import React from 'react';
import downloadCSVdata from './downloadCSVdata';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const handleClick = () => {
  const isJsonLoaded = getInputState('showJsonFileLoadedMessage');
  if (isJsonLoaded) {
    downloadCSVdata();
  } else {
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t('No data to download');
    inputState.extendedErrorMessage = i18n.t('No data available for download');
  }
};

const DownloadCsvModal = () => {
  const { t } = useTranslation();

  return (
    <GridContainerDiv>
      <LoadButton onClick={handleClick}>
        <LineContainer>
          <SvgContainer>
            <img src={CsvIcon} height="50px" alt="CSV Icon" />
          </SvgContainer>
          {t('Download JSON Data')}
        </LineContainer>
      </LoadButton>
    </GridContainerDiv>
  );
};
export default DownloadCsvModal;

const GridContainerDiv = styled.div`
  grid-column-start: 3;
  grid-row-start: 1;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10;
`;
