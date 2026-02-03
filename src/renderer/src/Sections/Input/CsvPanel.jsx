import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LoadCsvStatements from './CSV/LoadCsvStatements';
import CsvStatementCard from './CSV/CsvStatementCard';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>{t('Load Statements File')}</Header>
      <CardHolder id="kadeZipPanel">
        <CsvStatementCard>
          {/* <LoadCsvStatements /> */}
        </CsvStatementCard>
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
  grid-template-rows: 380px 40px 60px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
