import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import parseExcelType1 from "./parseExcelType1";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";

const { dialog } = require("electron").remote;

const localStore = store({
  isLoadExcelT1ButtonGreen: false
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
            name: "Excel",
            extensions: ["xls", "XLS", "xlsx", "XLSX"]
          }
        ]
      },
      files => {
        if (files !== undefined) {
          try {
            const excelFile = files[0];
            parseExcelType1(excelFile);
            revertLoadButtonsColors("excelT1");
            // localStore.isLoadExcelT1ButtonGreen = state.getState(
            //   "isLoadExcelT1ButtonGreen"
            // );
          } catch (error) {
            // catch unknown input error
            state.setState({
              showErrorMessageBar: true,
              errorMessage: `There was an unexpected Excel data input error`,
              extendedErrorMessage: `Check the format of the Excel file and try again.`,
              errorStackTrace: "no stack trace available"
            });
          }
        }
      }
    );
  }
};

class LoadExcelT1 extends Component {
  render() {
    const isLoadExcelT1ButtonGreen = state.getState("isLoadExcelT1ButtonGreen");
    localStore.isLoadExcelT1ButtonGreen = isLoadExcelT1ButtonGreen;
    return (
      <LoadTxtButton
        isActive={localStore.isLoadExcelT1ButtonGreen}
        onClick={handleClick}
      >
        <p>Load Type 1 Excel File</p>
      </LoadTxtButton>
    );
  }
}

export default view(LoadExcelT1);

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
