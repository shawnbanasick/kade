import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import initialState from '../../initialState';
import state from '../../store';
import { Button } from 'semantic-ui-react';

function handleClick() {
    console.log(JSON.stringify("clicked"));
    const initialStateValues = initialState();
    state.setState(initialStateValues);
}


class ClearProject extends Component {
    render() {
        return (
            <MainContent>
              <h1>Clear Project</h1>
              <h2 style={ { width: 800 } }>Click this button to begin a new project. This will clear all data and analysis from the current project. The action cannot be reversed.</h2>
              <BeginAnalysisButton onClick={ handleClick } size='large'>Clear Project</BeginAnalysisButton>
            </MainContent>
            );
    }
}

export default view(ClearProject);

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

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;

// 240px 240px 240px 240px;
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 220px 1fr;
  /* grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "subtitleRow subtitleRow subtitleRow subtitleRow"
    "subtitleRow2 subtitleRow2 subtitleRow2 subtitleRow2"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow2 linkboxRow2"
    "linkboxRow3 linkboxRow3 linkboxRow4 linkboxRow4"; */
  justify-items: center;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;

  width: calc(100vw - 125px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;
`;

const BeginAnalysisButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 40px;
  width: 200px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: bold
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    margin-left: 3px;
    transform: translateY(1px);  
  }
`;
