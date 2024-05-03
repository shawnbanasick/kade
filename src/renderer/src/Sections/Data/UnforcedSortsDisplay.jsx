import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import ConfirmButton from './UnforcedSortsDisplayButton';
import { useTranslation } from 'react-i18next';

const UnforcedSortsDisplay = (props) => {
  const { t } = useTranslation();

  if (props.display === true) {
    return (
      <Container>
        <p style={{ marginRight: 15 }}>{t('Confirm Q sorts')}:</p>
        <ConfirmButton number={0} />
      </Container>
    );
  } else {
    return (
      <Container>
        <p style={{ marginRight: 15 }}>{t('Confirm Q sorts')}:</p>
        <ConfirmButton number={props.number} />
      </Container>
    );
  }
};

export default view(UnforcedSortsDisplay);

const Container = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 50px;
  align-items: baseline;

  .p {
    margin-right: 15px;
  }
`;

/*
      <p style={{ marginRight: 15 }}>{props.data}</p>
*/
