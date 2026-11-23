import { useEffect, useState } from 'react';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
// import GeneralButton from '../../../Utils/GeneralButton';

const WarningNotification = () => {
  const { t } = useTranslation();

  const closeModal = () => {
    setShowErrorModal(false);
    updateShowWarningMessageBar(false);
    updateErrorStackTrace(t('no stack trace available'));
    updateShowDataImportSuccessMessage(false);
    // updateIsCsvDataErrorCheckButtonGreen(false);
  };

  const [showErrorModal, setShowErrorModal] = useState(false);

  const showWarningMessageBar = inputState((state) => state.showWarningMessageBar);

  const errorMessage = inputState((state) => state.errorMessage) || '';
  const errorMessageString1 = inputState((state) => state.extendedErrorMessage) || '';
  const errorMessageString2 = inputState((state) => state.extendedErrorMessage2) || '';
  const errorStackTrace =
    inputState((state) => state.errorStackTrace) || t('no stack trace available');

  const updateShowWarningMessageBar = inputState((state) => state.updateShowWarningMessageBar);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  useEffect(() => {
    if (!showWarningMessageBar) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowErrorModal(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showErrorModal]);

  // const handleOnClick = () => {
  //   updateShowWarningMessageBar(false);
  //   updateErrorStackTrace(t('no stack trace available'));
  //   updateIsCsvDataErrorCheckButtonGreen(false);
  //   updateShowDataImportSuccessMessage(false);
  // };

  if (showWarningMessageBar) {
    return (
      <>
        {showErrorModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={t('Error')}
          >
            <div
              className="relative flex max-h-full max-w-[80rem] flex-col overflow-hidden rounded-lg bg-white shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label={t('Close')}
                className="absolute right-3 top-3 flex h-7 w-7.5 pb-1 pl-0.5 items-center justify-center rounded-full bg-black/60 text-lg leading-none text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                autoFocus
              >
                &times;
              </button>

              <div className="min-h-50 items-center overflow-auto bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col items-left justify-center gap-4">
                  {/* HEADER TEXT */}
                  <h3 className="text-3xl font-semibold text-gray-900">{errorMessage}</h3>
                  <hr />
                  {/* BODY TEXT LINE 1 */}
                  <div className="mt-1 text-xl leading-relaxed text-gray-800">
                    {errorMessageString1}
                  </div>
                  {/* BODY TEXT LINE 2 */}
                  <div className="mt-1 text-xl leading-relaxed text-gray-800">
                    {errorMessageString2}
                  </div>
                  {/* ERROR STACK TRACE */}
                  <div className="mt-1 text-xl leading-relaxed text-gray-800">
                    {errorStackTrace}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return null;
};

export default WarningNotification;
