import React from 'react';

import styled from 'styled-components';
import CsvQsortsCard from './CsvQsortsCard';
import ProjectNameInput from './ProjectNameInput';
import CsvStatementCard from './CsvStatementCard';
import ForcedUnforcedRadio from './ForcedUnforcedRadio';
import CsvSuccessfulLoadBar from './CsvSuccessfulLoadBar';
import QsortDesignInputElement from './QsortDesignInputElement';
import { useTranslation } from 'react-i18next';
import CsvDataErrorCheckButton from './CsvDataErrorCheckButton';

const CsvPanel = () => {
  // const windowHeight = window.innerHeight - 100;
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header style={{ userSelect: 'none' }}>
        {t('Load both a statements TXT file and Q sorts CSV file')}
      </Header>
      <CardHolder>
        <CsvStatementCard />
        <CsvQsortsCard />
        <ProjectNameInput />
      </CardHolder>
      <ForcedUnforcedRadio number={'4.'} />
      <QsortDesignInputElement number={'5.'} />
      <CsvDataErrorCheckButton number={'6.'} />
      <CsvSuccessfulLoadBar />
    </DataWindow>
  );
};

export default CsvPanel;

// height: ${props => `${props.height}px`};
// 645px  ;
const DataWindow = styled.div`
  background-color: white;
  overflow: hidden;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 400px;
  grid-template-rows: 320px 50px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
  user-select: none;
`;
