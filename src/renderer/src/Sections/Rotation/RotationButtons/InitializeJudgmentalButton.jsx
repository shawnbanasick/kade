import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import rotationState from '../../GlobalState/rotationState';
import loadingState from '../../GlobalState/loadingState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();

  // getState and initialize judgment rot button
  const shouldShowDiv = rotationState((state) => state.shouldShowJudgeRotDiv);
  const updateShouldShowJudgeRotDiv = rotationState((state) => state.shouldShowJudgeRotDiv);
  const updateJudgeButtonActive = rotationState((state) => state.judgeButtonActive);
  const shouldDisplay = rotationState((state) => state.shouldDisplayFacKept);
  const judgeButtonActive = rotationState((state) => state.judgeButtonActive);
  let varimaxButtonDisabled = rotationState((state) => state.varimaxButtonDisabled);
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const shouldShowJudgeRotDiv = rotationState((state) => state.shouldShowJudgeRotDiv);
  const showInitializeButton = !shouldShowJudgeRotDiv;

  const onJudgeClick = () => {
    if (shouldShowDiv === false) {
      updateShouldShowJudgeRotDiv(true);
      updateJudgeButtonActive(true);
    } else {
      updateShouldShowJudgeRotDiv(false);
      updateJudgeButtonActive(false);
    }
  };

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
