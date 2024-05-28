import styled from 'styled-components';
import ExcelT1Card from './Excel/ExcelT1Card';
import ExcelT2Card from './Excel/ExcelT2Card';
// import ForcedUnforcedRadio from './CSV/ForcedUnforcedRadio';
import { useTranslation } from 'react-i18next';
// import ZipErrorCheckButton from './Zip/ZipErrorCheckButton';

const ExcelPanel = () => {
  const [t] = useTranslation();

  return (
    <DataWindow>
      <Header>{t('Load a Type 1 OR Type 2 Spreadsheet (XLSX) File')}</Header>
      <CardHolder id="excelPanelWindow">
        <ExcelT1Card />
        <ExcelT2Card />
        {/* <ForcedUnforcedRadio startingRow={2} number={'2.'} /> */}
        {/* <ZipErrorCheckButton number={'3.'} gridRow={3} /> */}
      </CardHolder>
    </DataWindow>
  );
};

export default ExcelPanel;

const DataWindow = styled.div`
  min-height: ${(props) => props.height};
  width: calc(100vw-135);
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
