import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import React from 'react';
import state from '../../store';
import ExtendedErrorModal from '../Input/ExtendedErrorModal';

function handleOnClick() {
  state.setState({
    showErrorMessageBarOutput: false,
    errorStackTrace: 'no stack trace available'
  });
}

const ErrorNotificationOutput = () => {
  const showErrorMessageBarOutput = true; // state.getState(
  //   "showErrorMessageBarOutput"
  console.log('ErrorNotificationOUtput');
  // );
  const errorMessage = state.getState('errorMessage');
  if (showErrorMessageBarOutput) {
    return (
      <ErrorBar>
        <div>Error - {errorMessage}</div>
        <ExtendedErrorModal />
        <StyledWrapper>
          <Button className="wrapper1" onClick={handleOnClick}>
            Close
          </Button>
        </StyledWrapper>
      </ErrorBar>
    );
  }
  return null;
};

export default view(ErrorNotificationOutput);

const ErrorBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-items: center;
  left: 155px;
  bottom: 50;
  margin-bottom: 5px;
  z-index: 9999;
  width: calc(100vw - 188px);
  background-color: rgba(255, 102, 102, 0.8);
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 
   #ff6666
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: -1; */
  border-radius: 4px;
`;

const StyledWrapper = styled.div`
  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      /* margin-top: 3px; */
    }
  }
`;
