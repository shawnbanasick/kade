import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { ToastContainer, toast, Slide } from "react-toastify";
import state from "../../../store";
import convertJSONToData from "./convertJSONToData";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";
import throwNoSortsInputErrorModal from "../throwNoSortsInputError";

const { dialog } = require("electron").remote;
const fs = require("fs");

const localStore = store({
  isLoadJsonQsortsButtonGreen: false
});

function notifyWarning() {
  toast.warn("Select Participant Id to complete JSON import", {
    autoClose: false
  });
}

let isNoError = true;

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
              name: "JSON",
              extensions: ["json", "JSON"]
            }
          ]
        },
        files => {
          if (files !== undefined) {
            console.log("called");
            const fileName = files[0];
            fs.readFile(fileName, "utf8", (err, data) => {
              const results = JSON.parse(data);

              // convert from JSON to array
              const resultsArray = [];
              const resultsKeys = Object.keys(results);
              for (let k = 0; k < resultsKeys.length; k += 1) {
                resultsArray.push(results[resultsKeys[k]]);
              }

              const testValue = Object.prototype.hasOwnProperty.call(
                resultsArray[0],
                "sort"
              );
              if (!testValue) {
                throwNoSortsInputErrorModal(
                  `Can't find the key named "sort" in JSON object`
                );
                isNoError = false;
              }

              if (isNoError === true) {
                // todo - this is the source of the extra brackets
                const csvData = convertJSONToData(results);
                const columnHeaders = csvData[0][0];

                revertLoadButtonsColors("json");
                state.setState({
                  jsonParticipantId: columnHeaders,
                  showJsonParticipantIdDropdown: true,
                  csvData,
                  jsonObj: results,
                  dataOrigin: "json",
                  areQsortsLoaded: true,
                  isInputButtonGreen: state.getState("areStatementsLoaded")
                });
                notifyWarning();
              }
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
    const isLoadJsonQsortsButtonGreen = state.getState(
      "isLoadJsonQsortsButtonGreen"
    );
    localStore.isLoadJsonQsortsButtonGreen = isLoadJsonQsortsButtonGreen;
    return (
      <React.Fragment>
        <LoadTxtButton
          isActive={localStore.isLoadJsonQsortsButtonGreen}
          onClick={() => handleClick()}
        >
          <p>Load JSON File</p>
        </LoadTxtButton>
        <ToastContainer transition={Slide} />
      </React.Fragment>
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
  margin-top: 15px;
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
