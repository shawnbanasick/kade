import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import store from "../../store";
import FactorVizOptions from "./FactorViz/FactorVizOptions";
import FactorVizDispatch from "./FactorVisualizations/FactorVizDispatch";
import DownloadResultsButtons from "./DownloadResultsButtons/DownloadResultsButtons";
import NoLoadingsFlaggedWarningModal from "../Loadings/LoadingsTable/NoLoadingsFlaggedWarningModal";
import DisplayVisualizationsButtons from "./DisplayVisualizationsButtons/DisplayVisualizationsButtons";
import FactorSelectionForOutputButtons from "./FactorSelectionForOutput/FactorSelectionForOutputButtons";
import OutputFactorTablesTransitionContainer from "./OutputFactorTablesTransitionContainer";
import MultipleFactorsFlaggedWarningModal from "./MultipleFactorsFlaggedWarningModal";
import RefreshFactorVizButton from "./FactorVisualizations/RefreshFactorVizButton";

// import styled from "styled-components";

class Output extends Component {
  render() {
    const shouldDisplayFactorViz = store.getState(
      "displayFactorVisualizations"
    );
    const showStandardErrorsDifferences = store.getState(
      "showStandardErrorsDifferences"
    );
    return (
      <MainContent>
        <div className="section">
          <FactorSelectionForOutputButtons />
          <DownloadResultsButtons />
          <NoLoadingsFlaggedWarningModal />
          <MultipleFactorsFlaggedWarningModal />
          <OutputFactorTablesTransitionContainer />
          <div>
            {showStandardErrorsDifferences && (
              <span style={{ fontSize: 26 }}>Factor Visualizations</span>
            )}
            <div>
              <DisplayVisualizationsButtons />
              <FactorVizOptions />
              <RefreshFactorVizButton />
              {shouldDisplayFactorViz && <FactorVizDispatch />}
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}

export default view(Output);

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
  grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
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
`;
