import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import React from 'react';
import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const CsvSuccessfulLoadBar = () => {
  const hasAddedProjectName = getInputState('hasAddedProjectName');
  const sortsLoaded = getInputState('areQsortsLoaded');
  const statementsLoaded = getInputState('statementsLoaded');
  const isQsortPatternLoaded = getInputState('isQsortPatternLoaded');
  const showDataImportSuccessMessage = getInputState('showDataImportSuccessMessage');

  if (
    hasAddedProjectName &&
    sortsLoaded &&
    statementsLoaded &&
    isQsortPatternLoaded &&
    showDataImportSuccessMessage
  ) {
    inputState.showErrorMessageBar = false;
    return (
      <SuccessBar>
        <p>CSV Import Success -- Confirm Q sorts in the Data section</p>
      </SuccessBar>
    );
  }
  return null;
};

export default view(CsvSuccessfulLoadBar);

const SuccessBar = styled.div`
  background-color: var(--main-theme-color);
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: start;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 4;
  border-radius: 4px;
  border: 2px solid #d6dbe0;
  margin-top: 10px;
  width: 700px;
`;
