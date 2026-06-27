import { useTranslation } from 'react-i18next';
import GeneralButton from '../../Utils/GeneralButton';
import outputDispatch from './calcualteOutputLogic/1_outputDispatch';
import outputState from '../GlobalState/outputState';
import appState from '../GlobalState/appState';
import calcState from '../GlobalState/calcState';

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

  const handleSubmit = () => {
    if (sigLevel1 <= sigLevel2) {
      outputState.notifyOutputDistStateError = true;
      return;
    }
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      updateShowDownloadOutputButtons(true);
      updateIsOutputButtonGreen(true);
      updateOutputFactorSelectButtonsDisabled(true);
      updateDisplayOutputTabContent(true);
    }
  };

  return (
    <div className="flex flex-row mt-4 items-baseline text-2xl gap-2 w-full">
      <span className="">3. {t('Generate Results')}:</span>
      <div className="h-2" />
      <GeneralButton
        id="startOutput"
        onClick={handleSubmit}
        className="w-45 text-[20px] bg-grey-button h-7.5 p-0! items-center justify-center"
      >
        {t('Calculate')}
      </GeneralButton>
    </div>
  );
};

export default ResultsCalcOutputButton;
