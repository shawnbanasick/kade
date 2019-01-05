import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import state from "../../../store";
import uploadBuzzwordData from "./uploadBuzzwordData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";

const localStore = store({
  isLoadBuzzwordsButtonGreen: false
});

const handleClick = () => {
  uploadBuzzwordData();
  revertLoadButtonsColors();
  state.setState({
    isLoadBuzzwordsButtonGreen: true,
    notifyDataUploadSuccess: true,
    isInputButtonGreen: true
  });
};

class BuzzwordButton1 extends React.Component {
  render() {
    const isLoadBuzzwordsButtonGreen = state.getState("isLoadBuzzwordsButtonGreen");
    localStore.isLoadBuzzwordsButtonGreen = isLoadBuzzwordsButtonGreen;
    return (
      <div>
        <LoadTxtButton id="buzzwordButton" floated="right" onClick={ handleClick } isActive={ localStore.isLoadBuzzwordsButtonGreen }>
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
  background-color: ${props => props.isActive ? "rgba(144,	238, 144, .6)" : "#d6dbe0"};
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
    background-color: ${props => props.isActive ? "#009a00" : "#abafb3" };
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
