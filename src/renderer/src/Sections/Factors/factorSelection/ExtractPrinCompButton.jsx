import React from 'react';
import { view } from '@risingstack/react-easy-state';
import pcaDispatch from '../PcaLogic/pcaDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';
import rotationState from '../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';
import getFactorState from '../../GlobalState/getFactorState';

function handleClick() {
  factorState.calculatingPca = true;
  factorState.activePcaButton = true;
  factorState.isCentroidRevealButtonDisabled = true;
  factorState.isPcaButtonDisabled = true;
  rotationState.showKeepFacForRotButton = true;

  // to allow time for the spinner to display
  setTimeout(() => {
    pcaDispatch();
  }, 10);
  appState.isFactorsButtonGreen = true;
}

const PCAButton = () => {
  const { t } = useTranslation();

  // getState
  const isActive = getFactorState('activePcaButton');
  const isDisabled = getFactorState('isPcaButtonDisabled');
  // const isCalculating = getFactorState("calculatingPca");
  return (
    <div>
      <GeneralButton
        id="extractPrinCompButton"
        isActive={isActive}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {t('Principal Components')}
      </GeneralButton>
    </div>
  );
};

export default view(PCAButton);
