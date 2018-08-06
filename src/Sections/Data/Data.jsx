import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import state from "../../store";
import SortsList from "./SortsList";
import StatementsList from "./StatementsList";

const localStore = store({ statements: [], sortsDisplayText: [] });
//  statements, qSortPattern, numQsorts, numStatements, respondentNames,

class Data extends Component {
  render() {
    const { sortsDisplayText, statements } = state;

    localStore.sortsDisplayText = sortsDisplayText;
    localStore.statements = statements;
    return (
      <MainContent>
        <ProjectTitle>Project Data</ProjectTitle>
        <StatementsList statements={localStore.statements} />
        <SortsList displayText={localStore.sortsDisplayText} />
      </MainContent>
    );
  }
}

export default view(Data);

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
  /*
   grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2"; 
    
     
  ::-webkit-scrollbar {
    background-color: #fff;
    width: 0.8em;
  }

  ::-webkit-scrollbar-thumb:window-inactive,
  ::-webkit-scrollbar-thumb {
    background: black;
  }
width: 95%;
  height: 95%;

  overflow: scroll;
  padding: 5px;
  padding-top: 15px;

    */
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;

  width: calc(100vw - 153px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;
`;

const ProjectTitle = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 28px;
`;
