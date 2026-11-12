import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-[17px] w-[17px] fill-current"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </div>
          {t('Document')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DistStateListSortByButtons;
