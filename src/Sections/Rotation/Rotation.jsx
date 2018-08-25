import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import { Tab } from "semantic-ui-react";

import FactorSelectDropdown from "./FactorKeepSelection/FactorSelectDropdown";
import FactorsKeptNotification from "./FactorKeepSelection/FactorsKeptNotification";
import RotationButtonGroup from "./RotationButtons/RotationButtonGroup";
import JudgementalRotationContainer from "./JudgementalRotation/JudgementalRotationContainer";

// import styled from "styled-components";

const panes = [
  {
    menuItem: "Options",
    render: () => (
      <Tab.Pane>
        <DataWindow>
          <div style={{ maxWidth: 1197 }}>
            <FactorSelectDropdown />
            <FactorsKeptNotification />
          </div>
        </DataWindow>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Button Group",
    render: () => (
      <Tab.Pane>
        <DataWindow>
          <RotationButtonGroup />
        </DataWindow>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Judgmental Rotation",
    render: () => (
      <Tab.Pane>
        <DataWindow>
          <JudgementalRotationContainer />
        </DataWindow>
      </Tab.Pane>
    )
  }
];

const localStore = store({ activeIndex: 0 });

class Rotation extends Component {
  // state = { activeIndex: 1 };

  // handleRangeChange = e => this.setState({ activeIndex: e.target.value });
  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  // render() {
  //   const { activeIndex } = this.state;

  //   return (
  //     <div>
  //       <div>activeIndex: {activeIndex}</div>
  //       <input
  //         type="range"
  //         max="2"
  //         value={activeIndex}
  //         onChange={this.handleRangeChange}
  //       />
  //       <Tab
  //         panes={panes}
  //         activeIndex={activeIndex}
  //         onTabChange={this.handleTabChange}
  //       />
  //     </div>
  //   );
  // }

  handleTabChange(e, { activeIndex }) {
    console.log(JSON.stringify("handletabchange"));

    console.log(JSON.stringify(activeIndex));

    localStore.activeIndex = activeIndex;
  }

  render() {
    const { activeIndex } = localStore;
    return (
      <MainContent>
        <Tab
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </MainContent>
    );
  }
}

export default view(Rotation);

/*

import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Tab 1', pane: 'Tab 1 Content' },
  { menuItem: 'Tab 2', pane: 'Tab 2 Content' },
  { menuItem: 'Tab 3', pane: 'Tab 3 Content' },
]

const TabExampleBasicAll = () => <Tab panes={panes} renderActiveOnly={false} />

export default TabExampleBasicAll





*/

const DataWindow = styled.div`
  min-height: 600px;
  background-color: white;
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
  margin-top: 20px;
  margin-left: 20px;
  /* display: grid;
  grid-template-columns: 600px 1fr;
  grid-template-rows: 250px 125px 125px 1fr; */
  /* grid-template-areas:
    "row1 row1 row1 row1"
    "titleRow titleRow titleRow titleRow"
    "weblinkRow weblinkRow weblinkRow weblinkRow"
    "linkboxRow1 linkboxRow1 linkboxRow1 linkboxRow1"
    "linkboxRow2 linkboxRow2 linkboxRow2 linkboxRow2"; */
  justify-items: center;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 153px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: auto;
`;
