import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import { Tab } from "semantic-ui-react";
import CsvPanel from "./CsvPanel";
import ExcelPanel from "./ExcelPanel";
import KandedPanel from "./KandedPanel";
import JsonPanel from "./JsonPanel";
import PQMethodPanel from "./PQMethodPanel";
import DemoDataPanel from "./DemoDataPanel";
// import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";

// const localStore = store({ tabActive: 1 });

// const handleAfter = selectedIndex => {
//   localStore.tabActive = selectedIndex;
// };

const panes = [
  {
    menuItem: "CSV",
    render: () => (
      <Tab.Pane>
        <CsvPanel />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Excel",
    render: () => (
      <Tab.Pane>
        <ExcelPanel />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Kanded",
    render: () => (
      <Tab.Pane>
        <KandedPanel />
      </Tab.Pane>
    )
  },
  {
    menuItem: "JSON",
    render: () => (
      <Tab.Pane>
        <JsonPanel />
      </Tab.Pane>
    )
  },
  {
    menuItem: "PQMethod",
    render: () => (
      <Tab.Pane>
        <PQMethodPanel />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Demo Data",
    render: () => (
      <Tab.Pane>
        <DemoDataPanel />
      </Tab.Pane>
    )
  }
];

class Input extends Component {
  render() {
    return (
      <MainContent>
        <Tab panes={panes} />
        <ErrorNotification />
        {/* <SuccessNotification /> */}
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
  }
`;
