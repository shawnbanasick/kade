import React from "react";
import { view } from "react-easy-state";
import uploadLipsetData from "./uploadLipsetData";
import revertLoadButtonsColors from "./revertLoadButtonsColors";
import LoadButton from "./LoadButton";
import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const handleClick = () => {
  const trans1 = i18n.t(
    "Data have already been loaded and the analysis has started"
  );
  const trans2 = i18n.t("To clear this analysis and restart the application");
  const trans3 = i18n.t(
    "click the Clear Project button near the bottom of the navigation panel"
  );

  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;
  if (isDataAlreadyLoaded) {
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "Data are already loaded click Clear Project to restart"
    );
    inputState.extendedErrorMessage = `${trans1}. ${trans2}, ${trans3}.`;
    inputState.errorStackTrace = i18n.t("no stack trace available");
  } else {
    uploadLipsetData();
    revertLoadButtonsColors();
    inputState.isLoadLipsetButtonGreen = true;
    inputState.notifyDataUploadSuccess = true;
    appState.isInputButtonGreen = true;
    appState.isDataButtonGreen = true;
  }
};

const LipsetButton1 = () => {
  const { t } = useTranslation();

  const isLoadLipsetButtonGreen = inputState.isLoadLipsetButtonGreen;
  return (
    <LoadButton
      id="lipsetButton"
      floated="right"
      onClick={handleClick}
      isActive={isLoadLipsetButtonGreen}
    >
      {t("Load Lipset")}
    </LoadButton>
  );
};

export default view(LipsetButton1);
