import React from "react";
import { view } from "react-easy-state";
import parseExcelType1 from "./parseExcelType1";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";
import LoadButton from "../DemoData/LoadButton";
import inputState from "../../GlobalState/inputState";
import { useTranslation } from "react-i18next";

const { dialog } = require("electron").remote;
const { remote } = require("electron");
const mainWindow = remote.getCurrentWindow();

const LoadExcelT1 = () => {
  const { t } = useTranslation();
  const isLoadExcelT1ButtonGreen = inputState.isLoadExcelT1ButtonGreen;

  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
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
        // send data to processing
        const path = data.filePaths[0];

        // dialog cancelled case
        if (path === undefined) {
          return;
        }

        parseExcelType1(path);
        revertLoadButtonsColors("excelT1");
      } catch (error) {
        // catch unknown input error
        inputState.errorMessage = t(
          "There was an unexpected Excel data input error"
        );
        inputState.extendedErrorMessage = t(
          "Check the format of the file and try again"
        );
        inputState.errorStackTrace = t("no stack trace available");
        inputState.showErrorMessageBar = true;
      }
    }
  };

  return (
    <LoadButton isActive={isLoadExcelT1ButtonGreen} onClick={handleClick}>
      <p>{t("Load Type 1 Excel File")}</p>
    </LoadButton>
  );
};

export default view(LoadExcelT1);
