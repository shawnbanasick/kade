import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";
import state from "../../store";

class ErrorNotification extends React.Component {
  render() {
    const errorMessage = state.getState("errorMessage");
    return (
      <ErrorBar>
        <div>Error </div>
        <p>
          { errorMessage }
        </p>
      </ErrorBar>
      );
  }
}

export default view(ErrorNotification);

const ErrorBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-items: center;
  left: 155px;
  bottom: 0;
  margin-bottom: 5px;
  z-index: 9999;
  width: calc(100vw - 188px);
  background-color: rgba(255, 102, 102, 0.8);
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 
   #ff6666
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: -1; */
  border-radius: 4px;
`;
