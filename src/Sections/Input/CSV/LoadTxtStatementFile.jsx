import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal.js";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({
  isLoadCsvTextButtonGreen: false
});

const handleClick = () => {
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = state.getState("isDataAlreadyLoaded");
  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
    dialog.showOpenDialog(
      {
        properties: ["openFile"],
        filters: [
          {
            name: "Text",
            extensions: ["txt", "TXT"]
          }
        ]
      },
      files => {
        if (files !== undefined) {
          console.log("called");
          const fileName = files[0];
          fs.readFile(fileName, "utf-8", (err, data) => {
            // split into lines
            const lines = data.split(/[\r\n]+/g);
            // remove empty strings
            const lines2 = lines.filter(e => e === 0 || e);
            const areQsortsLoaded = state.getState("areQsortsLoaded");
            if (lines2.length === 0) {
              throwNoStatementsInputErrorModal();
            } else {
              revertLoadButtonsColors("csv");
              state.setState({
                statements: lines2,
                statementsLoaded: true,
                notifyDataUploadSuccess: true,
                areStatementsLoaded: true,
                isLoadCsvTextButtonGreen: true,
                isInputButtonGreen: areQsortsLoaded,
                isDataButtonGreen: areQsortsLoaded
              });
              localStore.isLoadCsvTextButtonGreen = true;
            }
          });
        }
      }
    );
  }
};

class LoadTxtStatementFile extends Component {
  render() {
    const isLoadCsvTextButtonGreen = state.getState("isLoadCsvTextButtonGreen");
    localStore.isLoadCsvTextButtonGreen = isLoadCsvTextButtonGreen;
    return (
      <LoadTxtButton
        isActive={localStore.isLoadCsvTextButtonGreen}
        onClick={handleClick}
      >
        <p>Load TXT File</p>
      </LoadTxtButton>
    );
  }
}

export default view(LoadTxtStatementFile);

const LoadTxtButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props =>
    props.isActive ? "rgba(144,	238, 144, .6)" : "#d6dbe0"};
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

  &:hover {
    background-color: ${props => (props.isActive ? "#009a00" : "#abafb3")};
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;
