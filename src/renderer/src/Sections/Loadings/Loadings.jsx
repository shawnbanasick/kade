import React from 'react';

import styled, { keyframes } from 'styled-components';
import LoadingsTableTransitionContainer from './LoadingsTableTransitionContainer';

// import styled from "styled-components";

const Loadings = () => {
  return (
    <MainContent>
      <LoadingsTableTransitionContainer />
    </MainContent>
  );
};

export default Loadings;

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

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;
  width: calc(100vw - 135px);
  overflow: auto;
  user-select: none;
`;
