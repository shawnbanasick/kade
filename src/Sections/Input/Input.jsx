import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import Tabs from "react-simpletabs";
import CsvPanel from "./CsvPanel";
import ExcelPanel from "./ExcelPanel";
import KandedPanel from "./KandedPanel";

const localStore = store({ tabActive: 1 });

const handleAfter = selectedIndex => {
  localStore.tabActive = selectedIndex;
};

class Input extends Component {
  render() {
    return (
      <MainContent>
        <Tabs
          tabActive={localStore.tabActive}
          onAfterChange={e => handleAfter(e)}
        >
          <Tabs.Panel title="CSV">
            <CsvPanel />
          </Tabs.Panel>
          <Tabs.Panel title="Excel">
            <ExcelPanel />
          </Tabs.Panel>
          <Tabs.Panel title="KANDED">
            <KandedPanel />
          </Tabs.Panel>
          <Tabs.Panel title="JSON">
            <h2>Content #3 here</h2>
          </Tabs.Panel>
          <Tabs.Panel title="PQMethod">
            <h2>Content #4 here</h2>
          </Tabs.Panel>
          <Tabs.Panel title="Demo Data">
            <h2>Content #5 here</h2>
          </Tabs.Panel>
        </Tabs>
      </MainContent>
    );
  }
}

export default view(Input);

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
  /* display: grid;
  grid-template-columns: 190px 190px 190px 190px;
  grid-template-rows: 50px 125px 125px 200px 200px 50px;
  grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2";
  justify-items: center;
  align-items: center; */
  background-color: #d6dbe0;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 153px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;

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
    border-left: 5px solid #d6dbe0;
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
    border-left: 5px solid lightgreen;
    transition: all 0.25s linear;
  }

  .tab-panel {
    padding: 10px 50px;
    background-color: white;
    padding-left: 20px !important;
  }
`;
