import React, { Component } from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import store from "../../../store";

// import "./FactorsKeptNotification.css";

class FactorsKeptNotification extends Component {
  render() {
    const numFactorsKept = store.getState("numFactorsKeptForRot");
    const shouldDisplayDiv = store.getState("shouldDisplayFacKept");

    // if (shouldDisplayDiv) {
    return (
      <Transition visible={shouldDisplayDiv} animation="fade" duration={1000}>
        <FactorsKeptDiv className="factorsKeptDiv">
          {numFactorsKept} factors kept for rotation.
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
`;
