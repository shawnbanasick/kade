import invertFactor from '../loadingsLogic/invertFactor';
import InvertFactorDropdownSelect from './InvertFactorDropdownSelect';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';
import GeneralButton from '../../../Utils/GeneralButton';

const InvertFactorButtonModal = () => {
  const { t } = useTranslation();
  const updateShowInvertFactorModal = loadingState((state) => state.updateShowInvertFactorModal);
  const showInvertFactorModal = loadingState((state) => state.showInvertFactorModal);

  const doInvertFactor = () => {
    updateShowInvertFactorModal(false);
    invertFactor();
  };

  const quit = () => {
    updateShowInvertFactorModal(false);
  };

  if (!showInvertFactorModal) return null;

  return (
    <dialog className={`modal ${showInvertFactorModal ? 'modal-open' : ''}`}>
      <div className="modal-box bg-gray-800 text-neutral-content w-[550px]">
        <div className="text-3xl text-center font-bold mb-4">{t('Factor Loadings Table')}</div>
        <div className="mb-6">
          <InvertFactorDropdownSelect />
        </div>
        <div className="flex justify-between gap-4">
          <GeneralButton onClick={quit} className="bg-primary-button">
            {t('Cancel')}
          </GeneralButton>
          <GeneralButton
            id="invertFactorSubmitButton"
            onClick={doInvertFactor}
            className="bg-primary-button"
          >
            {t('Submit')}
          </GeneralButton>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={quit}>close</button>
      </form>
    </dialog>
  );
};

export default InvertFactorButtonModal;
