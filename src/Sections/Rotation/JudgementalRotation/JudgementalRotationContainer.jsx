import React from "react";
import { view } from "react-easy-state";
import JudgementalTitleDiv from "./plot/JudgementalTitleDiv";
import rotationState from "../../GlobalState/rotationState";

const JudgementalRotationContainer = () => {
  const shouldShowJudgeRotDiv = rotationState.shouldShowJudgeRotDiv;

  return (
    <React.Fragment>
      {shouldShowJudgeRotDiv ? <JudgementalTitleDiv /> : null}
    </React.Fragment>
  );
};

export default view(JudgementalRotationContainer);
