import React from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";

import appState from "../GlobalState/appState";

const localStore = store({
  buttonColor: "orange"
});

function handleOnClick() {
  localStore.buttonColor = "lightgreen"; // "rgba(144, 238, 144, .6)";
  appState.isDataButtonGreen = true;
  appState.hasUnforcedBeenConfirmed = true;
}

const UnforcedSortsDisplayButton = props => {
  return (
    <Button onClick={handleOnClick} buttonColor={localStore.buttonColor}>
      <p>
        Confirm
        {` ${props.number}`} Unforced Sorts
      </p>
    </Button>
  );
};

export default view(UnforcedSortsDisplayButton);

const Button = styled.button`
  background-color: ${props => props.buttonColor};
  display: grid;
  height: 50px;
  width: 230px;
  border: 1px solid black;
  text-align: center;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    /* background-color: #abafb3; */
    /* font-weight: bold; */
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    margin-left: 3px;
    transform: translateY(1px);
  }
`;
