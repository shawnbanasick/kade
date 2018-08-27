import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ProjectHistory from '../Loadings/LoadingsTable/ProjectHistory';
// import state from "../../store";

// import styled from "styled-components";

class License extends Component {
  render() {
    return (
      <MainContent>
        <ProjectHistory />
      </MainContent>
      );
  }
}

export default view(License);

const MainContent = styled.div`
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center; */
  background-color: white;

  margin-left: 20px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 153px);
  box-sizing: border-box;
  height: calc(100vh - 22px);
  overflow: auto;
`;

