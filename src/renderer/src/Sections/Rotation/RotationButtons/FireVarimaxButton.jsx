import varimaxDispatch from '../varimaxLogic/varimaxDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import rotationState from '../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();
  const updateHighlightRotfactor1 = rotationState((state) => state.updateHighlightRotfactor1);
  const updateHighlightRotfactor2 = rotationState((state) => state.updateHighlightRotfactor2);
  const updateHighlightRotfactor3 = rotationState((state) => state.updateHighlightRotfactor3);
  const updateHighlightRotfactor4 = rotationState((state) => state.updateHighlightRotfactor4);
  const updateHighlightRotfactor5 = rotationState((state) => state.updateHighlightRotfactor5);
  const updateHighlightRotfactor6 = rotationState((state) => state.updateHighlightRotfactor6);
  const updateHighlightRotfactor7 = rotationState((state) => state.updateHighlightRotfactor7);
  const updateHighlightRotfactor8 = rotationState((state) => state.updateHighlightRotfactor8);
  const updateRotationDegrees = rotationState((state) => state.updateRotationDegrees);
  const updateUserSelectedRotFactors = rotationState((state) => state.updateUserSelectedRotFactors);
  const updateAbFactors = rotationState((state) => state.updateAbFactors);
  const updateShowScatterPlotTableDiv = rotationState(
    (state) => state.updateShowScatterPlotTableDiv
  );
  const updateIsCalculatingVarimax = rotationState((state) => state.updateIsCalculatingVarimax);
  const updateVarimaxButtonActive = rotationState((state) => state.updateVarimaxButtonActive);

  const shouldDisplay = rotationState((state) => state.shouldDisplayFacKept);
  const varimaxButtonActive = rotationState((state) => state.varimaxButtonActive);
  let varimaxButtonDisabled = rotationState((state) => state.varimaxButtonDisabled);
  const varimaxButtonText = rotationState((state) => state.varimaxButtonText);
  const isDisabled = loadingState((state) => state.bipolarDisabled);

  const varimaxButtonTextTrans = t(varimaxButtonText);

  const onVarimaxClick = () => {
    updateRotationDegrees(0);
    const userSelectedRotFactors = [];
    const abFactors = [];

    updateHighlightRotfactor1(false);
    updateHighlightRotfactor2(false);
    updateHighlightRotfactor3(false);
    updateHighlightRotfactor4(false);
    updateHighlightRotfactor5(false);
    updateHighlightRotfactor6(false);
    updateHighlightRotfactor7(false);
    updateHighlightRotfactor8(false);
    updateUserSelectedRotFactors(userSelectedRotFactors);
    updateAbFactors(abFactors);
    updateShowScatterPlotTableDiv(false);
    updateIsCalculatingVarimax(true);
    updateVarimaxButtonActive(true);

    setTimeout(() => {
      varimaxDispatch();
    }, 50);
    return;
  };

  if (varimaxButtonDisabled === true || isDisabled === true) {
    varimaxButtonDisabled = true;
  }

  if (shouldDisplay) {
    return (
      <div>
        <GeneralButton
          id="pcaRotationButton"
          $isActive={varimaxButtonActive}
          disabled={varimaxButtonDisabled}
          onClick={onVarimaxClick}
        >
          {varimaxButtonTextTrans}
        </GeneralButton>
      </div>
    );
  }
  return (
    <p style={{ fontSize: 22 }}>{t('Please select the number of factors to keep for rotation')}</p>
  );
};

export default RotationButtonGroup;
