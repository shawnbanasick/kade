import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import { useTranslation } from 'react-i18next';
import getFactorState from '../../GlobalState/getFactorState';

const HorstWarningMessage = () => {
  const { t } = useTranslation();
  const showHorstWarningMessage = getFactorState('didNotConverge');
  // const horstAutoStopYesActive = getFactorState("horstAutoStopYesActive");
  const horstIterations = getFactorState('horstIterations');

  if (showHorstWarningMessage) {
    return (
      <HorstNoConvergenceMessage>
        {`${t('No convergence')}: ${horstIterations} ${t('iterations')}`}
      </HorstNoConvergenceMessage>
    );
  } else {
    return null;
  }
};

export default view(HorstWarningMessage);

const HorstNoConvergenceMessage = styled.div`
  margin-bottom: 50px;
  font-size: 20px;
  background: #ffff00;
  min-width: 300px;
  padding: 3px 20px 3px 20px;
  width: max-content;
  border: 2px solid black;
`;
