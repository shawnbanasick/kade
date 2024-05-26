import React from 'react';

import rotationState from '../../GlobalState/rotationState';
import getRotationState from '../../GlobalState/getRotationState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getLoadingState from '../../GlobalState/getLoadingState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();

  const onJudgeClick = (event) => {
    const shouldShowDiv = getRotationState('shouldShowJudgeRotDiv');
    if (shouldShowDiv === false) {
      rotationState.shouldShowJudgeRotDiv = true;
      rotationState.judgeButtonActive = true;
    } else {
      rotationState.shouldShowJudgeRotDiv = false;
      rotationState.judgeButtonActive = false;
    }
  };

  // getState and initialize judgment rot button
  const shouldDisplay = getRotationState('shouldDisplayFacKept');
  const judgeButtonActive = getRotationState('judgeButtonActive');
  let varimaxButtonDisabled = getRotationState('varimaxButtonDisabled');
  const isDisabled = getLoadingState('bipolarDisabled');
  const shouldShowJudgeRotDiv = getRotationState('shouldShowJudgeRotDiv');
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
            {t('Initialize Judgmental Rotation')}
          </GeneralButton>
        </div>
      );
    }
    return null;
  }
  return (
    <p style={{ fontSize: 22 }}>{t('Please select the number of factors to keep for rotation')}</p>
  );
};

export default RotationButtonGroup;
