import React from 'react';
import styled from 'styled-components';
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
    return;
  };

  const onVariAdjustClick = () => {
    doAdjustValue();
    updateVariContinueButtonActive(false);
    updateVariContinueButtonDisabled(true);
    updateVariAdjustButtonActive(true);
    updateVariAdjustButtonDisabled(true);
    updateVariPqmAdjustButtonActive(false);
    updateVariPqmAdjustButtonDisabled(true);
    return;
  };

  const onVariPqmAdjustClick = () => {
    doAdjustValuePqmethod();
    updateVariContinueButtonActive(false);
    updateVariContinueButtonDisabled(true);
    updateVariAdjustButtonActive(false);
    updateVariAdjustButtonDisabled(true);
    updateVariPqmAdjustButtonActive(true);
    updateVariPqmAdjustButtonDisabled(true);
    return;
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

  const textTrans1 = t('variHeywoodText1');
  const textTrans2 = t('variHeywoodText2');
  const textTrans3 = t('variHeywoodText3');

  if (shouldDisplay) {
    return (
      <React.Fragment>
        <TextDiv>{`${textTrans1}. ${textTrans2}. ${textTrans3}.`}</TextDiv>
        <h4>{`Factor loading > 1: ${varimaxHeywoodWarningParticipants}`}</h4>
        <ContainerDiv>
          <VarHeywoodButton
            id="VariContinueButton"
            $isActive={variContinueButtonActive}
            disabled={variContinueButtonDisabled}
            onClick={onVariContClick}
          >
            {t('Continue Analysis')}
          </VarHeywoodButton>
          <VarHeywoodButton
            id="VariAdjustButton"
            $isActive={variAdjustButtonActive}
            disabled={variAdjustButtonDisabled}
            onClick={onVariAdjustClick}
          >
            {t('Adjust Value to 0.99')}
          </VarHeywoodButton>
          <VarHeywoodButton
            id="VariPqmAdjustButton"
            $isActive={variPqmAdjustButtonActive}
            disabled={variPqmAdjustButtonDisabled}
            onClick={onVariPqmAdjustClick}
          >
            {t('Adjust to PQMethod-style Value')}
          </VarHeywoodButton>
        </ContainerDiv>
      </React.Fragment>
    );
  }
  return null;
};

export default RotationButtonGroup;

// return <p style={{ fontSize: 22 }}>Continue with Analysis</p>;

const ContainerDiv = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
`;

const VarHeywoodButton = styled(GeneralButton)`
  margin-right: 10px;
`;

const TextDiv = styled.div`
  margin-top: 30px;
  width: 750px;
  font-size: 14px;
`;
