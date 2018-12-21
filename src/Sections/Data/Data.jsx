import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import state from "../../store";
import StatementsList from "./StatementsList";
import ParticipantsQsortsGrid from "./ParticipantQsortsGrid";
import calcMultiplierArrayT2 from '../Input/Excel/excelLogic/calcMultiplierArrayT2';
import QsortsPatternList from './QsortsPatternList'

const localStore = store({
  sortsDisplayText: [],
  statements: [],
  projectName: "",
  numQsorts: 0,
  numStatements: 0,
  qSortPattern: ["none"],
  multiplierArray: [],
  mainDataObject: []
});

function calcPatternArray(multiplierArray) {
  const labelArray = ["-6", "-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const patternArray = [];
  for (let i = 0; i < labelArray.length; i += 1) {
    const indexer = multiplierArray[i];
    if (indexer !== 0) {
      const text = `${labelArray[i]  } column: ${  multiplierArray[i]  } cards`;
      patternArray.push(text);
    }
  }
  return patternArray;
}


class Data extends Component {
  render() {
    const {mainDataObject, sortsDisplayText, statements, projectName, numQsorts, numStatements, qSortPattern, } = state;
    let texts;
    let multiplierArray;

    if (qSortPattern) {
      multiplierArray = calcMultiplierArrayT2(qSortPattern);
      texts = calcPatternArray(multiplierArray);
    }

    localStore.sortsDisplayText = sortsDisplayText;
    localStore.statements = statements;
    localStore.projectName = projectName;
    localStore.numQsorts = numQsorts;
    localStore.numStatements = numStatements;
    localStore.qSortPattern = qSortPattern;
    localStore.mainDataObject = mainDataObject;
    localStore.multiplierArray = multiplierArray;

    return (
      <MainContent>
        <ProjectTitle>Project Data</ProjectTitle>
        <InformationContainer>
          <h2>Project Name: { projectName }</h2>
          <h2>Number Q sorts: { numQsorts }</h2>
          <h2>Number Statements: { numStatements }</h2>
          { qSortPattern ? (
            <React.Fragment>
              <h2>Q sort Pattern:</h2>
              <QsortsPatternList texts={ texts } />
            </React.Fragment>
            ) : null }
        </InformationContainer>
        <StatementListContainer>
          <h1>Statements</h1>
          <StatementsList statements={ localStore.statements } />
        </StatementListContainer>
        <SortsListContainer>
          <h1>Participant Q Sorts</h1>
          <ParticipantsQsortsGrid data={ localStore.mainDataObject } />
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
  grid-template-columns: 190px 270px 190px 1fr;
  grid-template-rows: 100px 1fr 1fr 1fr;
  grid-template-areas:
    "pageTitle pageTitle pageTitle pageTitle"
    "informationContainer informationContainer informationContainer informationContainer "
    "statementList statementList statementList statementList"
    "sortsList sortsList sortsList sortsList"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 50px;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;

  width: calc(100vw - 122px);
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
  padding-bottom: 50px;
`;

const SortsListContainer = styled.div`
  grid-area: sortsList;
`;

const InformationContainer = styled.div`
  grid-area: informationContainer;
`;
