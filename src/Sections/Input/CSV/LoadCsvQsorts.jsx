import { view, store } from "react-easy-state";
import React, { Component } from "react";
import styled from "styled-components";
import Papa from "papaparse";
import state from "../../../store";
import { sortsDisplayText } from "../logic/sortsDisplayText";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
import calcMultiplierArrayT2 from "../logic/excelLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  try {
    dialog.showOpenDialog(
      {
        properties: ["openFile"],
        filters: [
          {
            name: "CSV",
            extensions: ["csv", "CSV"]
          }
        ]
      },
      files => {
        if (files !== undefined) {
          const fileName = files[0];
          fs.readFile(fileName, "utf-8", (err, data) => {
            // parse file
            const parsedFile = Papa.parse(data);

            const lines2 = parsedFile.data;

            // // split into lines
            // const lines = data.split(/[\r\n]+/g);
            // // remove empty strings
            // const lines2 = lines.filter(e => e === 0 || e);

            let qSortPatternArray;

            // remove the first (header) line
            lines2.shift();

            // parsing first line of PQMethod file to set qav variables
            const numberSorts = lines2.length;

            if (lines2[0][1] === "") {
              throw new Error("Can't find any Q-sorts in the file!");
            }

            // remove empty "" strings from array
            let maxLength = lines2[0].length;
            for (let i = 0; i < lines2[0].length - 1; i += 1) {
              const value1 = lines2[0][i];
              if (value1 === "") {
                maxLength = i;
                break;
              }
            }

            // todo - check if other data import methods check to see if min value is above zero
            // before doing positive shift for raw sorts
            let minValue;
            let arrayShiftedPositive;
            const mainDataObject = [];
            const respondentNames = [];
            for (let j = 0; j < lines2.length; j += 1) {
              // const activeLine = lines2[j].split(",");

              lines2[j].length = maxLength;

              const tempObj = {};

              // get name
              const name = lines2[j].shift();

              // slice off name
              lines2[j] = lines2[j].slice(1, -1);
              tempObj.name = name;
              respondentNames.push(name);
              const asNumbers = lines2[j].map(Number);
              if (j === 0) {
                minValue = Math.min(...asNumbers);
              }
              // grab last for for qSortPattern
              qSortPatternArray = asNumbers;

              if (minValue < 1) {
                arrayShiftedPositive = shiftRawSortsPositive(
                  asNumbers,
                  minValue
                );
              } else {
                arrayShiftedPositive = [...asNumbers];
              }
              tempObj.posShiftSort = arrayShiftedPositive;
              tempObj.rawSort = asNumbers;
              tempObj.displaySort = lines2[j].toString();
              mainDataObject.push(tempObj);
            }

            qSortPatternArray.sort((a, b) => a - b);

            const multiplierArray = calcMultiplierArrayT2([
              ...qSortPatternArray
            ]);

            const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

            const participantNames = checkUniqueParticipantNames(
              respondentNames
            );

            state.setState({
              numQsorts: numberSorts,
              qSortPattern: qSortPatternArray,
              numStatements: lines2[0].length,
              respondentNames: participantNames,
              mainDataObject,
              sortsDisplayText: sortsDisplayTextArray,
              multiplierArray,
              dataOrigin: "csv",
              sortsLoaded: true
            });
            localStore.buttonColor = "rgba(144,	238,	144, .6)";
          });
        }
      }
    );
  } catch (error) {
    state.setState({
      csvErrorMessage1: error.message,
      showCsvErrorModal: true
    });
  }
};

class LoadTxtStatementFile extends Component {
  render() {
    return (
      <LoadTxtButton
        buttonColor={localStore.buttonColor}
        onClick={() => handleClick()}
      >
        <p>Load CSV File</p>
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
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    margin-top: 3px;
  }
`;
