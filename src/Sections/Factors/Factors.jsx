import { view } from "react-easy-state";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import state from "../../store";
import ErrorNotification from "../Input/ErrorNotification";
import TypeOfAnalysisTransitionContainer from "./TypeOfAnalysisTransitionContainer";
import UnrotatedFactorsTransitionContainer from "./UnrotatedFactorsTransitionContainer";

class Factors extends Component {
  render() {
    const showCentroidError = state.getState("showCentroidError");
    const showCorrelationMatrix = state.getState("showCorrelationMatrix");

    return (
      <MainContent>
        {showCorrelationMatrix ? (
          <TypeOfAnalysisTransitionContainer style={{ gridArea: "row1" }} />
        ) : (
          <DefaultMessage>Calculate correlations first.</DefaultMessage>
        )}
        <UnrotatedFactorsTransitionContainer />
        {showCentroidError ? <ErrorNotification /> : null}
      </MainContent>
    );
  }
}

export default view(Factors);

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
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
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
  user-select: none;
`;

const DefaultMessage = styled.div`
  font-size: 22px;
`;
