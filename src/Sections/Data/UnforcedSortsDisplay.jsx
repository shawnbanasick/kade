import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
// import state from "../../store";
import Button from "./UnforcedSortsDisplayButton";

class UnforcedSortsDisplay extends Component {
  render() {
    return (
      <Container>
        <p style={{ marginRight: 15 }}>Participants with Unforced Sorts:</p>
        <p style={{ marginRight: 15 }}>{this.props.data}</p>
        <Button buttonColor={"orange"}>Confirm Unforced</Button>
      </Container>
    );
  }
}

export default view(UnforcedSortsDisplay);

const Container = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  height: 50px;
  margin-bottom: 50px;
  align-items: baseline;

  .p {
    margin-right: 15px;
  }
`;
