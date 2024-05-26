import React from 'react';

import styled from 'styled-components';
import GeneralButton from '../../../Utils/GeneralButton';
import rotationState from '../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';
import doContinueAnalysis from '../VarimaxHeywoodAdjust/doContinueAnalysis';
import doAdjustValue from '../VarimaxHeywoodAdjust/doAdjustValue';
import doAdjustValuePqmethod from '../VarimaxHeywoodAdjust/doAdjustValuePqmethod';
import getLoadingState from '../../GlobalState/getLoadingState';
import getRotationState from '../../GlobalState/getRotationState';

const RotationButtonGroup = () => {
  const { t } = useTranslation();

  const onVariContClick = (event) => {
    doContinueAnalysis();
    rotationState.variContinueButtonActive = true;
    rotationState.variContinueButtonDisabled = true;
    rotationState.variAdjustButtonActive = false;
    rotationState.variAdjustButtonDisabled = true;
    rotationState.variPqmAdjustButtonActive = false;
    rotationState.variPqmAdjustButtonDisabled = true;
    return;
  };

  const onVariAdjustClick = (event) => {
    doAdjustValue();
    rotationState.variContinueButtonActive = false;
    rotationState.variContinueButtonDisabled = true;
    rotationState.variAdjustButtonActive = true;
    rotationState.variAdjustButtonDisabled = true;
    rotationState.variPqmAdjustButtonActive = false;
    rotationState.variPqmAdjustButtonDisabled = true;
    return;
  };

  const onVariPqmAdjustClick = (event) => {
    doAdjustValuePqmethod();
    rotationState.variContinueButtonActive = false;
    rotationState.variContinueButtonDisabled = true;
    rotationState.variAdjustButtonActive = false;
    rotationState.variAdjustButtonDisabled = true;
    rotationState.variPqmAdjustButtonActive = true;
    rotationState.variPqmAdjustButtonDisabled = true;
    return;
  };

  const shouldDisplay = getRotationState('showVarimaxHeywoodWarning');
  // const varimaxButtonActive = getRotationState("varimaxButtonActive");
  let varimaxButtonDisabled = getRotationState('varimaxButtonDisabled');
  const isDisabled = getLoadingState('bipolarDisabled');

  const variContinueButtonActive = getRotationState('variContinueButtonActive');
  const variContinueButtonDisabled = getRotationState('variContinueButtonDisabled');
  const variAdjustButtonActive = getRotationState('variAdjustButtonActive');
  const variAdjustButtonDisabled = getRotationState('variAdjustButtonDisabled');
  const variPqmAdjustButtonActive = getRotationState('variPqmAdjustButtonActive');
  const variPqmAdjustButtonDisabled = getRotationState('variPqmAdjustButtonDisabled');
  const varimaxHeywoodWarningParticipants = rotationState.varimaxHeywoodWarningParticipants;

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
            isActive={variContinueButtonActive}
            disabled={variContinueButtonDisabled}
            onClick={onVariContClick}
          >
            {t('Continue Analysis')}
          </VarHeywoodButton>
          <VarHeywoodButton
            id="VariAdjustButton"
            isActive={variAdjustButtonActive}
            disabled={variAdjustButtonDisabled}
            onClick={onVariAdjustClick}
          >
            {t('Adjust Value to 0.99')}
          </VarHeywoodButton>
          <VarHeywoodButton
            id="VariPqmAdjustButton"
            isActive={variPqmAdjustButtonActive}
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
