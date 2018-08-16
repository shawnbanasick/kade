import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";
import state from "../../store";

class ErrorNotification extends React.Component {
  render() {
    const errorMessage = state.getState("errorMessage");
    return (
      <ErrorBar>
        <p>Error </p>
        <p>{errorMessage}</p>
      </ErrorBar>
    );
  }
}

export default view(ErrorNotification);

const ErrorBar = styled.div`
  position: absolute;
  left: 150px;
  bottom: 0;
  z-index: 9999;
  width: calc(100vw - 188px);
  background-color: #ff6666;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: -1; */
  border-radius: 4px;
`;
