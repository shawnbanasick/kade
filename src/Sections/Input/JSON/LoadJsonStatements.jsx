import React from "react";
import { view } from "react-easy-state";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal";
import LoadButton from "../DemoData/LoadButton";
import inputState from "../../GlobalState/inputState";
import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
import { useTranslation } from "react-i18next";

const { dialog } = require("electron").remote;
const fs = require("fs");
// needed to attach open dialog to mainWindow when opened
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

    // handle case when open dialog closed
    if (files.filePaths[0] === undefined) {
      return;
    }

    const path = files.filePaths[0];

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

      if (lines2.length > 1) {
        const areQsortsLoaded = inputState.areQsortsLoaded;
        revertLoadButtonsColors("json");
        coreState.statements = lines2;
        coreState.numStatements = lines2.length;
        inputState.statementsLoaded = true;
        inputState.notifyDataUploadSuccess = true;
        inputState.areStatementsLoaded = true;
        inputState.statementsLoaded = true;
        inputState.isLoadJsonTextButtonGreen = true;
        appState.isInputButtonGreen = areQsortsLoaded;
        appState.isDataButtonGreen = areQsortsLoaded;
      } else {
        throwNoStatementsInputErrorModal(
          `Can't find any statements in the file!`
        );
      }
    };
  }
};

const LoadTxtStatementFile = () => {
  const { t  } = useTranslation();

  const isLoadJsonTextButtonGreen = inputState.isLoadJsonTextButtonGreen;

  return (
    <LoadButton isActive={isLoadJsonTextButtonGreen} onClick={handleClick}>
      <p>{t("Load TXT File")}</p>
    </LoadButton>
  );
};

export default view(LoadTxtStatementFile);
