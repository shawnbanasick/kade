import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import Button from "./UnforcedSortsDisplayButton";

const UnforcedSortsDisplay = props => {
  return (
    <Container>
      <p style={{ marginRight: 15 }}>Participants with Unforced Sorts:</p>
      <p style={{ marginRight: 15 }}>{props.data}</p>
      <Button buttonColor={"orange"} number={props.number} />
    </Container>
  );
};

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
