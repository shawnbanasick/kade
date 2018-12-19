import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import ClearProjectModal from './ClearProjectModal';
// function handleClick() {
//     const initialStateValues = initialState();
//     state.setState(initialStateValues);
// }


class ClearProject extends Component {
  render() {
    return (
      <MainContent>
        <h1>Clear Project</h1>
        <h2>Click this button to begin a new project. This will clear all data and analysis from the current project. The action cannot be reversed.</h2>
        <ClearProjectModal />
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


// 240px 240px 240px 240px;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;

  /* grid-template-columns: 1fr 10px;
  grid-template-rows: 220px 220px 1fr; */
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

  width: calc(100vw - 122px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: hidden;
`;

