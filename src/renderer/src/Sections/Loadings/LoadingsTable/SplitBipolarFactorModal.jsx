import splitBipolarFactor from '../loadingsLogic/splitBipolarFactor';
import SplitBipolarFactorDropdownSelect from './SplitBipolarFactorDropdownSelect';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';
import GeneralButton from '../../../Utils/GeneralButton';

const SplitBipolarFactorButtonModal = () => {
  const { t } = useTranslation();
  const updateShowSplitFactorModal = loadingState((state) => state.updateShowSplitFactorModal);
  const updateBipolarFactorsArray = loadingState((state) => state.updateBipolarFactorsArray);
  let bipolarFactorsArray = loadingState((state) => state.bipolarFactorsArray);
  let factorToSplit = loadingState((state) => state.factorToSplit);
  const showSplitFactorModal = loadingState((state) => state.showSplitFactorModal);

  const handleClose = () => {
    updateShowSplitFactorModal(false);
  };

  const handleClick = () => {
    updateShowSplitFactorModal(false);
    bipolarFactorsArray.push(factorToSplit);
    updateBipolarFactorsArray([...bipolarFactorsArray]);
    splitBipolarFactor();
  };

  if (!showSplitFactorModal) return null;

  return (
    <dialog className={`modal ${showSplitFactorModal ? 'modal-open' : ''}`}>
      <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
        <div className="text-3xl text-center font-bold mb-4">{t('Factor Loadings Table')}</div>
        <div className="mb-6">
          <SplitBipolarFactorDropdownSelect />
        </div>
        <div className="flex justify-end">
          <GeneralButton
            id="splitBipolarModalSubmitButton"
            onClick={handleClick}
            className="bg-primary-button"
          >
            {t('Submit')}
          </GeneralButton>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default SplitBipolarFactorButtonModal;
