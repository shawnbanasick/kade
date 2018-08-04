import { view } from "react-easy-state";
import React from "react";
// import store from "../../../store";
import styled from "styled-components";

class CsvSuccessfulLoadBar extends React.Component {
  //   constructor() {
  //     super();

  //     // this.handleClick = this.handleClick.bind(this);
  //   }

  // handleClick(event) {}

  render() {
    // const showForcedInput = store.getState("success");
    // if (showForcedInput) {
    return (
      <SuccessBar>
        <p>CSV Project Loaded:</p>
        <Button>View Project Data</Button>
        <Button>View Correlation Matrix</Button>
      </SuccessBar>
    );
    //     }
    //     return null;
    //   }
  }
}

export default view(CsvSuccessfulLoadBar);

const SuccessBar = styled.div`
  background-color: lightgreen;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: start;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 4;
  border-radius: 4px;
  border: 2px solid #d6dbe0;
`;

const Button = styled.button`
  height: 40px;
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  border-radius: 4px;
  background-color: #d6dbe0;
`;
