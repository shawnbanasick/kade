import downloadDistStates from './downloadDistStates';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  const updateThresholdButtonActive = outputState((state) => state.updateThresholdButtonActive);
  const updateQSortValueButtonActive = outputState((state) => state.updateQSortValueButtonActive);
  const updateStatementNumButtonActive = outputState(
    (state) => state.updateStatementNumButtonActive
  );
  const updateZScoreButtonActive = outputState((state) => state.updateZScoreButtonActive);
  const updateDistStateListSortKey = outputState((state) => state.updateDistStateListSortKey);
  const thresholdButtonActive = outputState((state) => state.thresholdButtonActive);
  const qSortValueButtonActive = outputState((state) => state.qSortValueButtonActive);
  const statementNumButtonActive = outputState((state) => state.statementNumButtonActive);
  const zScoreButtonActive = outputState((state) => state.zScoreButtonActive);

  const clearAllButtons = () => {
    updateThresholdButtonActive(false);
    updateQSortValueButtonActive(false);
    updateStatementNumButtonActive(false);
    updateZScoreButtonActive(false);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'thresholdButton') {
      clearAllButtons();
      updateThresholdButtonActive(true);
      updateDistStateListSortKey('threshold');
    }
    if (buttonId === 'qSortValueButton') {
      clearAllButtons();
      updateQSortValueButtonActive(true);
      updateDistStateListSortKey('qSortValue');
    }
    if (buttonId === 'statementNumButton') {
      clearAllButtons();
      updateStatementNumButtonActive(true);
      updateDistStateListSortKey('statementNum');
    }
    if (buttonId === 'zScoreButton') {
      clearAllButtons();
      updateZScoreButtonActive(true);
      updateDistStateListSortKey('zScore');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="mr-[10px] text-[18px] font-bold">{t('Sort By')}</div>

      <GeneralButton
        id="thresholdButton"
        onClick={handleOnclick}
        key="f1"
        className={`min-w-[120px] ${thresholdButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Threshold')}
      </GeneralButton>
      <GeneralButton
        id="qSortValueButton"
        onClick={handleOnclick}
        key="f2"
        className={`min-w-[120px] ${qSortValueButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Q Sort Value')}
      </GeneralButton>
      <GeneralButton
        id="statementNumButton"
        onClick={handleOnclick}
        key="f3"
        className={`min-w-[120px] ${statementNumButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Number')}
      </GeneralButton>
      <GeneralButton
        id="zScoreButton"
        onClick={handleOnclick}
        key="f4"
        className={`min-w-[120px] ${zScoreButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Z score')}
      </GeneralButton>

      <GeneralButton
        id="downloadButton"
        onClick={() => downloadDistStates()}
        key="f5"
        className="h-[30px] min-w-[160px] bg-grey-button p-0! border border-red-500"
      >
        <div className="flex flex-row justify-center items-center">
          <div className="flex justify-center items-center mr-[10px]">
            <img src={CsvIcon} className="w-[28px] h-[28px]" alt="csv Icon" />
          </div>
          {t('Download Data')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DistStateListSortByButtons;
