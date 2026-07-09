import pcaDispatch from '../PcaLogic/pcaDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';
import rotationState from '../../GlobalState/rotationState';

const PCAButton = () => {
  const { t } = useTranslation();

  // getState
  const isActive = factorState((state) => state.activePcaButton);
  const isDisabled = factorState((state) => state.isPcaButtonDisabled);
  const updateCalculatingPca = factorState((state) => state.updateCalculatingPca);
  const updateActivePcaButton = factorState((state) => state.updateActivePcaButton);
  const updateIsCentroidRevealButtonDisabled = factorState(
    (state) => state.updateIsCentroidRevealButtonDisabled
  );
  const updateIsPcaButtonDisabled = factorState((state) => state.updateIsPcaButtonDisabled);
  const updateShowKeepFacForRotButton = rotationState(
    (state) => state.updateShowKeepFacForRotButton
  );
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);

  const handleClick = async () => {
    await updateCalculatingPca(true);
    await updateActivePcaButton(true);
    await updateIsPcaButtonDisabled(true);
    await updateShowKeepFacForRotButton(true);
    await updateIsCentroidRevealButtonDisabled(true);
    await pcaDispatch();
    await updateIsFactorsButtonGreen(true);
  };

  return (
    <GeneralButton
      id="extractPrinCompButton"
      disabled={isDisabled}
      onClick={handleClick}
      className={`h-[30px] ml-10! px-3 whitespace-nowrap w-auto min-w-fit ${
        isActive ? 'bg-primary-button' : 'bg-grey-button'
      }`}
    >
      {t('Principal Components')}
    </GeneralButton>
  );
};

export default PCAButton;
