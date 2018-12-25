import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import state from "../../../store";
import uploadBuzzwordData from "./uploadBuzzwordData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  uploadBuzzwordData();
  revertLoadButtonsColors();
  state.setState({
    loadBuzzwordsButtonColor: "rgba(144,	238, 144, .6)",
    notifyDataUploadSuccess: true,
    isInputButtonGreen: true
  });
};

class BuzzwordButton1 extends React.Component {
  render() {
    const loadBuzzwordsButtonColor = state.getState("loadBuzzwordsButtonColor");
    localStore.buttonColor = loadBuzzwordsButtonColor;
    return (
      <div>
        <LoadTxtButton
          id="buzzwordButton"
          floated="right"
          onClick={handleClick}
          buttonColor={localStore.buttonColor}
        >
          Load Buzzwords
        </LoadTxtButton>
      </div>
    );
  }
}

export default view(BuzzwordButton1);

const LoadTxtButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 60px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;
  user-select: none;

  &:hover {
    background-color: ${props => props.buttonColor};
    /* background-color: #abafb3; */
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
