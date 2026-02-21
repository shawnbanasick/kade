import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocxIcon from '../../images/DOCX_Icon2.svg';

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const downloadDocxButtonActive = outputState((state) => state.downloadDocxButtonActive);

  const handleOnclick = () => {
    updateShowDocxOptions(true);
    updateDownloadDocxButtonActive(true);
  };

  return (
    <div className="flex items-baseline">
      <GeneralButton
        id="DownloadDocxFile"
        onClick={handleOnclick}
        className="w-fit min-w-[250px] bg-grey-button"
      >
        <div className="flex flex-row justify-center items-center text-[22px] h-full w-full">
          <div className="flex justify-center items-center mr-[10px]">
            <img src={DocxIcon} className="h-[30px]" alt="docx Icon" />
          </div>
          {t('Document')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DistStateListSortByButtons;
