import includes from 'lodash/includes';
import { Transition } from 'semantic-ui-react';
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
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );
  const updateIsOutputButtonGreen = appState((state) => state.updateIsOutputButtonGreen);
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

  const buttonsToRenderArray = [];
  for (let i = 0; i < 8; i++) {
    buttonsToRenderArray.push(i < btnId.length);
  }
  const [show1, show2, show3, show4, show5, show6, show7, show8] = buttonsToRenderArray;

  const handleSubmit = () => {
    if (sigLevel1 <= sigLevel2) {
      outputState.notifyOutputDistStateError = true;
      return;
    }
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      updateShowDownloadOutputButtons(true);
      updateIsOutputButtonGreen(true);
      updateOutputFactorSelectButtonsDisabled(true);
    }
  };

  const handleOnclick = (event) => {
    const factor = event.target.id;

    if (factor === 'selectAllFacs') {
      userSelectedFactors = [];
      for (let i = 0; i < btnId.length; i += 1) {
        userSelectedFactors.push(`factor ${btnId[i]}`);
      }
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => eval(`updateHighlightFactor${n}(true)`));
      resetSection6('output');
      updateUserSelectedFactors(userSelectedFactors);
    } else if (factor === 'clearAllFacs') {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => eval(`updateHighlightFactor${n}(false)`));
      updateOutputFactorSelectButtonsDisabled(false);
      resetSection6('output');
      updateUserSelectedFactors([]);
      updateOutputForDataViz2([]);
    } else {
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        userSelectedFactors.sort();
        if (factor === 'factor 1') updateHighlightFactor1(true);
        if (factor === 'factor 2') updateHighlightFactor2(true);
        if (factor === 'factor 3') updateHighlightFactor3(true);
        if (factor === 'factor 4') updateHighlightFactor4(true);
        if (factor === 'factor 5') updateHighlightFactor5(true);
        if (factor === 'factor 6') updateHighlightFactor6(true);
        if (factor === 'factor 7') updateHighlightFactor7(true);
        if (factor === 'factor 8') updateHighlightFactor8(true);
        resetSection6('output');
        updateUserSelectedFactors(userSelectedFactors);
      } else {
        const filteredArray = filter(userSelectedFactors, (item) => item !== factor);
        if (factor === 'factor 1') updateHighlightFactor1(false);
        if (factor === 'factor 2') updateHighlightFactor2(false);
        if (factor === 'factor 3') updateHighlightFactor3(false);
        if (factor === 'factor 4') updateHighlightFactor4(false);
        if (factor === 'factor 5') updateHighlightFactor5(false);
        if (factor === 'factor 6') updateHighlightFactor6(false);
        if (factor === 'factor 7') updateHighlightFactor7(false);
        if (factor === 'factor 8') updateHighlightFactor8(false);
        updateUserSelectedFactors(filteredArray);
      }
    }
  };

  // Reusable class builders
  const numButtonClass = (isActive) =>
    [
      'grid items-center justify-items-center min-h-[40px] w-[50px]',
      'text-center text-[18px] font-semibold font-["Helvetica",sans-serif]',
      'border-none rounded-[4px] mr-[3px] mb-[3px] px-[10px] py-[5px]',
      'cursor-pointer text-black no-underline select-none',
      'transition-shadow duration-300',
      'focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-70',
      'hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]',
      isActive
        ? 'bg-[var(--main-theme-color)] shadow-[inset_0_0_0_2px_#666,_0_0_1px_transparent]'
        : 'bg-[#d6dbe0] shadow-[inset_0_0_0_0px_#666,_0_0_0px_transparent]',
    ].join(' ');

  const factors = [
    { show: show1, id: 'factor 1', isActive: highlightFactor1, key: 'factor1', label: '1' },
    { show: show2, id: 'factor 2', isActive: highlightFactor2, key: 'factor2', label: '2' },
    { show: show3, id: 'factor 3', isActive: highlightFactor3, key: 'factor3', label: '3' },
    { show: show4, id: 'factor 4', isActive: highlightFactor4, key: 'factor4', label: '4' },
    { show: show5, id: 'factor 5', isActive: highlightFactor5, key: 'factor5', label: '5' },
    { show: show6, id: 'factor 6', isActive: highlightFactor6, key: 'factor6', label: '6' },
    { show: show7, id: 'factor 7', isActive: highlightFactor7, key: 'factor7', label: '7' },
    { show: show8, id: 'factor 8', isActive: highlightFactor8, key: 'factor8', label: '8' },
  ];

  if (showOutputFactorSelection) {
    return (
      <Transition visible={showOutputFactorSelection} animation="fade" duration={1000}>
        {/* Container1 */}
        <div className="mt-[3px] h-[100px] w-[800px]">
          {/* StyledWrapper */}
          <div className="flex flex-row h-[50px] w-[900px] items-baseline">
            <span className="mr-[5px] text-[25px] inline-block">{t('Select Factors')}</span>

            {factors.map(({ show, id, isActive, key, label }) =>
              show ? (
                <div
                  id={id}
                  key={key}
                  onClick={areDisabled ? undefined : handleOnclick}
                  className={numButtonClass(isActive)}
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
              className="min-w-[75px] bg-grey-button"
            >
              {t('All')}
            </GeneralButton>

            <GeneralButton id="clearAllFacs" onClick={handleOnclick} className="min-w-[75px]">
              {t('Clear')}
            </GeneralButton>

            <GeneralButton id="startOutput" onClick={handleSubmit} className="min-w-[75px]">
              {t('Submit')}
            </GeneralButton>
          </div>
        </div>
      </Transition>
    );
  }

  return null;
};

export default FactorSelectionForOutputButtons;
