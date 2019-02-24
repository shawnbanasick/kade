import { view, store } from "react-easy-state";
import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import styled from "styled-components";
import state from "../../../store";
import parsePQMethodFile from "../logic/parsePQMethodFile";
import sortsDisplayText from "../logic/sortsDisplayText";
import checkUniqueParticipantName from "../logic/checkUniqueParticipantName";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({
  isLoadPqmethodQsortsButtonGreen: false
});

const handleClick = () => {
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = state.getState("isDataAlreadyLoaded");
  if (isDataAlreadyLoaded) {
    state.setState({
      showErrorMessageBar: true,
      errorMessage: `Data are already loaded, click "Clear Project" to restart`,
      extendedErrorMessage: `Data have already been loaded and the analysis has started. To clear this analysis and restart the application, click the "Clear Project" button near the bottom of the navigation panel.`,
      errorStackTrace: "no stack trace available"
    });
  } else {
    try {
      dialog.showOpenDialog(
        {
          properties: ["openFile"],
          filters: [
            {
              name: "DAT",
              extensions: ["dat", "DAT"]
            }
          ]
        },
        files => {
          if (files !== undefined) {
            const fileName = files[0];
            fs.readFile(fileName, "utf-8", (err, data2) => {
              const data = parsePQMethodFile(data2);

              const mainDataObject = cloneDeep(data[4][1]);
              const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

              const participantNamesPrep = cloneDeep(data[4][0]);
              const participantNamesPrep2 = checkUniqueParticipantName(
                participantNamesPrep
              );

              // send data to STATE
              state.setState({
                numQsorts: data[0],
                projectName: data[1],
                projectHistoryArray: [
                  `${data[1]} data loaded from PQMethod DAT file`
                ],
                numStatements: data[2],
                multiplierArray: cloneDeep(data[3]),
                respondentNames: participantNamesPrep2,
                mainDataObject,
                sortsDisplayText: sortsDisplayTextArray,
                qSortPattern: data[5],
                dataOrigin: "pqmethod"
              });

              localStore.isLoadPqmethodQsortsButtonGreen = true;
              revertLoadButtonsColors("pqmethod");
              state.setState({
                notifyDataUploadSuccess: true,
                areQsortsLoaded: true,
                isInputButtonGreen: state.getState("areStatementsLoaded"),
                isDataButtonGreen: state.getState("areStatementsLoaded"),
                isLoadPqmethodQsortsButtonGreen: true
              });
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
  }
};

class LoadTxtStatementFile extends Component {
  render() {
    const isLoadPqmethodQsortsButtonGreen = state.getState(
      "isLoadPqmethodQsortsButtonGreen"
    );
    localStore.isLoadPqmethodQsortsButtonGreen = isLoadPqmethodQsortsButtonGreen;
    return (
      <LoadTxtButton
        isActive={localStore.isLoadPqmethodQsortsButtonGreen}
        onClick={() => handleClick()}
      >
        <p>Load DAT File</p>
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
    /* margin-top: 3px; */
  }
`;
