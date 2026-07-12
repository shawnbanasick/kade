import includes from 'lodash/includes';
import outputDispatch from '../calcualteOutputLogic/1_outputDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import appState from '../../GlobalState/appState';
import calcState from '../../GlobalState/calcState';
import resetSection6 from '../../../Utils/resetSection6';
import filter from 'lodash/filter';

const FactorSelectionForOutputButtons = () => {
  const { t } = useTranslation();
  const updateOutputFactorSelectButtonsDisabled = outputState(
    (state) => state.updateOutputFactorSelectButtonsDisabled
  );
  let userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const showOutputFactorSelection = outputState((state) => state.showOutputFactorSelection);
  const areDisabled = outputState((state) => state.outputFactorSelectButtonsDisabled);
  const btnId = outputState((state) => state.outputButtonsArray);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);
  const updateSelectAllClicked = outputState((state) => state.updateSelectAllClicked);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const selectAllClicked = outputState((state) => state.selectAllClicked);
  const highlightFactor1 = outputState((state) => state.highlightFactor1);
  const highlightFactor2 = outputState((state) => state.highlightFactor2);
  const highlightFactor3 = outputState((state) => state.highlightFactor3);
  const highlightFactor4 = outputState((state) => state.highlightFactor4);
  const highlightFactor5 = outputState((state) => state.highlightFactor5);
  const highlightFactor6 = outputState((state) => state.highlightFactor6);
  const highlightFactor7 = outputState((state) => state.highlightFactor7);
  const highlightFactor8 = outputState((state) => state.highlightFactor8);
  const updateHighlightFactor1 = outputState((state) => state.updateHighlightFactor1);
  const updateHighlightFactor2 = outputState((state) => state.updateHighlightFactor2);
  const updateHighlightFactor3 = outputState((state) => state.updateHighlightFactor3);
  const updateHighlightFactor4 = outputState((state) => state.updateHighlightFactor4);
  const updateHighlightFactor5 = outputState((state) => state.updateHighlightFactor5);
  const updateHighlightFactor6 = outputState((state) => state.updateHighlightFactor6);
  const updateHighlightFactor7 = outputState((state) => state.updateHighlightFactor7);
  const updateHighlightFactor8 = outputState((state) => state.updateHighlightFactor8);
  const sigLevel1 = calcState((state) => state.userSelectedDistStateSigLevel1);
  const sigLevel2 = calcState((state) => state.userSelectedDistStateSigLevel2);
  const updateDisplayOutputTabContent = outputState((state) => state.updateDisplayOutputTabContent);
  const buttonFactorLabels = outputState((state) => state.buttonFactorLabels) || [];
  const updateDynamicState = outputState((state) => state.updateDynamicState);
  const highlightedFactors = outputState((state) => state.highlightedFactors);
  const updateHighlightFactor = outputState((state) => state.updateHighlightFactor);
  const updateHighlightFactors = outputState((state) => state.updateHighlightFactors);

  const toggleUserSelectedFactor = outputState((state) => state.toggleUserSelectedFactor);
  const selectAllFactors = outputState((state) => state.selectAllFactors);
  const clearAllFactors = outputState((state) => state.clearAllFactors);

  const newButtonFactorLabels = buttonFactorLabels.map((item, index) => ({
    ...item,
    show: index < btnId.length,
  }));

  const handleOnclick = (event) => {
    const factor = event.target.id;

    if (factor === 'selectAllFacs') {
      selectAllFactors(btnId);
    } else if (factor === 'clearAllFacs') {
      clearAllFactors();
      updateOutputFactorSelectButtonsDisabled(false);
      resetSection6('output');
      updateOutputForDataViz2([]);
      updateDisplayOutputTabContent(false);
    } else {
      toggleUserSelectedFactor(factor);
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
                  // className={numButtonClass(outputState[`highlightFactor${label}`])}
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
