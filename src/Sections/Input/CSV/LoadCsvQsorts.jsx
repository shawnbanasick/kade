import Papa from "papaparse";
import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import sortsDisplayText from "../logic/sortsDisplayText";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import calcMultiplierArrayT2 from "../Excel/excelLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";

const {dialog} = require("electron").remote;
const fs = require("fs");

const hasInputError = false;

const localStore = store({
  isLoadCsvQsortsButtonGreen: false
});

const handleClick = () => {
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = state.getState("isDataAlreadyLoaded");
  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
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
          try {
            if (files !== undefined) {
              const fileName = files[0];
              fs.readFile(fileName, "utf-8", (error, data) => {
                // parse file
                const parsedFile = Papa.parse(data);
                const lines3 = parsedFile.data;
                let qSortPatternArray;

                // remove the first (header) line
                lines3.shift();

                // parsing first line of PQMethod file to set qav variables
                if (lines3.length < 2) {
                  throw new Error("Can't find any Q sorts in the file!");
                }

                // filter out null arrays and calc max, min
                const lines2 = [];
                let maxArrayValue;
                let minArrayValue;
                for (let z = 0; z < lines3.length; z += 1) {
                  const testValue = lines3[z][0];
                  if (testValue) {
                    lines2.push(lines3[z]);
                    maxArrayValue = Math.max(...lines3[z]);
                    minArrayValue = Math.min(...lines3[z]);
                  }
                }
                // set default dataset value
                const numberSorts = lines2.length;

                // calc to remove empty "" strings from array below
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
                  lines2[j].length = maxLength;
                  const tempObj = {};
                  // get name
                  const name = lines2[j].shift();

                  // end loop if no data
                  if (!name) {
                    break;
                  }
                  // set property name
                  tempObj.name = name;
                  // add to names array
                  respondentNames.push(name);
                  // convert to numbers format
                  const asNumbers = lines2[j].map(Number);
                  // grab min value to use with shift positive
                  if (j === 0) {
                    minValue = Math.min(...asNumbers);
                  }

                  // grab last for for copy to qSortPattern
                  qSortPatternArray = asNumbers.slice();

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

                if (hasInputError === false) {
                  revertLoadButtonsColors("csv");
                  state.setState({
                    numQsorts: numberSorts,
                    qSortPattern: qSortPatternArray,
                    // numStatements: lines2[0].length,
                    respondentNames: participantNames,
                    mainDataObject,
                    sortsDisplayText: sortsDisplayTextArray,
                    multiplierArray,
                    dataOrigin: "csv",
                    sortsLoaded: true,
                    notifyDataUploadSuccess: true,
                    areQsortsLoaded: true,
                    isInputButtonGreen: state.getState("areStatementsLoaded"),
                    isDataButtonGreen: state.getState("areStatementsLoaded"),
                    isLoadCsvQsortsButtonGreen: true
                  });
                  localStore.isLoadCsvQsortsButtonGreen = true;
                }
              });
            }
          } catch (error) {
            // console.log("error");
          }
        }
      );
    } catch (error) {
      state.setState({
        errorMessage: error.message,
        showErrorMessageBar: true
      });
    }
  }
};

class LoadTxtStatementFile extends Component {
  render() {
    const isLoadCsvQsortsButtonGreen = state.getState(
      "isLoadCsvQsortsButtonGreen"
    );
    localStore.isLoadCsvQsortsButtonGreen = isLoadCsvQsortsButtonGreen;
    return (
      <LoadTxtButton isActive={ localStore.isLoadCsvQsortsButtonGreen } onClick={ handleClick }>
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
