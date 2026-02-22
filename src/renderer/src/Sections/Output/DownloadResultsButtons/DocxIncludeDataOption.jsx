import { useTranslation } from 'react-i18next';
import DocSelectionSwitch from '../downloadDocxLogic/DocSelectionSwitch';
import outputState from '../../GlobalState/outputState';

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();
  const willIncludeDataFiles = outputState((state) => state.willIncludeDataFiles);

  return (
    <div className="h-[100px] w-[300px] mt-25">
      <span className="text-[22px] select-none">{t('Data Files')}</span>
      <hr className="w-full mb-[15px]" />
      <div className="flex items-center pl-[10px]">
        <div className="select-none text-[18px]">{`1. ${t('Export as KADE Zip File (including data input files)')}`}</div>
        <DocSelectionSwitch
          name="willIncludeDataFiles"
          value="willIncludeDataFiles"
          toggle={willIncludeDataFiles}
        />
      </div>
    </div>
  );
};

export default GeneralOptionsPanel;
