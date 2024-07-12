import React from 'react';
import styled from 'styled-components';
import downloadDistStates from './downloadDistStates';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  const updateThresholdButtonActive = outputState((state) => state.updateThresholdButtonActive);
  const updateQSortValueButtonActive = outputState((state) => state.updateQSortValueButtonActive);
  const updateStatementNumButtonActive = outputState(
    (state) => state.updateStatementNumButtonActive
  );
  const updateZScoreButtonActive = outputState((state) => state.updateZScoreButtonActive);
  const updateDistStateListSortKey = outputState((state) => state.updateDistStateListSortKey);

  const clearAllButtons = () => {
    updateThresholdButtonActive(false);
    updateQSortValueButtonActive(false);
    updateStatementNumButtonActive(false);
    updateZScoreButtonActive(false);
  };

  const handleDownload = () => {
    downloadDistStates();
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    // clear all button highlighting
    if (buttonId === 'thresholdButton') {
      clearAllButtons();
      updateThresholdButtonActive(true);
      updateDistStateListSortKey('threshold');
    }

    if (buttonId === 'qSortValueButton') {
      clearAllButtons();
      updateQSortValueButtonActive(true);
      updateDistStateListSortKey('qSortValue');
    }

    if (buttonId === 'statementNumButton') {
      clearAllButtons();
      updateStatementNumButtonActive(true);
      updateDistStateListSortKey('statementNum');
    }

    if (buttonId === 'zScoreButton') {
      clearAllButtons();
      updateZScoreButtonActive(true);
      updateDistStateListSortKey('zScore');
    }
  };

  const shouldDisplayDistStateListButtons = true;
  const thresholdButtonActive = outputState((state) => state.thresholdButtonActive);
  const qSortValueButtonActive = outputState((state) => state.qSortValueButtonActive);
  const statementNumButtonActive = outputState((state) => state.statementNumButtonActive);
  const zScoreButtonActive = outputState((state) => state.zScoreButtonActive);

  if (shouldDisplayDistStateListButtons) {
    return (
      <StyledWrapper>
        <TextLabel>{t('Sort By')}</TextLabel>
        <SortButton
          id={'thresholdButton'}
          isActive={thresholdButtonActive}
          onClick={handleOnclick}
          key={'f1'}
        >
          {t('Threshold')}
        </SortButton>
        <SortButton
          id={'qSortValueButton'}
          isActive={qSortValueButtonActive}
          onClick={handleOnclick}
          key={'f2'}
        >
          {t('Q Sort Value')}
        </SortButton>
        <SortButton
          id={'statementNumButton'}
          isActive={statementNumButtonActive}
          onClick={handleOnclick}
          key={'f3'}
        >
          {t('Number')}
        </SortButton>
        <SortButton
          id={'zScoreButton'}
          isActive={zScoreButtonActive}
          onClick={handleOnclick}
          key={'f4'}
        >
          {t('Z score')}
        </SortButton>
        <SortButton
          id={'downloadButton'}
          className="downloadButton"
          onClick={handleDownload}
          key={'f5'}
        >
          <LineContainer>
            <SvgContainer>
              <img src={CsvIcon} height="50px" alt="csv Icon" />
            </SvgContainer>
            {t('Download Data')}
          </LineContainer>
        </SortButton>
      </StyledWrapper>
    );
  }
  return null;
};

export default DistStateListSortByButtons;

/* 
          begin comparisons
           const lookupArray = [3.891, 3.291, 2.575, 1.96, 1.645, 1.44, 1.28];
          
           const pValuesTextArray = [
            "P < 0.0001",
            "P < 0.001",
            "P < 0.01",
            "P < 0.05",
            "P < 0.1",
            "P < 0.15"
            "P < 0.2"
          ];
          */

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;

  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }

  .downloadButton {
    margin-left: 120px;
  }
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

const TextLabel = styled.div`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const SortButton = styled(GeneralButton)`
  min-width: 120px;
`;
