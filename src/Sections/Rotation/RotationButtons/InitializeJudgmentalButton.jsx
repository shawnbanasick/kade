import React from "react";
import { view } from "react-easy-state";
import rotationState from "../../GlobalState/rotationState";
import loadingState from "../../GlobalState/loadingState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const RotationButtonGroup = () => {
  const { t } = useTranslation();

  const onJudgeClick = event => {
    const shouldShowDiv = rotationState.shouldShowJudgeRotDiv;
    if (shouldShowDiv === false) {
      rotationState.shouldShowJudgeRotDiv = true;
      rotationState.judgeButtonActive = true;
    } else {
      rotationState.shouldShowJudgeRotDiv = false;
      rotationState.judgeButtonActive = false;
    }
  };

  // getState and initialize judgment rot button
  const shouldDisplay = rotationState.shouldDisplayFacKept;
  const judgeButtonActive = rotationState.judgeButtonActive;
  let varimaxButtonDisabled = rotationState.varimaxButtonDisabled;
  const isDisabled = loadingState.bipolarDisabled;
  const shouldShowJudgeRotDiv = rotationState.shouldShowJudgeRotDiv;
  const showInitializeButton = !shouldShowJudgeRotDiv;

  if (varimaxButtonDisabled === true || isDisabled === true) {
    varimaxButtonDisabled = true;
  }

  if (shouldDisplay) {
    if (showInitializeButton) {
      return (
        <div>
          <GeneralButton
            id="judgementalRotationButton"
            isAactive={judgeButtonActive}
            disabled={isDisabled}
            onClick={onJudgeClick}
          >
            {t("Initialize Judgmental Rotation")}
          </GeneralButton>
        </div>
      );
    }
    return null;
  }
  return (
    <p style={{ fontSize: 22 }}>
      {t("Please select the number of factors to keep for rotation")}
    </p>
  );
};

export default view(RotationButtonGroup);
