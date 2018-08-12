import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import CalculateCorrelationsButton from "./CalculateCorrelationsButton";
import CorrelationTable from './CorrelationTable/CorrelationTable';

// import styled from "styled-components";

class Correlations extends Component {
  render() {
    return (
      <MainContent>
        <p>Correlations Section</p>
        <CalculateCorrelationsButton />
        <CorrelationTable />
      </MainContent>
      );
  }
}

export default view(Correlations);

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
  display: grid;
  grid-template-columns: 150px 190px 1fr;
  grid-template-rows: 120px 120px 1fr;
  grid-template-areas:
    "header header header"
    "row2 row2 row2"
    "main main main";
  justify-items: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
`;
