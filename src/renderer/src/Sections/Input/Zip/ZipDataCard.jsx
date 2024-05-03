import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import kadeZip from '../../images/kadeZip.png';
import LoadKadeZip from './LoadKadeZip';
import { useTranslation } from 'react-i18next';

const ExcelT3Card = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardMeta>
        <CardLabel>1. {t('KADE Zip File')}</CardLabel>
      </CardMeta>
      <Image>
        <img style={{ width: '250px', height: '175px' }} alt="KADE Zip File" src={kadeZip} />
      </Image>
      <LoadKadeZip />
    </Card>
  );
};
export default view(ExcelT3Card);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 340px;
  width: 320px;
  border: 2px solid darkgray;
  border-radius: 5px;
  margin-bottom: 50px;
`;

const Image = styled.div`
  background-color: white;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

const CardLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;
