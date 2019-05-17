import { Tab } from "semantic-ui-react";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import state from "../../store";
import FactorsTable from "./Factors Table/FactorsTable";
import FactorVizOptions from "./FactorViz/FactorVizOptions";
import FactorVizDispatch from "./FactorVisualizations/FactorVizDispatch";
import RefreshFactorVizButton from "./FactorVisualizations/RefreshFactorVizButton";
import DownloadResultsButtons from "./DownloadResultsButtons/DownloadResultsButtons";
import MultipleFactorsFlaggedWarningModal from "./MultipleFactorsFlaggedWarningModal";
import ShowVizOptionsButton from "./DisplayVisualizationsButtons/ShowVizOptionsButton";
import OutputFactorTablesTransitionContainer from "./OutputFactorTablesTransitionContainer";
import NoLoadingsFlaggedWarningModal from "../Loadings/LoadingsTable/NoLoadingsFlaggedWarningModal";
import DisplayVisualizationsButtons from "./DisplayVisualizationsButtons/DisplayVisualizationsButtons";
import FactorSelectionForOutputButtons from "./FactorSelectionForOutput/FactorSelectionForOutputButtons";
import DistStateSigLevelDrop1 from "./FactorSelectionForOutput/DistStateSigLevelDrop1";
import DistStateSigLevelDrop2 from "./FactorSelectionForOutput/DistStateSigLevelDrop2";

let showTableDataNotSentWarning;

// factorScoreRanksArray

const panes = [
  {
    menuItem: "Options",
    render: () => (
      <Tab.Pane>
        <ScrollContainer>
          {showTableDataNotSentWarning && (
            <NoDataMessage>
              No Data - Click the &#8220;Send Table Data to Output&#8221; button
              in Section 6
            </NoDataMessage>
          )}
          <DataWindow1>
            <DistStateSigLevelDrop1 />
            <DistStateSigLevelDrop2 />
            <FactorSelectionForOutputButtons />
            <DownloadResultsButtons />
            <NoLoadingsFlaggedWarningModal />
            <MultipleFactorsFlaggedWarningModal />
          </DataWindow1>
        </ScrollContainer>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Factor Characteristics",
    render: () => (
      <Tab.Pane>
        <ScrollContainer>
          <DataWindow2>
            <OutputFactorTablesTransitionContainer />
          </DataWindow2>
        </ScrollContainer>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Factors Table",
    render: () => (
      <Tab.Pane>
        <ScrollContainer>
          <DataWindow2>
            <FactorsTable />
          </DataWindow2>
        </ScrollContainer>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Factor Visualizations",
    render: () => (
      <Tab.Pane>
        <ScrollContainer>
          <DataWindow2>
            <ButtonContainer1>
              <DisplayVisualizationsButtons />
              <ShowVizOptionsButton />
            </ButtonContainer1>
            <RefreshFactorVizButton marginTop={50} marginBottom={10} />
            <FactorVizOptions />
            <RefreshFactorVizButton marginTop={10} marginBottom={50} />
            <div style={{ height: 50 }} />
            <FactorVizDispatch />
          </DataWindow2>
        </ScrollContainer>
      </Tab.Pane>
    )
  }
];

const localStore = store({
  activeIndex: 0
});

function handleTabChange(e, { activeIndex }) {
  localStore.activeIndex = activeIndex;
}

class Output extends Component {
  render() {
    const { activeIndex } = localStore;
    showTableDataNotSentWarning = state.getState("showTableDataNotSentWarning");
    const facVizContainerHeight =
      state.getState("facVizContainerHeight") || 600;
    const facVizContainerWidth = state.getState("facVizContainerWidth") || 1000;
    return (
      <MainContent>
        <Tab
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          width={facVizContainerWidth}
          height={facVizContainerHeight}
        />
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

// overflow: scroll;
// height: ${props => `${props.height}px`};
// width: ${props => `${props.width}px`};

const MainContent = styled.div`
  background-color: #d6dbe0;
  background-color: #d6dbe0;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  box-sizing: border-box;

  .tabular-menu {
    display: grid;
    grid-template-columns: 100px 100px 140px 110px 150px 170px;
    background-color: #d6dbe0;
    padding-left: 20px !important;
    height: 45px;
    align-items: end;
    list-style: none;
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    font-size: 25px;
  }

  .tabular-menu-item {
    display: grid;
    align-items: center;
    justify-items: center;
    margin-right: 20px;
    background-color: #d6dbe0;
    height: 80%;
    border-top: 5px solid #d6dbe0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tabular-menu-item a {
    cursor: pointer;
    color: black;
  }

  .tabs-menu-item:not(.is-active):hover {
    color: #3498db;
    background-color: white;
  }

  .tabular-menu-item.is-active {
    color: #3498db;
    background-color: white;
    border-top: 5px solid #0080ff;
    transition: all 0.25s linear;
  }

  .tabular-panel {
    padding: 10px 50px;
    background-color: white;
    padding-left: 20px !important;
  }
`;

const DataWindow1 = styled.div`
  display: grid;
  grid-template-rows: 100px 125px 100px 100px 1fr;
  min-height: 600px;
  background-color: white;
  max-width: 1197;
  user-select: none;
`;

// min-height: 600px;
// max-height: calc(100vh - 22px);
// width: calc(100vw - 122px);
// max-height: calc(100vh - 22px);
// overflow: auto;

// max-width: calc(100vw - 135px);
// min-width: 100vw;

const DataWindow2 = styled.div`
  background-color: white;
  padding: 5px;
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: border-box;
  user-select: none;

  height: 100%;
  width: 100%;
  overflow: auto;
  min-height: 100vh;
  max-height: calc(100vh-22px);
  height: calc(100vh - 22px);
  width: calc(100vw - 135px);
`;

const NoDataMessage = styled.div`
  font-size: 25px;
  margin-left: 50px;
  margin-top: 100px;
`;

const ButtonContainer1 = styled.div`
  display: flex;
`;

const ScrollContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;
