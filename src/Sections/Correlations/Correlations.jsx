import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import CalculateCorrelationsButton from "./CalculateCorrelationsButton";
import CorrelationTable from "./CorrelationTable/CorrelationTable";

// import styled from "styled-components";

class Correlations extends Component {
  render() {
    return (
      <MainContent>
        <Container>
          <CalculateCorrelationsButton />
        </Container>
        <Container>
          <CorrelationTable />
        </Container>
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
  grid-template-columns: 1fr;
  grid-template-rows: 120px 1fr;
  margin-left: 20px;
  /* grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer"; */
  justify-items: start;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 153px);
  overflow: auto;
`;

const Container = styled.div`
  justify-self: start;
`;
