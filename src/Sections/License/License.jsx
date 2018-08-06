import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import DisplayState from "./DisplayState";
import StatementsInState from "./StatementsInState";
import SortsInState from "./SortsInState";
import state from "../../store";

// import styled from "styled-components";

class License extends Component {
  render() {
    console.log(JSON.stringify(state));
    return (
      <MainContent>
        <p>License Section</p>
        <DisplayState />
        <StatementsInState />
        <SortsInState />
      </MainContent>
    );
  }
}

export default view(License);

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 500px;
  grid-template-rows: 50px 1fr;
  justify-items: center;
  align-items: center;
  background-color: white;

  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 153px);
  box-sizing: border-box;
  height: calc(100vh - 22px);
  overflow: auto;
`;
