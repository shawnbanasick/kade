import React from "react";
import { view } from "react-easy-state";
import GeneralButton from "../../../Utils/GeneralButton";
import outputState from "../../GlobalState/outputState";
import { useTranslation } from "react-i18next";

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  // hide button is only one factor selected
  const userSelectedFactors = outputState.userSelectedFactors;
  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const { t } = useTranslation();
  const handleDisplayViz = () => {
    // getState
    const displayFactorVisualizations = outputState.displayFactorVisualizations;
    const shouldShow = !displayFactorVisualizations;
    outputState.displayFactorVisualizations = shouldShow;
  };

  // getState
  const showDownloadOutputButtons = outputState.showDownloadOutputButtons;
  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div style={{ display: "flex" }}>
        <GeneralButton
          id="displayVisualizationsButton"
          onClick={handleDisplayViz}
        >
          {t("Display Composite Factors")}
        </GeneralButton>
      </div>
    );
  }
  return null;
};

export default view(DisplayVisualizationsButtons);
