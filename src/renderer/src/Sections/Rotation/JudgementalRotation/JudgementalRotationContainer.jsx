import React from 'react';
import JudgementalTitleDiv from './plot/JudgementalTitleDiv';
import rotationState from '../../GlobalState/rotationState';

const JudgementalRotationContainer = () => {
  const shouldShowJudgeRotDiv = rotationState((state) => state.shouldShowJudgeRotDiv);

  return <React.Fragment>{shouldShowJudgeRotDiv ? <JudgementalTitleDiv /> : null}</React.Fragment>;
};

export default JudgementalRotationContainer;
