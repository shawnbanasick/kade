import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import calcState from '../GlobalState/calcState';
import appState from '../GlobalState/appState';
import outputState from '../GlobalState/outputState';

import GeneralButton from '../../Utils/GeneralButton';
import outputDispatch from './calcualteOutputLogic/1_outputDispatch';

const ResultsCalcOutputButton = () => {
  const { t } = useTranslation();
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );
  const updateIsOutputButtonGreen = appState((state) => state.updateIsOutputButtonGreen);
  const updateOutputFactorSelectButtonsDisabled = outputState(
    (state) => state.updateOutputFactorSelectButtonsDisabled
  );
  const sigLevel1 = calcState((state) => state.userSelectedDistStateSigLevel1);
  const sigLevel2 = calcState((state) => state.userSelectedDistStateSigLevel2);
  let userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const updateDisplayOutputTabContent = outputState((state) => state.updateDisplayOutputTabContent);
  const isCalculateResultsButtonOrange = outputState(
    (state) => state.isCalculateResultsButtonOrange
  );
  const updateIsCalculateResultsButtonOrange = outputState(
    (state) => state.updateIsCalculateResultsButtonOrange
  );
  const isCalculateResultsButtonGreen = outputState((state) => state.isCalculateResultsButtonGreen);
  const updateIsCalculateResultsButtonGreen = outputState(
    (state) => state.updateIsCalculateResultsButtonGreen
  );
  const updateIsCalculateResultsButtonDisabled = outputState(
    (state) => state.updateIsCalculateResultsButtonDisabled
  );
  const isCalculateResultsButtonDisabled = outputState(
    (state) => state.isCalculateResultsButtonDisabled
  );
  const updateNotifyOutputCalculationSuccess = outputState(
    (state) => state.updateNotifyOutputCalculationSuccess
  );
  const showNotification = outputState((state) => state.notifyOutputCaculationSuccess);

  // const resultsCohenButtons2Value = outputState((state) => state.resultsCohenButtons2Value);
  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(
      <div>
        {t('Success!')}
        <br />
        {t('Results are ready for download.')}
      </div>,
      {
        autoClose: false,
        position: 'bottom-right',
        closeOnClick: true,
        draggable: true,
        theme: 'light',
        style: {
          background: '#fff',
          color: 'dark-gray',
          outline: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      }
    );
    await updateNotifyOutputCalculationSuccess(false);
  };

  if (showNotification) {
    notify();
  }

  const handleSubmit = () => {
    if (sigLevel1 <= sigLevel2) {
      console.log('button error - sigLevel1 must be greater than sigLevel2');
      outputState.notifyOutputDistStateError = true;
      return;
    }

    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      updateShowDownloadOutputButtons(true);
      updateIsOutputButtonGreen(true);
      updateOutputFactorSelectButtonsDisabled(true);
      updateDisplayOutputTabContent(true);
      updateIsCalculateResultsButtonGreen(true);
      updateIsCalculateResultsButtonOrange(false);
      updateIsCalculateResultsButtonDisabled(true);
      updateNotifyOutputCalculationSuccess(true);
    }
  };

  return (
    <>
      <ToastContainer transition={Zoom} />
      <div className="flex flex-row mt-4 items-baseline text-2xl gap-2 w-full">
        <span className="">3. {t('Generate Results')}:</span>
        <div className="h-2" />
        <GeneralButton
          id="startOutput"
          onClick={handleSubmit}
          className={`w-45 text-[20px] ${isCalculateResultsButtonGreen ? 'bg-primary-button' : isCalculateResultsButtonOrange ? 'bg-orange-button' : 'bg-grey-button'} h-7.5 p-0! items-center justify-center`}
          disabled={isCalculateResultsButtonDisabled}
        >
          {t('Calculate')}
        </GeneralButton>
      </div>
    </>
  );
};

export default ResultsCalcOutputButton;
