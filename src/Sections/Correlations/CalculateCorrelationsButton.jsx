import React from "react";
import { view, store } from "react-easy-state";
import mainCorrCalcs from "./correlationsLogic/mainCorrCalcs";
import ErrorNotification from "../Input/ErrorNotification";
import calcMaxRespondentNameLength from "./calcMaxRespondentNameLength";
import coreState from "../GlobalState/coreState";
import appState from "../GlobalState/appState";
import inputState from "../GlobalState/inputState";
import GeneralButton from "../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const localStore = store({
  isCorrelationsButtonGreen: false
});

const CalculateCorrelationsButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    // getState
    const respondentNames = clone(coreState.respondentNames);

    if (respondentNames) {
      calcMaxRespondentNameLength(respondentNames);
      const mainDataObject = clone(coreState.mainDataObject);
      const rawSortsArray = mainDataObject.map(item => item.rawSort);
      mainCorrCalcs(respondentNames, rawSortsArray);
    } else {
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = t("No data to calculate correlations");
    }
  };

  const isCorrelationsButtonGreen = appState.isCorrelationsButtonGreen;
  localStore.isCorrelationsButtonGreen = isCorrelationsButtonGreen;
  return (
    <React.Fragment>
      <GeneralButton
        isActive={localStore.isCorrelationsButtonGreen}
        onClick={() => handleClick()}
      >
        <p>{t("Calculate Correlations")}</p>
      </GeneralButton>
      <ErrorNotification />
    </React.Fragment>
  );
};

export default view(CalculateCorrelationsButton);
