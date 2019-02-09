import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { ToastContainer, toast, Slide } from "react-toastify";
import state from "../../../store";
import convertJSONToData from "./convertJSONToData";
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';


const {dialog} = require("electron").remote;
const fs = require("fs");

const localStore = store({
    isLoadJsonQsortsButtonGreen: false,
});

function notifyWarning() {
    toast.warn("Select Participant Id to complete JSON import", {
        autoClose: false
    });
}

const handleClick = () => {
    try {
        dialog.showOpenDialog(
            {
                properties: ["openFile"],
                filters: [
                    {
                        name: "JSON",
                        extensions: ["json", "JSON"]
                    }
                ]
            },
            files => {
                if (files !== undefined) {
                    const fileName = files[0];
                    fs.readFile(fileName, "utf8", (err, data) => {
                        const results = JSON.parse(data);

                        // convert from JSON to array
                        const resultsArray = [];
                        const resultsKeys = Object.keys(results);
                        for (let k = 0; k < resultsKeys.length; k += 1) {
                            resultsArray.push(results[resultsKeys[k]]);
                        }

                        // todo - this is the source of the extra brackets
                        const csvData = convertJSONToData(results);
                        console.log("csv data", JSON.stringify(csvData));
                        const columnHeaders = csvData[0][0];
                        revertLoadButtonsColors("json");
                        state.setState({
                            jsonParticipantId: columnHeaders,
                            showJsonParticipantIdDropdown: true,
                            csvData,
                            jsonObj: results,
                            dataOrigin: "json",
                            areQsortsLoaded: true,
                            // isLoadJsonQsortsButtonGreen: true,
                            isInputButtonGreen: state.getState("areStatementsLoaded"),
                        });
                    // localStore.isLoadJsonQsortsButtonGreen = true;
                    });
                    notifyWarning();
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
        const isLoadJsonQsortsButtonGreen = state.getState("isLoadJsonQsortsButtonGreen");
        localStore.isLoadJsonQsortsButtonGreen = isLoadJsonQsortsButtonGreen;
        return (
            <React.Fragment>
              <LoadTxtButton isActive={ localStore.isLoadJsonQsortsButtonGreen } onClick={ () => handleClick() }>
                <p>Load JSON File</p>
              </LoadTxtButton>
              <ToastContainer transition={ Slide } />
            </React.Fragment>
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
  margin-top: 15px;
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

