import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  const isLoadJsonTextButtonGreen = inputState((state) => state.isLoadJsonTextButtonGreen);
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  revertLoadButtonsColors('json');

  const updateStatements = coreState((state) => state.updateStatements);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateIsLoadJsonTextButtonGreen = inputState(
    (state) => state.updateIsLoadJsonTextButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

  const processBlob = (data) => {
    console.log(JSON.stringify(data, null, 2));
    const lines = data.split(/[\r\n]+/g);
    const lines2 = lines.filter((e) => e === 0 || e);

    if (lines2.length > 1) {
      console.log(JSON.stringify(lines2, null, 2));

      updateStatements(lines2);
      updateNumStatements(lines2.length);
      updateStatementsLoaded(true);
      updateAreStatementsLoaded(true);
      updateStatementsLoaded(true);
      updateIsLoadJsonTextButtonGreen(true);
      setTimeout(() => {
        updateNotifyDataUploadSuccess(true);
        updateIsInputButtonGreen(areQsortsLoaded);
        updateIsDataButtonGreen(areQsortsLoaded);
      }, 50);
    } else {
      throwNoStatementsInputErrorModal(`Can't find any statements in the file!`);
    }
  };

  const handleClick = async () => {
    await window.electronAPI.openTxtFile();
    window.bridge.txtData((event, txtData) => {
      processBlob(txtData);
    });
  };

  return (
    <LoadButton $isActive={isLoadJsonTextButtonGreen} onClick={handleClick}>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 mr-[20px] h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <p>{t('Load TXT File')}</p>
      </div>
    </LoadButton>
  );
};

export default LoadTxtStatementFile;
