import React from 'react';
import styled from 'styled-components';

import { Transition } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import getRotationState from '../../GlobalState/getRotationState';

// import "./FactorsKeptNotification.css";

const FactorsKeptNotification = () => {
  const { t } = useTranslation();

  const numFactorsKept = getRotationState('numFactorsKeptForRot');
  const shouldDisplayDiv = getRotationState('shouldDisplayFacKept');

  // if (shouldDisplayDiv) {
  return (
    <Transition visible={shouldDisplayDiv} animation="fade" duration={1000}>
      <FactorsKeptDiv className="factorsKeptDiv">
        {`${t('Factors kept for rotation')}: `} {numFactorsKept}
        <br />
        <br />
        <br />
        {t('Click the Varimax or Judgmental tabs for more options')}
      </FactorsKeptDiv>
    </Transition>
  );
  // }
  // return null;
};

export default FactorsKeptNotification;

const FactorsKeptDiv = styled.div`
  margin-top: 20px;
  font-size: 25px;
  line-height: 1.4em;
`;
