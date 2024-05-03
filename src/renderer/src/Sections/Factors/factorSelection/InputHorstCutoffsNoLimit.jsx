import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import { useTranslation } from 'react-i18next';
import HorstNumberInput from './HorstNumberInput';
import getFactorState from '../../GlobalState/getFactorState';

const InputHorstCutoffsNoLimit = () => {
  const { t } = useTranslation();

  // getState
  const showHorstIterationLimit = getFactorState('showHorstIterationLimit');
  const horstIterations = getFactorState('horstIterations');

  if (showHorstIterationLimit) {
    return (
      <React.Fragment>
        <HorstIterationContainerDiv1>
          <TextSpanIterations>{`${t('Number of Iterations')}:  `}</TextSpanIterations>
          <HorstNumberInput
            style={{ width: 100 }}
            name={'horstIterations'}
            value={horstIterations}
            lowerLimit={1}
            upperLimit={10000}
          />
        </HorstIterationContainerDiv1>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default view(InputHorstCutoffsNoLimit);

const HorstIterationContainerDiv1 = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 70px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TextSpanIterations = styled.span`
  margin-right: 10px;
  width: 220px;
`;
