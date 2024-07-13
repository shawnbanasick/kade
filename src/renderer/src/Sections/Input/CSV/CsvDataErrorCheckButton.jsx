import React from 'react';
import styled from 'styled-components';

import GeneralButton from './../../../Utils/GeneralButton';
import getInputState from '../../GlobalState/getInputState';
// import standardImportErrorChecks from "../ErrorChecking/standardImportErrorChecks";
import { useTranslation } from 'react-i18next';

const handleOnclick = () => {
  // let passesTests = standardImportErrorChecks();
  console.log('no content');
};

const CsvDataErrorCheckButton = (props) => {
  const { t } = useTranslation();

  // getState
  const isActive = getInputState('isCsvDataErrorCheckButtonGreen');
  const showDataImportSuccessMessage = getInputState('showDataImportSuccessMessage');

  return (
    <Container>
      <TextDiv>
        <b>{props.number}</b> {t('Confirm Data Input')}
      </TextDiv>
      <TradButton
        as={GeneralButton}
        id="csvDataErrorCheckButton"
        $isActive={isActive}
        onClick={handleOnclick}
      >
        {t('Check for Errors')}
      </TradButton>
      {showDataImportSuccessMessage && <TextDiv>{t('No errors found')}.</TextDiv>}
    </Container>
  );
};

export default CsvDataErrorCheckButton;

const TradButton = styled.div`
  margin-right: 5px;
  box-shadow:
    inset 0 0 0 4px ${(props) => (props.isActive ? 'var(--main-theme-color)' : 'orange')},
    0 0 1px 0.6;
  background-color: ${(props) => (props.isActive ? 'var(--main-theme-color)' : 'orange')};

  box-shadow: ${(props) =>
    props.isActive
      ? 'inset 0 0 0 2px #666, 0 0 1px transparent'
      : 'inset 0 0 0 0px #666, 0 0 0px transparent'};

  &:hover {
    box-shadow:
      inset 0 0 0 4px #666,
      0 0 1px transparent;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.7;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: baseline;
  grid-row-start: ${(props) => props.gridRow};
  grid-column-start: 1;
  width: 900px;
`;

const TextDiv = styled.div`
  font-size: 20px;
  margin-right: 10px;
  margin-left: 8px;
`;
