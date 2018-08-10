import { view } from "react-easy-state";
import styled from "styled-components";
import React from "react";
// import state from "../../../store";

class SuccessNotification extends React.Component {
  render() {
    return (
      <SuccessBar>
        <p>Error </p>
      </SuccessBar>
    );
  }
}

export default view(SuccessNotification);

const SuccessBar = styled.div`
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
