import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import outputState from '../../GlobalState/outputState';
// import calcState from '../../GlobalState/calcState';

import GeneralButton from '../../../Utils/GeneralButton';
import resetSection6 from '../../../Utils/resetSection6';
// import appState from '../../GlobalState/appState';
// import includes from 'lodash/includes';
// import outputDispatch from '../calcualteOutputLogic/1_outputDispatch';
// import filter from 'lodash/filter';

const FactorSelectionForOutputButtons = () => {
  const { t } = useTranslation();
  const updateOutputFactorSelectButtonsDisabled = outputState(
    (state) => state.updateOutputFactorSelectButtonsDisabled
  );
  const showOutputFactorSelection = outputState((state) => state.showOutputFactorSelection);
  const areDisabled = outputState((state) => state.outputFactorSelectButtonsDisabled);
  const btnId = outputState((state) => state.outputButtonsArray);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const updateDisplayOutputTabContent = outputState((state) => state.updateDisplayOutputTabContent);
  const buttonFactorLabels = outputState((state) => state.buttonFactorLabels) || [];
  const highlightedFactors = outputState((state) => state.highlightedFactors);
  const updateIsCalculateResultsButtonDisabled = outputState(
    (state) => state.updateIsCalculateResultsButtonDisabled
  );

  const toggleUserSelectedFactor = outputState((state) => state.toggleUserSelectedFactor);
  const selectAllFactors = outputState((state) => state.selectAllFactors);
  const clearAllFactors = outputState((state) => state.clearAllFactors);
  const updateIsCalculateResultsButtonOrange = outputState(
    (state) => state.updateIsCalculateResultsButtonOrange
  );
  const updateIsCalculateResultsButtonGreen = outputState(
    (state) => state.updateIsCalculateResultsButtonGreen
  );
  const updateNotifyOutputCalculationSuccess = outputState(
    (state) => state.updateNotifyOutputCalculationSuccess
  );

  const newButtonFactorLabels = buttonFactorLabels.map((item, index) => ({
    ...item,
    show: index < btnId.length,
  }));

  const handleOnclick = (event) => {
    const factor = event.target.id;

    if (factor === 'selectAllFacs') {
      selectAllFactors(btnId);
      updateIsCalculateResultsButtonOrange(true);
    } else if (factor === 'clearAllFacs') {
      clearAllFactors();
      updateOutputFactorSelectButtonsDisabled(false);
      resetSection6('output');
      updateOutputForDataViz2([]);
      updateDisplayOutputTabContent(false);
      updateIsCalculateResultsButtonOrange(false);
      updateIsCalculateResultsButtonGreen(false);
      updateIsCalculateResultsButtonDisabled(false);
      toast.dismiss();
    } else {
      toggleUserSelectedFactor(factor);
      updateIsCalculateResultsButtonOrange(true);
    }
  };

  const numButtonClass = (isActive) =>
    [
      'grid items-center justify-items-center min-h-[28px] w-[50px]',
      'text-center text-[18px] font-semibold font-["Helvetica",sans-serif]',
      'border-none rounded-[4px] mr-[3px]  px-[10px] py-[0px]',
      'cursor-pointer text-black no-underline select-none',
      'transition-shadow duration-300',
      'focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-70',
      'hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]',
      'h-[28px] w-[40px] text-center items-center justify-center',
      isActive
        ? 'bg-[var(--main-theme-color)] shadow-[inset_0_0_0_2px_#666,_0_0_1px_transparent]'
        : 'bg-[#d6dbe0] shadow-[inset_0_0_0_0px_#666,_0_0_0px_transparent]',
    ].join(' ');

  if (showOutputFactorSelection) {
    return (
      <div>
        {/* Container1 */}
        <div className="h-12 w-200  mt-7.5">
          {/* StyledWrapper */}
          <div className="flex flex-row h-10 items-center w-225 gap-x-1.25">
            <span className="text-[24px] mb-0.75 inline-block">2. {t('Select Factors')}</span>
            {newButtonFactorLabels.map(({ show, id, isActive, key, label }) =>
              show ? (
                <div
                  id={id}
                  key={key}
                  onClick={areDisabled ? undefined : handleOnclick}
                  className={numButtonClass(!!highlightedFactors[label])}
                  style={{
                    pointerEvents: areDisabled ? 'none' : 'auto',
                    opacity: areDisabled ? 0.7 : 1,
                  }}
                >
                  {label}
                </div>
              ) : null
            )}

            <GeneralButton
              id="selectAllFacs"
              disabled={areDisabled}
              onClick={handleOnclick}
              className="min-w-35 text-[20px] bg-grey-button h-7.5 p-0!  items-center justify-center"
            >
              {t('All')}
            </GeneralButton>

            <GeneralButton
              id="clearAllFacs"
              onClick={handleOnclick}
              className="min-w-35 text-[20px] bg-grey-button h-7.5 p-0! items-center justify-center"
            >
              {t('Reset')}
            </GeneralButton>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FactorSelectionForOutputButtons;
