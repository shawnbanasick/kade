import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";
import parseExcelType3 from "./KandedLogic/parseExcelType3.js";
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';

const {dialog} = require("electron").remote;

const localStore = store({
    isLoadExcelT3ButtonGreen: false,
});

const handleClick = () => {
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
                const excelFile = files[0];
                parseExcelType3(excelFile);
                localStore.isLoadExcelT3ButtonGreen = true;
                revertLoadButtonsColors("excelT3");
                state.setState({
                    notifyDataUploadSuccess: true,
                    isInputButtonGreen: true,
                    isLoadExcelT3ButtonGreen: true,
                });
            }
        }
    );
};

class LoadTxtStatementFile extends Component {
    render() {
        const isLoadExcelT3ButtonGreen = state.getState("isLoadExcelT3ButtonGreen");
        localStore.isLoadExcelT3ButtonGreen = isLoadExcelT3ButtonGreen;

        return (
            <LoadTxtButton isActive={ localStore.isLoadExcelT3ButtonGreen } onClick={ () => handleClick() }>
              <p>Load KADE Excel File</p>
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

  &:hover {
    background-color: ${props => props.isActive ? "#009a00" : "#abafb3" };
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;
