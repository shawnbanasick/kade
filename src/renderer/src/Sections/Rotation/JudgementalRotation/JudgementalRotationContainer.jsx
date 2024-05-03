import React from 'react';
import { view } from '@risingstack/react-easy-state';
import JudgementalTitleDiv from './plot/JudgementalTitleDiv';
import getRotationState from '../../GlobalState/getRotationState';

const JudgementalRotationContainer = () => {
  const shouldShowJudgeRotDiv = getRotationState('shouldShowJudgeRotDiv');

  return <React.Fragment>{shouldShowJudgeRotDiv ? <JudgementalTitleDiv /> : null}</React.Fragment>;
};

export default view(JudgementalRotationContainer);
