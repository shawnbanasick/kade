import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import TypeOfAnalysisTransitionContainer from "./TypeOfAnalysisTransitionContainer";
// import UnrotatedFactorsTransitionContainer from "./UnrotatedFactorsTransitionContainer";
// import styled from "styled-components";
import ErrorNotification from "../Input/ErrorNotification";
import state from "../../store";

class Factors extends Component {
  render() {
    const showCentroidError = state.getState("showCentroidError");
    return (
      <MainContent>
        <TypeOfAnalysisTransitionContainer />
        {/* <UnrotatedFactorsTransitionContainer /> */}
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
  grid-template-columns: 450px 190px;
  grid-template-rows: 100px 125px 125px 200px 200px 50px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  justify-items: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  font-family: Helvetica;
`;
