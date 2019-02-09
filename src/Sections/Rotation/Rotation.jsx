import { Tab } from "semantic-ui-react";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";

import FactorSelectDropdown from "./FactorKeepSelection/FactorSelectDropdown";
import FactorsKeptNotification from "./FactorKeepSelection/FactorsKeptNotification";
import JudgementalRotationContainer from "./JudgementalRotation/JudgementalRotationContainer";
import FireVarimaxButton from "./RotationButtons/FireVarimaxButton";
import InitializeJudgementalButton from "./RotationButtons/InitializeJudgmentalButton";

const panes = [
  {
    menuItem: "Options",
    render: () => (
      <Tab.Pane>
        <DataWindow1>
          <FactorSelectDropdown />
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

const localStore = store({
  activeIndex: 0
});

class Rotation extends Component {
  handleTabChange(e, {activeIndex}) {
    localStore.activeIndex = activeIndex;
  }

  render() {
    const {activeIndex} = localStore;

    return (
      <MainContent>
        <Tab style={ { width: "100%", minHeight: "calc(100%-22px)" } } panes={ panes } activeIndex={ activeIndex } onTabChange={ this.handleTabChange } />
      </MainContent>
      );
  }
}

export default view(Rotation);

const DataWindow1 = styled.div`
  display: grid;
  grid-template-rows: 100px 100px 1fr;
  /* min-height: 600px; */
  height: calc(100vh - 75px);
  background-color: white;
  max-width: 1197; 
  user-select: none;
`;

const DataWindow2 = styled.div`
  /* min-height: calc(100vh -22px); */
  background-color: white;
  overflow: scroll;
  padding: 5px;
  padding-top: 5px;
  padding-left: 5px;
  /* width: calc(100vw - 180px); */
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

const MainContent = styled.div`
background-color: #d6dbe0;
  overflow: auto;

  background-color: #d6dbe0;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  /* width: 100vw; */
  box-sizing: border-box;
  /* max-height: calc(100vh - 22px); */
  /* background-color: #d6dbe0;

  margin-top: 5px;
  margin-left: 5px;
  margin-right: 10px;

  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  background-color: white;

  overflow: scroll;
  padding: 5px;
  padding-top: 15px;
  padding-left: 15px; */
  width: calc(100vw - 125px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto; 
  /* border: 2px solid blue; */

  /* class="ui attached tabular menu" */

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


/* 
  .tabs-menu {
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

  .tabs-menu-item {
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

  .tabs-menu-item a {
    cursor: pointer;
    color: black;
  }

  .tabs-menu-item:not(.is-active):hover {
    color: #3498db;
    background-color: white;
  }

  .tabs-menu-item.is-active {
    color: #3498db;
    background-color: white;
    border-top: 5px solid #0080ff;
    transition: all 0.25s linear;
  }

  .tab-panel {
    padding: 10px 50px;
    background-color: white;
    padding-left: 20px !important;
    /* border: 2px solid red; 
  } 
  */
`;
