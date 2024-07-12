import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import outputState from '../../GlobalState/outputState';

const styles = {
  fontSize: 22,
  userSelect: 'none',
};

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();
  const willIncludeDataFiles = outputState((state) => state.willIncludeDataFiles);

  return (
    <Container1>
      <span style={styles}>{t('Data Files')}</span>
      <hr style={{ width: '100%', marginBottom: 15 }} />
      <OptionStatementRow>
        <OptionStatementText>{`1. ${t(
          'Export as KADE Zip File (including data input files)'
        )}`}</OptionStatementText>
        <DocSelectionSwitch
          name="willIncludeDataFiles"
          value="willIncludeDataFiles"
          toggle={willIncludeDataFiles}
        />
      </OptionStatementRow>
    </Container1>
  );
};

export default GeneralOptionsPanel;

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  user-select: none;
  font-size: 16px;
`;

const Container1 = styled.div`
  height: 100px;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 50px;
  // outline: 1px solid red;
`;
