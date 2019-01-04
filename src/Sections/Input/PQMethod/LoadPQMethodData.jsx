import { view, store } from "react-easy-state";
import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import styled from "styled-components";
import state from "../../../store";
import parsePQMethodFile from "../logic/parsePQMethodFile";
import sortsDisplayText from "../logic/sortsDisplayText";
import checkUniqueParticipantName from "../logic/checkUniqueParticipantName";

const {dialog} = require("electron").remote;
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

                        localStore.buttonColor = "rgba(144,	238,	144, .6)";
                        state.setState({
                            notifyDataUploadSuccess: true,
                            areQsortsLoaded: true,
                            isInputButtonGreen: state.getState("areStatementsLoaded"),
                            loadPqmethodQsortsButtonColor: "rgba(144,	238,	144, .6)"
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
};

class LoadTxtStatementFile extends Component {
    render() {
        const loadPqmethodQsortsButtonColor = state.getState("loadPqmethodQsortsButtonColor");
        localStore.buttonColor = loadPqmethodQsortsButtonColor;
        return (
            <LoadTxtButton buttonColor={ localStore.buttonColor } onClick={ () => handleClick() }>
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

  &:hover {
    background-color: #abafb3;
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
  }
`;
