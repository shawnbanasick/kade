import React, { Component } from "react";
import styled from "styled-components";
import state from "../../../store";

const { dialog } = require("electron").remote;
const fs = require("fs");

class LoadTxtStatementFile extends Component {
  handleClick() {
    dialog.showOpenDialog(
      {
        properties: ["openFile"],
        filters: [{ name: "CSV", extensions: ["csv", "CSV"] }]
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
              sorts: lines2,
              sortsLoaded: true
            });
            const log = state.getState("sorts");
            console.log(JSON.stringify(log));
          });
        }
      }
    );
  }

  render() {
    return (
      <LoadTxtButton onClick={this.handleClick}>
        <p>Load CSV File</p>
      </LoadTxtButton>
    );
  }
}

export default LoadTxtStatementFile;

const LoadTxtButton = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #d6dbe0;
  height: 60px;
  width: 240px;
  border: 1px solid black;
  text-align: center;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 4px;
  &:hover {
    background-color: white;
  }
`;
