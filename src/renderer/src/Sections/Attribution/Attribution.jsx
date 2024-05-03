import { view } from '@risingstack/react-easy-state';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import state from '../../store';
import initialState from '../../initialState';

function handleClick() {
  const initialStateValues = initialState();
  state.setState(initialStateValues);
}

const Attribution = () => {
  return (
    <MainContent>
      <h1>Attribution</h1>
      <Button onClick={handleClick} size="large">
        Reset State
      </Button>
    </MainContent>
  );
};

export default view(Attribution);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

// 240px 240px 240px 240px;
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 20px 155px 50px 30px 115px 120px 180px 20px;
  grid-template-areas:
    'row1 row1 row1 row1'
    'titleRow titleRow titleRow titleRow'
    'subtitleRow subtitleRow subtitleRow subtitleRow'
    'subtitleRow2 subtitleRow2 subtitleRow2 subtitleRow2'
    'weblinkRow weblinkRow weblinkRow weblinkRow'
    'linkboxRow1 linkboxRow1 linkboxRow2 linkboxRow2'
    'linkboxRow3 linkboxRow3 linkboxRow4 linkboxRow4';
  justify-items: center;
  align-items: center;
  background-color: white;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;

  width: calc(100vw - 125px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;
`;
