import { view, store } from "react-easy-state";
import React, { Component } from "react";
import styled from "styled-components";
import state from "../../../store";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({ buttonColor: "#d6dbe0" });

const handleClick = () => {
  dialog.showOpenDialog(
    {
      properties: ["openFile"],
      filters: [{ name: "Text", extensions: ["txt", "TXT"] }]
    },
    files => {
      if (files !== undefined) {
        const fileName = files[0];
        fs.readFile(fileName, "utf-8", (err, data) => {
          // split into lines
          const lines = data.split(/[\r\n]+/g);
          // remove empty strings
          const lines2 = lines.filter(e => e === 0 || e);
          state.setState({
            statements: lines2,
            statementsLoaded: true
          });
          localStore.buttonColor = "rgba(144,	238,	144, .6)";
        });
      }
    }
  );
};

class LoadTxtStatementFile extends Component {
  render() {
    return (
      <LoadTxtButton
        buttonColor={localStore.buttonColor}
        onClick={() => handleClick()}
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
  background-color: ${props => props.buttonColor};
  height: 60px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 3px 3px 0 black;

  &:hover {
    background-color: white;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;