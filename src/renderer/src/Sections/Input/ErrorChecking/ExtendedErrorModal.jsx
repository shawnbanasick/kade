import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import GeneralButton from '../../../Utils/GeneralButton';

const ExtendedErrorModal = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const extendedErrorMessage = inputState((state) => state.extendedErrorMessage);
  const errorStackTrace = inputState((state) => state.errorStackTrace);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <GeneralButton onClick={handleOpen} className="bg-grey-button">
        {t('Error Details')}
      </GeneralButton>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">{t('Error Details')}</div>
          <div className="mb-6">
            <p className="text-xl">{extendedErrorMessage}</p>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Stacktrace:</h3>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-auto">{errorStackTrace}</pre>
            </div>
          </div>
          <div className="flex justify-end">
            <GeneralButton onClick={handleClose} className="bg-primary-button">
              {t('Return')}
            </GeneralButton>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ExtendedErrorModal;
