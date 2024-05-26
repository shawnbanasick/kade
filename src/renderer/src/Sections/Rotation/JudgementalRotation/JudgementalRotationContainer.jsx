import React from 'react';

import JudgementalTitleDiv from './plot/JudgementalTitleDiv';
import getRotationState from '../../GlobalState/getRotationState';

const JudgementalRotationContainer = () => {
  const shouldShowJudgeRotDiv = getRotationState('shouldShowJudgeRotDiv');

  return <React.Fragment>{shouldShowJudgeRotDiv ? <JudgementalTitleDiv /> : null}</React.Fragment>;
};

export default JudgementalRotationContainer;
