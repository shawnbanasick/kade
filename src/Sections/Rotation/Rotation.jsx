import { Tab } from "semantic-ui-react";
import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import state from "../../store";

// import FactorSelectDropdown from "./FactorKeepSelection/FactorSelectDropdown";
import FactorsKeptNotification from "./FactorKeepSelection/FactorsKeptNotification";
import JudgementalRotationContainer from "./JudgementalRotation/JudgementalRotationContainer";
import FireVarimaxButton from "./RotationButtons/FireVarimaxButton";
import InitializeJudgementalButton from "./RotationButtons/InitializeJudgmentalButton";
import FactorSelectButtons from "./FactorKeepSelection/FactorSelectButtons";
import FactorSelectButtonModal from "./FactorKeepSelection/FactorSelectButtonModal";

let showKeepFacForRotButton;

const panes = [
  {
    menuItem: "Options",
    render: () => (
      <Tab.Pane>
        <DataWindow1>
          {showKeepFacForRotButton ? (
            <DropdownText>How many factors to keep for rotation? </DropdownText>
          ) : (
            <DropdownText>Extract factors first.</DropdownText>
          )}
          <ButtonBar>
            <FactorSelectButtons />
            <FactorSelectButtonModal />
          </ButtonBar>
          <FactorsKeptNotification />
        </DataWindow1>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Varimax",
    render: () => (
      <Tab.Pane>
        <DataWindow2>
          <FireVarimaxButton />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Judgmental",
    render: () => (
      <Tab.Pane>
        <DataWindow2>
          <InitializeJudgementalButton />
          <JudgementalRotationContainer />
        </DataWindow2>
      </Tab.Pane>
    )
  }
];

class Rotation extends Component {
  handleTabChange(e, { activeIndex }) {
    state.setState({ rotationActiveTabIndex: activeIndex });
  }

  render() {
    const rotationActiveTabIndex = state.getState("rotationActiveTabIndex");
    showKeepFacForRotButton = state.getState("showKeepFacForRotButton");

    return (
      <MainContent>
        <Tab
          style={{ width: "100%", minHeight: "calc(100%-22px)" }}
          panes={panes}
          activeIndex={rotationActiveTabIndex}
          onTabChange={this.handleTabChange}
        />
      </MainContent>
    );
  }
}

export default view(Rotation);

const DataWindow1 = styled.div`
  display: grid;
  grid-template-rows: 50px 120px 150px 1fr;
  height: calc(100vh - 75px);
  background-color: white;
  max-width: 1197;
  user-select: none;
`;

const DataWindow2 = styled.div`
  background-color: white;
  overflow: scroll;
  padding: 5px;
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: border-box;
  height: calc(100vh - 75px);
  overflow: auto;
  user-select: none;
`;

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

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainContent = styled.div`
  background-color: #d6dbe0;
  overflow: auto;

  background-color: #d6dbe0;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  box-sizing: border-box;
  width: calc(100vw - 125px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

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

const DropdownText = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  font-size: 22px;
`;
