import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import state from "../../../store";
import uploadIpadSurveyData from "./uploadIpadSurveyData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  uploadIpadSurveyData();
  revertLoadButtonsColors();
  state.setState({
    loadIpadSurveyButtonColor: "rgba(144,	238, 144, .6)",
    notifyDataUploadSuccess: true,
    isInputButtonGreen: true
  });
};

class IpadSurveyButton1 extends React.Component {
  render() {
    const loadIpadSurveyButtonColor = state.getState(
      "loadIpadSurveyButtonColor"
    );
    localStore.buttonColor = loadIpadSurveyButtonColor;
    return (
      <div>
        <LoadTxtButton
          id="ipadSurveyButton"
          floated="right"
          onClick={handleClick}
          buttonColor={localStore.buttonColor}
        >
          Load iPad Survey
        </LoadTxtButton>
      </div>
    );
  }
}

export default view(IpadSurveyButton1);

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
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
