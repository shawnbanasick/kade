import inputState from '../../GlobalState/inputState';
// import getInputState from '../../GlobalState/getInputState';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';
import processCsvQsorts from './processCsvQsorts';

const LoadCsvQsorts = () => {
  const { t } = useTranslation();
  const isLoadCsvQsortsButtonGreen = inputState((state) => state.isLoadCsvQsortsButtonGreen);

  const trans1 = t('Data have already been loaded and the analysis has started');
  const trans2 = t('To clear this analysis and restart the application');
  const trans3 = t('click the Clear Project button near the bottom of the navigation panel');

  const handleClick = async () => {
    try {
      await window.electronAPI.openCsvFile();
      window.bridge.csvData((event, csvData) => {
        processCsvQsorts(csvData);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <NewLoadButton
      onClick={handleClick}
      className={`${isLoadCsvQsortsButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      <div className="flex flex-row  justify-center items-center h-full w-full gap-3">
        <svg
          id="ExcelT1SvgContainer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 h-4.25 w-4.25 fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="font-sans text-lg font-bold">{t('Load CSV File')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadCsvQsorts;
