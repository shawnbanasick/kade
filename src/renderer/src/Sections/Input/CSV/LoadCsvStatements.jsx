// import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';

const LoadCsvStatements = () => {
  const { t } = useTranslation();
  const isLoadCsvTextButtonGreen = inputState((state) => state.isLoadCsvTextButtonGreen);
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);

  const updateStatements = coreState((state) => state.updateStatements);
  const numStatements = coreState((state) => state.numStatements); // <-- persisted count
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  // const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const areStatementsLoaded = inputState((state) => state.areStatementsLoaded); // <-- statements, not qsorts
  const updateIsLoadCsvTextButtonGreen = inputState(
    (state) => state.updateIsLoadCsvTextButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

  const processBlob = (data) => {
    // split into lines
    const lines = data.split(/[\r\n]+/g);
    // remove empty strings
    const lines2 = lines.filter((e) => e === 0 || e);

    if (lines2.length > 1) {
      updateStatements(lines2);
      updateNumStatements(lines2.length);
      updateStatementsLoaded(true);
      updateAreStatementsLoaded(true);
      updateStatementsLoaded(true);
      updateIsLoadCsvTextButtonGreen(true);
      setTimeout(() => {
        // updateNotifyDataUploadSuccess(true);
        updateIsInputButtonGreen(areQsortsLoaded);
        updateIsDataButtonGreen(areQsortsLoaded);
      }, 50);

      /*
        coreState.statements = lines2;
        coreState.numStatements = lines2.length;
        inputState.statementsLoaded = true;
        inputState.notifyDataUploadSuccess = true;
        inputState.areStatementsLoaded = true;
        inputState.statementsLoaded = true;
        inputState.isLoadJsonTextButtonGreen = true;
        appState.isInputButtonGreen = areQsortsLoaded;
        appState.isDataButtonGreen = areQsortsLoaded;
        */
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

  const buttonText = areStatementsLoaded
    ? `${t('Statements imported:')} ${numStatements} `
    : t('Load TXT File');

  return (
    <NewLoadButton
      onClick={handleClick}
      className={`${isLoadCsvTextButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        {!areStatementsLoaded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="rotate-180 h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        ) : null}
        <div className="font-sans text-sm font-bold">{buttonText}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadCsvStatements;
