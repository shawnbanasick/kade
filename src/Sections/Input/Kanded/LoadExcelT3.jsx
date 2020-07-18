import React from "react";
import { view } from "react-easy-state";
import parseExcelType3 from "./KandedLogic/parseExcelType3.js";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import LoadButton from "../DemoData/LoadButton";
import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const { remote } = require("electron");
const mainWindow = remote.getCurrentWindow();
const { dialog } = require("electron").remote;

const handleClick = async () => {
  const trans1 = i18n.t(
    "Data have already been loaded and the analysis has started"
  );
  const trans2 = i18n.t("To clear this analysis and restart the application");
  const trans3 = i18n.t(
    "click the Clear Project button near the bottom of the navigation panel"
  );
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
  if (isDataAlreadyLoaded) {
    inputState.showErrorMessageBar = true;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "Data are already loaded click Clear Project to restart"
    );
    inputState.extendedErrorMessage = `${trans1}. ${trans2}, ${trans3}.`;
    inputState.errorStackTrace = i18n.t("no stack trace available");
  } else {
    try {
      const data = await dialog.showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [
          {
            name: "Excel",
            extensions: ["xls", "XLS", "xlsx", "XLSX"]
          }
        ]
      });

      const path = data.filePaths[0];

      // dialog cancelled case
      if (path === undefined) {
        return;
      }

      parseExcelType3(path);
      revertLoadButtonsColors("excelT3");
      inputState.notifyDataUploadSuccess = true;
      inputState.isLoadExcelT3ButtonGreen = true;
      appState.isInputButtonGreen = true;
      appState.isDataButtonGreen = true;
    } catch (error) {
      // catch unknown input error
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = `There was an unexpected Excel data input error`;
      inputState.extendedErrorMessage = `Check the format of the KADE file and try again.`;
      inputState.errorStackTrace = "no stack trace available";
    }
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadExcelT3ButtonGreen = inputState.isLoadExcelT3ButtonGreen;

  return (
    <LoadButton
      isActive={isLoadExcelT3ButtonGreen}
      onClick={() => handleClick()}
    >
      <p>{t("Load KADE Excel File")}</p>
    </LoadButton>
  );
};

export default view(LoadTxtStatementFile);
