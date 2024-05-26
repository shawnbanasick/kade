import React from 'react';

import varimaxDispatch from '../varimaxLogic/varimaxDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import rotationState from '../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';
import getLoadingState from '../../GlobalState/getLoadingState';
import getRotationState from '../../GlobalState/getRotationState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();

  const onVarimaxClick = (event) => {
    rotationState.rotationDegrees = 0;
    const userSelectedRotFactors = [];
    const abFactors = [];
    rotationState.highlightRotfactor1 = false;
    rotationState.highlightRotfactor2 = false;
    rotationState.highlightRotfactor3 = false;
    rotationState.highlightRotfactor4 = false;
    rotationState.highlightRotfactor5 = false;
    rotationState.highlightRotfactor6 = false;
    rotationState.highlightRotfactor7 = false;
    rotationState.highlightRotfactor8 = false;
    rotationState.userSelectedRotFactors = userSelectedRotFactors;
    rotationState.abFactors = abFactors;
    rotationState.showScatterPlotTableDiv = false;
    rotationState.isCalculatingVarimax = true;
    rotationState.varimaxButtonActive = true;

    setTimeout(() => {
      varimaxDispatch();
    }, 50);
    return;
  };

  const shouldDisplay = getRotationState('shouldDisplayFacKept');
  const varimaxButtonActive = getRotationState('varimaxButtonActive');
  let varimaxButtonDisabled = getRotationState('varimaxButtonDisabled');
  const varimaxButtonText = getRotationState('varimaxButtonText');
  const isDisabled = getLoadingState('bipolarDisabled');
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
