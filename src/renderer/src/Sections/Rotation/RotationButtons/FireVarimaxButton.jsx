import varimaxDispatch from '../varimaxLogic/varimaxDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import rotationState from '../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();
  const updateHighlightRotfactor1 = rotationState((state) => state.highlightRotfactor1);
  const updateHighlightRotfactor2 = rotationState((state) => state.highlightRotfactor2);
  const updateHighlightRotfactor3 = rotationState((state) => state.highlightRotfactor3);
  const updateHighlightRotfactor4 = rotationState((state) => state.highlightRotfactor4);
  const updateHighlightRotfactor5 = rotationState((state) => state.highlightRotfactor5);
  const updateHighlightRotfactor6 = rotationState((state) => state.highlightRotfactor6);
  const updateHighlightRotfactor7 = rotationState((state) => state.highlightRotfactor7);
  const updateHighlightRotfactor8 = rotationState((state) => state.highlightRotfactor8);
  const updateRotationDegrees = rotationState((state) => state.rotationDegrees);
  const updateUserSelectedRotFactors = rotationState((state) => state.userSelectedRotFactors);
  const updateAbFactors = rotationState((state) => state.abFactors);
  const updateShowScatterPlotTableDiv = rotationState((state) => state.showScatterPlotTableDiv);
  const updateIsCalculatingVarimax = rotationState((state) => state.isCalculatingVarimax);
  const updateVarimaxButtonActive = rotationState((state) => state.varimaxButtonActive);

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

  const shouldDisplay = rotationState((state) => state.shouldDisplayFacKept);
  const varimaxButtonActive = rotationState((state) => state.varimaxButtonActive);
  let varimaxButtonDisabled = rotationState((state) => state.varimaxButtonDisabled);
  const varimaxButtonText = rotationState('varimaxButtonText');
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const varimaxButtonTextTrans = t(varimaxButtonText);

  if (varimaxButtonDisabled === true || isDisabled === true) {
    varimaxButtonDisabled = true;
  }

  if (shouldDisplay) {
    return (
      <div>
        <GeneralButton
          id="pcaRotationButton"
          isActive={varimaxButtonActive}
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
