import React, { Component } from "react";
import { view } from "react-easy-state";
import styled, { keyframes } from "styled-components";
// import state from '../../store';
import DisplayState from "./DisplayState";

// import styled from "styled-components";

class License extends Component {
  render() {
    return (
      <MainContent>
        <p>License Section</p>
        <DisplayState />
      </MainContent>
    );
  }
}

export default view(License);

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
  grid-template-columns: 500px;
  grid-template-rows: 50px 1fr;
  justify-items: center;
  align-items: center;
  background-color: white;
`;
