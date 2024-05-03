import { view } from '@risingstack/react-easy-state';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import TypeOfAnalysisTransitionContainer from './TypeOfAnalysisTransitionContainer';
import UnrotatedFactorsTransitionContainer from './UnrotatedFactorsTransitionContainer';
import CentroidSelection from './CentroidSelection';
import SelectNumberOfCentroidFactorsButtons from './SelectNumberOfCentroidFactorsButtons';
import UseHorstAutoStop from './factorSelection/UseHorstAutoStop';
import { useTranslation } from 'react-i18next';
import InputHorstCutoffs from './factorSelection/InputHorstCutoffs';
import HeywoodCaseNotification from './factorSelection/HeywoodCaseNotification';
import InputHorstCutoffsNoLimit from './factorSelection/InputHorstCutoffsNoLimit';
import getCorrelationState from '../GlobalState/getCorrelationState';
import getFactorState from '../GlobalState/getFactorState';

const Factors = () => {
  const { t } = useTranslation();

  // getState
  const showCentroidError = getFactorState('showCentroidError');
  const showCorrelationMatrix = getCorrelationState('showCorrelationMatrix');

  return (
    <MainContent>
      {showCorrelationMatrix ? (
        <TypeOfAnalysisTransitionContainer style={{ gridArea: 'row1' }} />
      ) : (
        <DefaultMessage>{t('Calculate correlations first')}</DefaultMessage>
      )}
      <CentroidSelection />
      <UseHorstAutoStop />
      <InputHorstCutoffsNoLimit />
      <SelectNumberOfCentroidFactorsButtons />
      <InputHorstCutoffs />
      <HeywoodCaseNotification />
      <UnrotatedFactorsTransitionContainer />
      {showCentroidError ? <ErrorNotification /> : null}
    </MainContent>
  );
};

export default view(Factors);

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
  display: flex;
  flex-direction: column;
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2"; */
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;
  box-sizing: border-box;
  overflow: auto;
  user-select: none;
`;
// width: calc(100vw - 135px);

// max-height: calc(100vh - 22px);

const DefaultMessage = styled.div`
  font-size: 22px;
`;
