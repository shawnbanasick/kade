import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

const extremeValueErrorCheck = (participantSorts) => {
  // Global State
  const updateShowWarningMessageBar = inputState((state) => state.updateShowWarningMessageBar);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateIsLoadZipButtonGreen = inputState((state) => state.updateIsLoadZipButtonGreen);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  let overRangeSorts = participantSorts.overRangeSorts;
  let underRangeSorts = participantSorts.underRangeSorts;
  let nonNumericSorts = participantSorts.nonNumericSorts;

  if (overRangeSorts.length > 0 || underRangeSorts.length > 0) {
    updateShowWarningMessageBar(false);
    updateShowErrorMessageBar(true);
    updateErrorMessage(
      `${i18n.t('There is a Q sort with values beyond the range of the Q sort design')}`
    );
    updateErrorStackTrace(i18n.t('no stack trace available'));
    updateExtendedErrorMessage(
      `${i18n.t(
        'Participants with a value beyond the range of the Q sort design'
      )}: ${overRangeSorts.join(', ')} ${underRangeSorts.join(', ')}.`
    );
    updateIsLoadZipButtonGreen(false);
    updateIsCsvDataErrorCheckButtonGreen(false);
    updateShowDataImportSuccessMessage(false);

    throw new Error(
      `There is a Q sort with values beyond the range of the Q sort design! [ ${overRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }

  if (nonNumericSorts.length > 0) {
    updateShowWarningMessageBar(false);
    updateShowErrorMessageBar(true);
    updateErrorMessage(`${i18n.t('The Q sorts contain a non-numeric value')}`);
    updateErrorStackTrace(i18n.t('no stack trace available'));
    updateExtendedErrorMessage(
      `${i18n.t('Check the Q sort data for non-numeric values')}: ${nonNumericSorts.join(', ')}.`
    );
    updateIsLoadZipButtonGreen(false);
    updateIsCsvDataErrorCheckButtonGreen(false);
    updateShowDataImportSuccessMessage(false);

    throw new Error(
      `There are problems with Q sort values in the participant sorts! [ ${nonNumericSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
};

export default extremeValueErrorCheck;
