import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import state from "../../../store";

// import "./FactorsKeptNotification.css";

class FactorsKeptNotification extends Component {
  render() {
    const numFactorsKept = state.getState("numFactorsKeptForRot");
    const shouldDisplayDiv = state.getState("shouldDisplayFacKept");

    // if (shouldDisplayDiv) {
    return (
      <Transition visible={shouldDisplayDiv} animation="fade" duration={1000}>
        <FactorsKeptDiv className="factorsKeptDiv">
          {numFactorsKept} factors kept for rotation.
          <br />
          <br />
          <br />
          Click the &#8220;Varimax&#8221; or &#8220;Judgmental&#8221; tabs for
          more options.
        </FactorsKeptDiv>
      </Transition>
    );
    // }
    // return null;
  }
}

export default view(FactorsKeptNotification);

const FactorsKeptDiv = styled.div`
  margin-top: 20px;
  font-size: 25px;
  line-height: 1.4em;
`;
