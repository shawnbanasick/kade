import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
// import downloadDistStates from "./downloadDistStates";
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';

const clearAllButtons = () => {
  outputState.useTablesButtonActive = false;
  outputState.useClippedButtonActive = false;
};

const styles = {
  fontSize: 22,
  userSelect: 'none'
};

const handleOnclick = (event) => {
  const buttonId = event.target.id;

  // clear all button highlighting
  if (buttonId === 'ContentUseTables') {
    clearAllButtons();
    outputState.useTablesButtonActive = true;
    outputState.useClipped = false;
    outputState.useTables = true;
  }

  if (buttonId === 'ContentUseClipped') {
    clearAllButtons();
    outputState.useClippedButtonActive = true;
    outputState.useClipped = true;
    outputState.useTables = false;
  }
};

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  let tocText = t(
    '(MS Word Only) Table of Contents and Section Hyperlinks (will request permission to update links on file open)'
  );
  let zebraText = t('Zebra Striping');

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
            toggle={outputState.willUseHyperlinks}
          />
        </OptionStatementRow>
        <OptionStatementRow>
          <OptionStatementText>{`2. ${zebraText}`}</OptionStatementText>
          <DocSelectionSwitch name="useZebra" value="useZebra" toggle={outputState.useZebra} />
        </OptionStatementRow>
        <StyledWrapper>
          <SortButton
            id={'ContentUseTables'}
            isActive={outputState.useTablesButtonActive}
            onClick={handleOnclick}
            key={'f1'}
          >
            {t('Full-Length Statements')}
          </SortButton>
          <SortButton
            id={'ContentUseClipped'}
            isActive={outputState.useClippedButtonActive}
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

export default view(DistStateListSortByButtons);

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
