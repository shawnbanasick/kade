import React from 'react';
import styled from 'styled-components';
// import KandedCard from './Kanded/ExcelT3Card';
// import ForcedUnforcedRadio from './CSV/ForcedUnforcedRadio';
// import ZipErrorCheckButton from './Zip/ZipErrorCheckButton';
import { useTranslation } from 'react-i18next';

const KadePanel = () => {
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>{t('Load a KADE or Ken-Q Analysis (web) XLSX output file')}</Header>
      <CardHolder id="type3Panel">
        {/* <KandedCard />
        <ForcedUnforcedRadio startingRow={2} number={'2.'} />
        <ZipErrorCheckButton number={'3.'} gridRow={3} /> */}
      </CardHolder>
    </DataWindow>
  );
};

export default KadePanel;

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
