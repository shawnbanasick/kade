import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import state from "../../../store";
import uploadLipsetData from "./uploadLipsetData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  uploadLipsetData();
  revertLoadButtonsColors();
  state.setState({
    loadLipsetButtonColor: "rgba(144,	238, 144, .6)",
    notifyDataUploadSuccess: true,
    isInputButtonGreen: true
  });
};

class LipsetButton1 extends React.Component {
  render() {
    const loadLipsetButtonColor = state.getState("loadLipsetButtonColor");
    localStore.buttonColor = loadLipsetButtonColor;
    return (
      <div>
        <LoadTxtButton
          id="lipsetButton"
          floated="right"
          onClick={() => handleClick()}
          buttonColor={localStore.buttonColor}
        >
          Load Lipset
        </LoadTxtButton>
      </div>
    );
  }
}

export default view(LipsetButton1);

const LoadTxtButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 60px;
  width: 240px;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  border: 1px solid black;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
    background-color: rgba(144, 238, 144, 0.6);
  }
`;
