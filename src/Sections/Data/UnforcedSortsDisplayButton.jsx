import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";

const localStore = store({
  buttonColor: "orange"
});

function handleOnClick() {
  localStore.buttonColor = "lightgreen"; // "rgba(144, 238, 144, .6)";
  console.log(
    "TCL: handleOnClick -> localStore.buttonColor",
    localStore.buttonColor
  );
  state.setState({ isDataButtonGreen: true, hasUnforcedBeenConfirmed: true });
}

class UnforcedSortsDisplayButton extends Component {
  render() {
    console.log("props " + JSON.stringify(this.props));

    // const unforcedConfirmButtonColor = state.getState(
    //   "unforcedConfirmButtonColor"
    // );
    // localStore.buttonColor = unforcedConfirmButtonColor;
    return (
      <Button onClick={handleOnClick} buttonColor={localStore.buttonColor}>
        Confirm Unforced
      </Button>
    );
  }
}

export default view(UnforcedSortsDisplayButton);

const Button = styled.button`
  /* font-size: 15px;
  height: 50px;*/
  background-color: ${props => props.buttonColor};
  display: grid;
  /* background-color: #d6dbe0; */
  height: 50px;
  width: 200px;
  border: 1px solid black;
  text-align: center;
  font-size: 20px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  /* margin-right: 3px;
  margin-bottom: 3px; */
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
