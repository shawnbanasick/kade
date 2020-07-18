import React from "react";
import { view } from "react-easy-state";
import uploadBuzzwordData from "./uploadBuzzwordData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";
import LoadButton from "./LoadButton";
import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const handleClick = () => {
  const message1 = i18n.t(
    "Data are already loaded click Clear Project to restart"
  );
  const message2 = i18n.t(
    "Data have already been loaded and the analysis has started"
  );
  const message3 = i18n.t("To clear this analysis and restart the application");
  const message4 = i18n.t(
    "click the Clear Project button near the bottom of the navigation panel"
  );
  const message5 = i18n.t("no stack trace available");

  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
  if (isDataAlreadyLoaded) {
    inputState.errorMessage = message1;
    inputState.extendedErrorMessage = `${message2}${message3}${message4}`;
    inputState.errorStackTrace = message5;
    inputState.showErrorMessageBar = true;
  } else {
    uploadBuzzwordData();
    revertLoadButtonsColors();
    inputState.isLoadBuzzwordsButtonGreen = true;
    inputState.notifyDataUploadSuccess = true;
    inputState.areStatementsLoaded = true;
    inputState.areQsortsLoaded = true;
    appState.isInputButtonGreen = true;
    appState.isDataButtonGreen = true;
  }
};

const BuzzwordButton1 = () => {
  const { t } = useTranslation();

  const isLoadBuzzwordsButtonGreen = inputState.isLoadBuzzwordsButtonGreen;
  return (
    <LoadButton
      id="buzzwordButton"
      floated="right"
      onClick={handleClick}
      isActive={isLoadBuzzwordsButtonGreen}
    >
      {t("Load Buzzwords")}
    </LoadButton>
  );
};

export default view(BuzzwordButton1);
