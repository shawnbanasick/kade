import React from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import doContinueAnalysis from '../VarimaxHeywoodAdjust/doContinueAnalysis';
import doAdjustValue from '../VarimaxHeywoodAdjust/doAdjustValue';
import doAdjustValuePqmethod from '../VarimaxHeywoodAdjust/doAdjustValuePqmethod';
import loadingState from '../../GlobalState/loadingState';
import rotationState from '../../GlobalState/rotationState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();
  const updateVariContinueButtonActive = rotationState((state) => state.variContinueButtonActive);
  const updateVariContinueButtonDisabled = rotationState(
    (state) => state.variContinueButtonDisabled
  );
  const updateVariAdjustButtonActive = rotationState((state) => state.variAdjustButtonActive);
  const updateVariAdjustButtonDisabled = rotationState((state) => state.variAdjustButtonDisabled);
  const updateVariPqmAdjustButtonActive = rotationState((state) => state.variPqmAdjustButtonActive);
  const updateVariPqmAdjustButtonDisabled = rotationState(
    (state) => state.variPqmAdjustButtonDisabled
  );
  const varimaxHeywoodWarningParticipants = rotationState(
    (state) => state.varimaxHeywoodWarningParticipants
  );

  const onVariContClick = () => {
    doContinueAnalysis();
    updateVariContinueButtonActive(true);
    updateVariContinueButtonDisabled(true);
    updateVariAdjustButtonActive(false);
    updateVariAdjustButtonDisabled(true);
    updateVariPqmAdjustButtonActive(false);
    updateVariPqmAdjustButtonDisabled(true);
  };

  const onVariAdjustClick = () => {
    doAdjustValue();
    updateVariContinueButtonActive(false);
    updateVariContinueButtonDisabled(true);
    updateVariAdjustButtonActive(true);
    updateVariAdjustButtonDisabled(true);
    updateVariPqmAdjustButtonActive(false);
    updateVariPqmAdjustButtonDisabled(true);
  };

  const onVariPqmAdjustClick = () => {
    doAdjustValuePqmethod();
    updateVariContinueButtonActive(false);
    updateVariContinueButtonDisabled(true);
    updateVariAdjustButtonActive(false);
    updateVariAdjustButtonDisabled(true);
    updateVariPqmAdjustButtonActive(true);
    updateVariPqmAdjustButtonDisabled(true);
  };

  const shouldDisplay = rotationState((state) => state.showVarimaxHeywoodWarning);
  let varimaxButtonDisabled = rotationState((state) => state.varimaxButtonDisabled);
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const variContinueButtonActive = rotationState((state) => state.variContinueButtonActive);
  const variContinueButtonDisabled = rotationState((state) => state.variContinueButtonDisabled);
  const variAdjustButtonActive = rotationState((state) => state.variAdjustButtonActive);
  const variAdjustButtonDisabled = rotationState((state) => state.variAdjustButtonDisabled);
  const variPqmAdjustButtonActive = rotationState((state) => state.variPqmAdjustButtonActive);
  const variPqmAdjustButtonDisabled = rotationState((state) => state.variPqmAdjustButtonDisabled);

  if (varimaxButtonDisabled === true || isDisabled === true) {
    varimaxButtonDisabled = true;
  }

  if (shouldDisplay) {
    return (
      <React.Fragment>
        <div className="mt-[30px] w-[750px] text-sm">
          {`${t('variHeywoodText1')}. ${t('variHeywoodText2')}. ${t('variHeywoodText3')}.`}
        </div>
        <h4>{`Factor loading > 1: ${varimaxHeywoodWarningParticipants}`}</h4>
        <div className="mt-[25px] flex flex-row">
          <GeneralButton
            id="VariContinueButton"
            $isActive={variContinueButtonActive}
            disabled={variContinueButtonDisabled}
            onClick={onVariContClick}
            className="mr-2.5"
          >
            {t('Continue Analysis')}
          </GeneralButton>
          <GeneralButton
            id="VariAdjustButton"
            $isActive={variAdjustButtonActive}
            disabled={variAdjustButtonDisabled}
            onClick={onVariAdjustClick}
            className="mr-2.5"
          >
            {t('Adjust Value to 0.99')}
          </GeneralButton>
          <GeneralButton
            id="VariPqmAdjustButton"
            $isActive={variPqmAdjustButtonActive}
            disabled={variPqmAdjustButtonDisabled}
            onClick={onVariPqmAdjustClick}
            className="mr-2.5"
          >
            {t('Adjust to PQMethod-style Value')}
          </GeneralButton>
        </div>
      </React.Fragment>
    );
  }

  return null;
};

export default RotationButtonGroup;
