import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const CsvSuccessfulLoadBar = () => {
  const hasAddedProjectName = getInputState('hasAddedProjectName');
  const sortsLoaded = getInputState('areQsortsLoaded');
  const statementsLoaded = getInputState('statementsLoaded');
  const isQsortPatternLoaded = getInputState('isQsortPatternLoaded');
  const showDataImportSuccessMessage = getInputState('showDataImportSuccessMessage');

  if (
    !hasAddedProjectName ||
    !sortsLoaded ||
    !statementsLoaded ||
    !isQsortPatternLoaded ||
    !showDataImportSuccessMessage
  )
    return null;

  inputState.showErrorMessageBar = false;

  return (
    <div className="bg-[var(--main-theme-color)] h-[50px] px-[10px] font-[Helvetica,sans-serif] text-[20px] flex justify-between items-center self-start [grid-column-start:1] [grid-column-end:-1] [grid-row-start:4] rounded-[4px] border-2 border-[#d6dbe0] mt-[10px] w-[700px]">
      <p>CSV Import Success -- Confirm Q sorts in the Data section</p>
    </div>
  );
};

export default CsvSuccessfulLoadBar;
