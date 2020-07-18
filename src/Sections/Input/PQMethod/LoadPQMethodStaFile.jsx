import { view } from "react-easy-state";
import React from "react";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import numStatementsMatchErrorModal from "../numStatementsMatchErrorModal";
import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
import inputState from "../../GlobalState/inputState";
import LoadButton from "../DemoData/LoadButton";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const clone = require("rfdc")();
const { dialog } = require("electron").remote;
const fs = require("fs");
const { remote } = require("electron");
const mainWindow = remote.getCurrentWindow();

const handleClick = async () => {
  //getState - check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
  const trans1 = i18n.t(
    "Data have already been loaded and the analysis has started"
  );
  const trans2 = i18n.t("To clear this analysis and restart the application");
  const trans3 = i18n.t(
    "click the Clear Project button near the bottom of the navigation panel"
  );
  if (isDataAlreadyLoaded) {
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "Data are already loaded click Clear Project to restart"
    );
    inputState.extendedErrorMessage = `${trans1}. ${trans2}, ${trans3}.`;
    inputState.errorStackTrace = i18n.t("no stack trace available");
  } else {
    let isNoError = true;

    const files = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [
        {
          name: "STA",
          extensions: ["sta", "STA"]
        }
      ]
    });

    const path = files.filePaths[0];

    // dialog cancelled case
    if (path === undefined) {
      return;
    }

    fs.readFile(path, "utf8", (error, data) => {
      if (error != null) {
        // alert("file open error.");
        console.log("file open error");
        return;
      }
      processBlob(data.toString());
    });

    const processBlob = data => {
      // split into lines
      const lines = data.split(/[\r\n]+/g);
      // remove empty strings
      const lines2 = lines.filter(e => e === 0 || e);

      // console.log(lines2);

      // getState
      const areQsortsLoaded = inputState.areQsortsLoaded;
      if (areQsortsLoaded) {
        const qSortPattern = clone(coreState.SortPattern);
        if (qSortPattern.length !== lines2.length) {
          isNoError = false;
          numStatementsMatchErrorModal();
        }
      }

      if (isNoError) {
        coreState.statements = lines2;
        inputState.statementsLoaded = true;

        revertLoadButtonsColors("pqmethod");
        inputState.notifyDataUploadSuccess = true;
        inputState.areStatementsLoaded = true;
        inputState.isLoadPqmethodTextButtonButtonGreen = true;
        appState.isInputButtonGreen = inputState.areQsortsLoaded;
        appState.isDataButtonGreen = inputState.areQsortsLoaded;
      }
    };
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadPqmethodTextButtonButtonGreen =
    inputState.isLoadPqmethodTextButtonButtonGreen;

  return (
    <LoadButton
      isActive={isLoadPqmethodTextButtonButtonGreen}
      onClick={() => handleClick()}
    >
      <p>{t("Load STA File")}</p>
    </LoadButton>
  );
};

export default view(LoadTxtStatementFile);
