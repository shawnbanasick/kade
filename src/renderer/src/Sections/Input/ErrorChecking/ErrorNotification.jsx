import { useEffect, useState } from 'react';

// import ExtendedErrorModal from './ExtendedErrorModal';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const ErrorNotification = () => {
  const { t } = useTranslation();
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  // const updateIsCsvDataErrorCheckButtonGreen = inputState(
  //   (state) => state.updateIsCsvDataErrorCheckButtonGreen
  // );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  const showErrorMessageBar = inputState((state) => state.showErrorMessageBar);
  const errorMessage = inputState((state) => state.errorMessage);
  const errorMessageString = `${t('Error')}:  ${errorMessage}`;
  const errorStackTrace = inputState((state) => state.errorStackTrace) || '';
  const errorMessageString2 = inputState((state) => state.errorMessage) || '';
  const extendedErrorMessage = inputState((state) => state.extendedErrorMessage);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const closeModal = () => {
    setShowErrorModal(false);
    updateShowErrorMessageBar(false);
    updateErrorStackTrace(t('no stack trace available'));
    updateShowDataImportSuccessMessage(false);
  };

  useEffect(() => {
    if (!showErrorMessageBar) return undefined;

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
  }, [showErrorMessageBar]);

  if (showErrorMessageBar) {
    return (
      <>
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
              className="flex h-6 w-8 shrink-0 items-center self-end justify-center rounded-tr-md  bg-red-500/60 hover:bg-red-500/80 text-2xl pb-1.5 font-bold text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="min-h-50 items-center overflow-auto bg-gray-50 p-4 rounded-lg mx-5">
              <div className="flex flex-col items-left justify-center gap-4">
                {/* HEADER TEXT */}
                <h3 className="text-3xl font-semibold text-gray-900">{errorMessage}</h3>
                <hr />
                {/* ERROR STACK TRACE */}
                <div className="mt-1 text-xl leading-relaxed text-gray-800">
                  {extendedErrorMessage}
                </div>
                <div className="mt-2 text-xl leading-relaxed text-gray-800">
                  {errorStackTrace ? <div>{errorStackTrace}</div> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default ErrorNotification;
