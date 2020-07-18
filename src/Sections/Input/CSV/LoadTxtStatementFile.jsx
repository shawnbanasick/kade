import React from "react";
import { view } from "react-easy-state";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal.js";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";
import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import coreState from "../../GlobalState/coreState";
import LoadButton from "../DemoData/LoadButton";
import { useTranslation } from "react-i18next";

const { dialog } = require("electron").remote;
const fs = require("fs");
const { remote } = require("electron");
const mainWindow = remote.getCurrentWindow();

const handleClick = async () => {
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
    const files = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [
        {
          name: "Text",
          extensions: ["txt", "TXT"]
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
        console.log("file open error");
        // alert("file open error.");
        return;
      }
      processBlob(data.toString());
    });

    const processBlob = data => {
      const lines = data.split(/[\r\n]+/g);
      // remove empty strings
      const lines2 = lines.filter(e => e === 0 || e);
      const statementsLength = lines2.length;
      const areQsortsLoaded = inputState.areQsortsLoaded;
      if (lines2.length === 0) {
        throwNoStatementsInputErrorModal();
      } else {
        console.log("writing to state");
        revertLoadButtonsColors("csv");
        coreState.statements = lines2;
        coreState.numStatements = statementsLength;
        inputState.statementsLoaded = true;
        inputState.notifyDataUploadSuccess = true;
        inputState.areStatementsLoaded = true;
        inputState.isLoadCsvTextButtonGreen = true;
        appState.isInputButtonGreen = areQsortsLoaded;
        appState.isDataButtonGreen = areQsortsLoaded;
      }
    };
  }
};

const LoadTxtStatementFile = () => {
  const { t  } = useTranslation();

  // getState
  const isLoadCsvTextButtonGreen = inputState.isLoadCsvTextButtonGreen;

  return (
    <LoadButton isActive={isLoadCsvTextButtonGreen} onClick={handleClick}>
      <p>{t("Load TXT File")}</p>
    </LoadButton>
  );
};

export default view(LoadTxtStatementFile);
