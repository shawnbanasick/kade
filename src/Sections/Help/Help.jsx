import React from "react";
import { Tab } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import HelpHome from "./HelpHome";
import InputHelpText from "./InputHelpText";
import OutputHelpText from "./OutputHelpText";
import FactorsHelpText from "./FactorsHelpText";
import InputHelpTextCSV from "./InputHelpTextCSV";
import LoadingsHelpText from "./LoadingsHelpText";
import RotationHelpText from "./RotationHelpText";
import InputHelpTextJson from "./InputHelpTextJson";
import InputHelpTextExcel1 from "./InputHelpTextExcel1";
import InputHelpTextExcel2 from "./InputHelpTextExcel2";
import InputHelpTextExcel3 from "./InputHelpTextExcel3";
import CorrelationsHelpText from "./CorrelationsHelpText";
import InputHelpTextPqmethod from "./InputHelpTextPqmethod";

// factorScoreRanksArray

const panes = [
  {
    menuItem: "Help-Home",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <HelpHome />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Input",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <InputHelpText />
          <InputHelpTextCSV />
          <InputHelpTextExcel1 />
          <InputHelpTextExcel2 />
          <InputHelpTextExcel3 />
          <InputHelpTextJson />
          <InputHelpTextPqmethod />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Correlations",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <CorrelationsHelpText />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Factors",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <FactorsHelpText />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Rotation",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <RotationHelpText />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Loadings",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <LoadingsHelpText />
        </DataWindow2>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Help-Output",
    render: () => (
      <Tab.Pane className="helpTabs">
        <DataWindow2>
          <OutputHelpText />
        </DataWindow2>
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

const Output = () => {
  const { activeIndex } = localStore;
  return (
    <MainContent>
      <Tab
        style={{ paddingRight: "0px !important" }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        id={"helpSection"}
      />
    </MainContent>
  );
};

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
  background-color: #d6dbe0;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 135px);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;

  user-select: all;

  .ui.bottom.attached.segment.active.tab {
    border-bottom-color: white;
    border-left-color: white;
  }
`;

const DataWindow2 = styled.div`
  padding-top: 15px;
  background-color: white;
  height: calc(100vh - 48px);
  min-width: calc(100vw - 166px);
  overflow: auto;
`;
