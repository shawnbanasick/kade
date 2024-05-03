import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import LoadMotivationalData from './LoadMotivationalData';
import { useTranslation } from 'react-i18next';

const MotivationalCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardMeta>Motivational</CardMeta>
      <CardLabel>80 {t('Statements')}</CardLabel>
      <CardSubLabel>40 {t('Participants')}</CardSubLabel>
      <LoadMotivationalData />
    </Card>
  );
};
export default view(MotivationalCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 250px;
  width: 280px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 28px;
  font-weight: bold;
`;

const CardLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
`;

const CardSubLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
`;
