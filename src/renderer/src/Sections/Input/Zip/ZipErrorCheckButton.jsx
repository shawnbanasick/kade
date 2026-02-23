import GeneralButton from './../../../Utils/GeneralButton';
import inputState from '../../GlobalState/inputState';
import standardImportErrorChecks from '../ErrorChecking/standardImportErrorChecks';
import { useTranslation } from 'react-i18next';

const ZipErrorCheckButton = (props) => {
  const { t } = useTranslation();

  const isActive = inputState((state) => state.isCsvDataErrorCheckButtonGreen);
  const showDataImportSuccessMessage = inputState((state) => state.showDataImportSuccessMessage);
  const statementsImported = inputState((state) => state.statementsLoaded);
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const isQsortPatternLoaded = inputState((state) => state.isQsortPatternLoaded);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);

  const handleOnclick = () => {
    if (statementsImported && areQsortsLoaded && isQsortPatternLoaded) {
      const passesChecks = standardImportErrorChecks();
      if (passesChecks) {
        updateIsCsvDataErrorCheckButtonGreen(true);
        updateShowDataImportSuccessMessage(true);
        updateShowErrorMessageBar(false);
      }
    } else {
      updateShowErrorMessageBar(true);
      updateErrorMessage('Statements, Q sorts, or Q sort pattern values have not been loaded');
      updateErrorStackTrace('Error in Zip data check');
      updateExtendedErrorMessage(
        'Load the statements, Q sorts and Q sort pattern values before checking for errors'
      );
    }
  };

  return (
    <div className="flex flex-row mt-[20px] items-baseline [grid-column-start:1] w-[900px]">
      <div className="text-[20px] mr-[10px] ml-[8px]">
        <b>{props.number}</b> {t('Confirm Data Input')}
      </div>
      <GeneralButton
        id="csvDataErrorCheckButton"
        onClick={handleOnclick}
        className={[
          'mr-[5px]',
          'focus:outline-none',
          'disabled:pointer-events-none disabled:opacity-70',
          isActive
            ? 'shadow-[inset_0_0_0_2px_#666,0_0_1px_transparent] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]'
            : 'bg-orange-500 shadow-[inset_0_0_0_0px_#666,0_0_0px_transparent] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]',
        ].join(' ')}
      >
        {t('Check for Errors')}
      </GeneralButton>
      {showDataImportSuccessMessage && (
        <div className="text-[20px] mr-[10px] ml-[8px]">{t('No errors found')}.</div>
      )}
    </div>
  );
};

export default ZipErrorCheckButton;
