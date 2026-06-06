import downloadDistStates from '../DistinguishingStatementsDisplay/downloadDistStates';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  const updateConThresholdButtonActive = outputState(
    (state) => state.updateConThresholdButtonActive
  );
  const updateConNumberButtonActive = outputState((state) => state.updateConNumberButtonActive);

  const updateQSortValueButtonActive = outputState((state) => state.updateQSortValueButtonActive);
  const updateStatementNumButtonActive = outputState(
    (state) => state.updateStatementNumButtonActive
  );
  const updateZScoreButtonActive = outputState((state) => state.updateZScoreButtonActive);
  const updateDistStateListSortKey = outputState((state) => state.updateDistStateListSortKey);
  const ConThresholdButtonActive = outputState((state) => state.ConThresholdButtonActive);
  const ConNumberButtonActive = outputState((state) => state.ConNumberButtonActive);
  const qSortValueButtonActive = outputState((state) => state.qSortValueButtonActive);
  const statementNumButtonActive = outputState((state) => state.statementNumButtonActive);
  const zScoreButtonActive = outputState((state) => state.zScoreButtonActive);
  const updateConStephensonSortBy = outputState((state) => state.updateConStephensonSortBy);

  const clearAllButtons = () => {
    updateConThresholdButtonActive(false);
    updateConNumberButtonActive(false);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'thresholdButton') {
      clearAllButtons();
      updateConThresholdButtonActive(true);
      updateConStephensonSortBy('threshold');
    }

    if (buttonId === 'statementNumButton') {
      clearAllButtons();
      updateConNumberButtonActive(true);
      updateConStephensonSortBy('statementNum');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="mr-2.5 text-[18px] font-bold">{t('Sort By')}</div>

      <GeneralButton
        id="thresholdButton"
        onClick={handleOnclick}
        key="f1"
        className={`min-w-30 ${ConThresholdButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Threshold')}
      </GeneralButton>

      <GeneralButton
        id="statementNumButton"
        onClick={handleOnclick}
        key="f3"
        className={`min-w-30 ${ConNumberButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Number')}
      </GeneralButton>

      <GeneralButton
        id="downloadButton"
        onClick={() => downloadDistStates()}
        key="f5"
        className="h-10 min-w-45 bg-grey-button p-0! ml-206"
      >
        <div className="flex flex-row justify-center items-center">
          <div className="flex justify-center items-center mr-2.5">
            <img src={CsvIcon} className="w-7 h-7" alt="csv Icon" />
          </div>
          {t('Download Data')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DistStateListSortByButtons;
