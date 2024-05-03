import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import { useTranslation } from 'react-i18next';
import netlifyImage from '../../images/netlify-sorts-data-image.png';
import NetlifyLoadCsv from './NetlifyLoadCsv';

const CsvQsortsCard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardMeta>
        <CardLabel>2. {t('Load Netlify CSV File')}</CardLabel>
      </CardMeta>
      <center>
        <Image>
          <img
            style={{ width: '250px', height: '165px' }}
            alt="Q sorts sample"
            src={netlifyImage}
          />
        </Image>
      </center>
      <NetlifyLoadCsv />
    </Card>
  );
};
export default view(CsvQsortsCard);

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 300px;
  width: 280px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

const Image = styled.div`
  background-color: white;
  width: 275px;
  height: 175px;
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
