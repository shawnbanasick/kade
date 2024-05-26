import React from 'react';
import styled from 'styled-components';
// import ForcedUnforcedRadio from './CSV/ForcedUnforcedRadio';
import PQMethodStaCard from './PQMethod/PQMethodStaCard';
import PQMethodQsortsCard from './PQMethod/PQMethodQsortsCard';
// import ZipErrorCheckButton from './Zip/ZipErrorCheckButton';
import { useTranslation } from 'react-i18next';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>{t('Load both a statements STA file and Q sorts DAT file')}</Header>
      <CardHolder id="pqmethodPanel">
        <PQMethodStaCard />
        <PQMethodQsortsCard />
        {/* <ForcedUnforcedRadio startingRow={2} number={'3.'} />
        <ZipErrorCheckButton number={'4.'} gridRow={3} /> */}
      </CardHolder>
    </DataWindow>
  );
};

export default CsvPanel;

const DataWindow = styled.div`
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 350px 75px 120px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
