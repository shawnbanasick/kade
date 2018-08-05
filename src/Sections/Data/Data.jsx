import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";
import SortsList from "./SortsList";

const localStore = store({ statements: [], sortsDisplayText: [] });
//  statements, qSortPattern, numQsorts, numStatements, respondentNames,

class Data extends Component {
  render() {
    console.log(`store: ${  JSON.stringify(state)}`);

    const { sortsDisplayText } = state;
    console.log(`display: ${JSON.stringify(sortsDisplayText)}`);

    localStore.sortsDisplayText = sortsDisplayText;
    return (
      <MainContent>
        <ProjectTitle>Project Data</ProjectTitle>
        <SortsList displayText={sortsDisplayText} />
      </MainContent>
    );
  }
}

export default view(Data);

const MainContent = styled.div`
  display: grid;
  /* grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2"; */
  background-color: white;
  height: 100%;
  width: 100%;
`;

const ProjectTitle = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 22px;
`;
