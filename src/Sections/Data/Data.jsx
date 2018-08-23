import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import state from "../../store";
import SortsList from "./SortsList";
import StatementsList from "./StatementsList";

const localStore = store({
  statements: [],
  sortsDisplayText: [],
  projectName: "",
  numQsorts: 0,
  numStatements: 0,
  qSortPattern: []
});

class Data extends Component {
  render() {
    const {
      sortsDisplayText,
      statements,
      projectName,
      numQsorts,
      numStatements,
      qSortPattern
    } = state;

    localStore.sortsDisplayText = sortsDisplayText;
    localStore.statements = statements;
    localStore.projectName = projectName;
    localStore.numQsorts = numQsorts;
    localStore.numStatements = numStatements;
    localStore.qSortPattern = qSortPattern;

    return (
      <MainContent>
        <ProjectTitle>Project Data</ProjectTitle>
        <InformationContainer>
          <h2>Project Name: {projectName}</h2>
          <h2>Number Q sorts: {numQsorts}</h2>
          <h2>Number Statements: {numStatements}</h2>
          <h2>Q sort Pattern: {qSortPattern.toString()}</h2>
        </InformationContainer>
        <StatementListContainer>
          <h1>Statements</h1>
          <StatementsList statements={localStore.statements} />
        </StatementListContainer>
        <SortsListContainer>
          <h1>Q Sorts</h1>
          <SortsList displayText={localStore.sortsDisplayText} />
        </SortsListContainer>
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
  grid-template-columns: 190px 190px 190px 1fr;
  grid-template-rows: 100px 250px 1fr 1fr;
  grid-template-areas:
    "pageTitle pageTitle pageTitle pageTitle"
    "informationContainer informationContainer informationContainer informationContainer "
    "statementList statementList statementList statementList"
    "sortsList sortsList sortsList sortsList"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";

  /*
     
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
    */

  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
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

const ProjectTitle = styled.h1`
  grid-area: pageTitle;
  font-family: Helvetica, sans-serif;
  font-size: 50px;
  align-items: center;
  justify-items: center;
`;

const StatementListContainer = styled.div`
  grid-area: statementList;
`;

const SortsListContainer = styled.div`
  grid-area: sortsList;
`;

const InformationContainer = styled.div`
  grid-area: informationContainer;
`;
