import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
import CalculateCorrelationsButton from "./CalculateCorrelationsButton";
import CorrelationTable from "./CorrelationTable/CorrelationTable";
import state from '../../store';

// import styled from "styled-components";

class Correlations extends Component {
  render() {
    const showCorrelationMatrix = state.getState("showCorrelationMatrix");

    return (
      <MainContent>
        <Container1>
          <CalculateCorrelationsButton />
        </Container1>
        <Container2>
          { showCorrelationMatrix ? <CorrelationTable /> : <DefaultMessage>No correlations calculated.</DefaultMessage> }
        </Container2>
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
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  justify-items: start;
  align-items: center;
  background-color: white;
  visibility: ${props => (props.view ? "hidden" : "visible")};
  animation: ${props => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;

  width: calc(100vw - 153px);
  overflow: auto;
`;

const Container1 = styled.div`
  grid-area: header;
  justify-self: start;
`;

const Container2 = styled.div`
  grid-area: main;
  justify-self: start;
`;

const DefaultMessage = styled.div`
  margin-top:50px;
  margin-left: 20px;
  font-size: 22px;
`;