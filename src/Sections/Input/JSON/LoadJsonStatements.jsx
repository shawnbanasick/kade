import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';

const {dialog} = require("electron").remote;
const fs = require("fs");

const localStore = store({
    isLoadJsonTextButtonGreen: false,
});

const handleClick = () => {
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
                const fileName = files[0];
                fs.readFile(fileName, "utf-8", (err, data) => {
                    // split into lines
                    const lines = data.split(/[\r\n]+/g);
                    // remove empty strings
                    const lines2 = lines.filter(e => e === 0 || e);
                    const areQsortsLoaded = state.getState("areQsortsLoaded");
                    revertLoadButtonsColors("json");
                    state.setState({
                        statements: lines2,
                        statementsLoaded: true,
                        notifyDataUploadSuccess: true,
                        areStatementsLoaded: true,
                        isLoadJsonTextButtonGreen: true,
                        isInputButtonGreen: areQsortsLoaded,
                    });
                    localStore.isLoadCsvTextButtonGreen = true;
                });
            }
        }
    );
};

class LoadTxtStatementFile extends Component {
    render() {
        const isLoadJsonTextButtonGreen = state.getState("isLoadJsonTextButtonGreen");
        localStore.isLoadJsonTextButtonGreen = isLoadJsonTextButtonGreen;
        return (
            <LoadTxtButton isActive={ localStore.isLoadJsonTextButtonGreen } onClick={ handleClick }>
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

  &:hover {
    background-color: ${props => props.isActive ? "#009a00" : "#abafb3" };
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;
