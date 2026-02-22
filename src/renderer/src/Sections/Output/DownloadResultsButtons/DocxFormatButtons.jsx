import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import outputState from '../../GlobalState/outputState';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  let tocText = t(
    '(MS Word Only) Table of Contents and Section Hyperlinks (will request permission to update links on file open)'
  );
  let zebraText = t('Zebra Striping');

  const updateUseTablesButtonActive = outputState((state) => state.updateUseTablesButtonActive);
  const updateUseClippedButtonActive = outputState((state) => state.updateUseClippedButtonActive);
  const updateUseClipped = outputState((state) => state.updateUseClipped);
  const updateUseTables = outputState((state) => state.updateUseTables);
  const useTablesButtonActive = outputState((state) => state.useTablesButtonActive);
  const willUseHyperlinks = outputState((state) => state.willUseHyperlinks);
  const useZebra = outputState((state) => state.useZebra);
  const useClippedButtonActive = outputState((state) => state.useClippedButtonActive);

  const clearAllButtons = () => {
    updateUseTablesButtonActive(false);
    updateUseClippedButtonActive(false);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    if (buttonId === 'ContentUseTables') {
      clearAllButtons();
      updateUseTablesButtonActive(true);
      updateUseClipped(false);
      updateUseTables(true);
    }

    if (buttonId === 'ContentUseClipped') {
      clearAllButtons();
      updateUseClippedButtonActive(true);
      updateUseClipped(true);
      updateUseTables(false);
    }
  };

  return (
    <div className="flex flex-col pt-[3px] w-[300px] h-[260px] mb-6">
      <span className="text-[22px] select-none">{t('Document Format')}</span>
      <hr className="w-full mb-[15px]" />

      <div className="flex items-center pl-[10px] mb-[25px]">
        <div className="select-none text-[18px]">{`1. ${tocText}`}</div>
        <DocSelectionSwitch
          name="willUseHyperlinks"
          value="willUseHyperlinks"
          toggle={willUseHyperlinks}
        />
      </div>

      <div className="flex items-center pl-[10px] mb-[20px]">
        <div className="select-none text-[18px]">{`2. ${zebraText}`}</div>
        <DocSelectionSwitch name="useZebra" value="useZebra" toggle={useZebra} />
      </div>

      <div className="select-none text-[18px] pl-[10px] ">{`3. ${t('Statement Length')}`}</div>

      <div className="flex items-baseline gap-x-[10px]">
        <GeneralButton
          id="ContentUseTables"
          onClick={handleOnclick}
          className={`min-w-[120px] ${useTablesButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('Full-Length Statements')}
        </GeneralButton>
        <GeneralButton
          id="ContentUseClipped"
          onClick={handleOnclick}
          className={`min-w-[120px] s${useClippedButtonActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('Truncated Statements')}
        </GeneralButton>
      </div>
    </div>
  );
};

export default DistStateListSortByButtons;
