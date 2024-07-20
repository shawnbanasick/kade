import styled from 'styled-components';
// import downloadDistStates from "./downloadDistStates";
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import outputState from '../../GlobalState/outputState';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  let tocText = t(
    '(MS Word Only) Table of Contents and Section Hyperlinks (will request permission to update links on file open)'
  );
  let zebraText = t('Zebra Striping');

  const updateUseTablesButtonActive = outputState((state) => state.updateUseTablesButtonActive);
  const updateUseClippedButtonActive = outputState((state) => state.updateUseClippedButtonActive);
  const updateUseClipped = outputState((state) => state.updateUseClipped);
  const updateUseTables = outputState((state) => state.updateUseTables);
  const useTablesButtonActive = outputState((state) => state.useTablesButtonActive);
  const willUseHyperlinks = outputState((state) => state.willUseHyperlinks);
  const useZebra = outputState((state) => state.useZebra);
  const useClippedButtonActive = outputState((state) => state.useClippedButtonActive);

  const clearAllButtons = () => {
    updateUseTablesButtonActive(false);
    updateUseClippedButtonActive(false);
  };

  const styles = {
    fontSize: 22,
    userSelect: 'none',
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    // clear all button highlighting
    if (buttonId === 'ContentUseTables') {
      clearAllButtons();
      updateUseTablesButtonActive(true);
      updateUseClipped(false);
      updateUseTables(true);
    }

    if (buttonId === 'ContentUseClipped') {
      clearAllButtons();
      updateUseClippedButtonActive(true);
      updateUseClipped(true);
      updateUseTables(false);
    }
  };

  const shouldDisplayDistStateListButtons = true;
  if (shouldDisplayDistStateListButtons) {
    return (
      <Container1>
        <span style={styles}>{t('Document Format')}</span>
        <hr style={{ width: '100%', marginBottom: 15 }} />
        <OptionStatementRow>
          <OptionStatementText>{`1. ${tocText}`}</OptionStatementText>
          <DocSelectionSwitch
            name="willUseHyperlinks"
            value="willUseHyperlinks"
            toggle={willUseHyperlinks}
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>{`2. ${zebraText}`}</OptionStatementText>
          <DocSelectionSwitch name="useZebra" value="useZebra" toggle={useZebra} />
        </OptionStatementRow>
        <StyledWrapper>
          <SortButton
            id={'ContentUseTables'}
            $isActive={useTablesButtonActive}
            onClick={handleOnclick}
            key={'f1'}
          >
            {t('Full-Length Statements')}
          </SortButton>
          <SortButton
            id={'ContentUseClipped'}
            $isActive={useClippedButtonActive}
            onClick={handleOnclick}
            key={'f2'}
          >
            {t('Truncated Statements')}
          </SortButton>
        </StyledWrapper>
      </Container1>
    );
  }
  return null;
};

export default DistStateListSortByButtons;

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;

  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }

  .downloadButton {
    margin-left: 120px;
  }
`;

const SortButton = styled(GeneralButton)`
  min-width: 120px;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3px;
  width: 300px;
  height: 260px;
  margin-bottom: 20px;
  // outline: 2px solid blue;
`;

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 25px;
`;

const OptionStatementText = styled.div`
  user-select: none;
  font-size: 16px;
`;
