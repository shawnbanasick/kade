import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';

const RadioExampleRadioGroup = (props) => {
  const { t } = useTranslation();
  const unforcedRadioButtonState = inputState((state) => state.unforcedRadioButtonState);
  const updateShowForcedInput = inputState((state) => state.updateShowForcedInput);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);
  const updateUnforcedRadioButtonState = inputState(
    (state) => state.updateUnforcedRadioButtonState
  );
  const oldQsortPattern = coreState((state) => state.oldQsortPattern);
  const dataOrigin = inputState((state) => state.dataOrigin);
  const updateQsortPattern = coreState((state) => state.updateQSortPattern);

  const [localStore, setLocalStore] = useState({
    value: unforcedRadioButtonState,
  });

  const handleChange = (e) => {
    const valueIn = e.target.value;
    setLocalStore({ value: valueIn });

    // if "UNFORCED" is selected
    if (valueIn === 'unforced') {
      updateShowForcedInput(true);
      updateIsForcedQsortPattern(false);
      updateUnforcedRadioButtonState('unforced');
    } else {
      // getState - if FORCED is selected
      updateShowForcedInput(false);
      updateIsForcedQsortPattern(true);
      updateUnforcedRadioButtonState('forced');
      if (dataOrigin === 'json') {
        updateQsortPattern(oldQsortPattern);
      }
    }
  };

  return (
    <div className="flex items-center h-10 col-span-2 pl-2 font-sans text-xl">
      <div className="pr-3.5 font-bold">4</div>
      <div className="pr-2.5">{t('Q sorts are')}</div>
      <div className="flex items-center gap-2.5">
        <label className="flex items-center gap-0.5 cursor-pointer">
          <input
            type="radio"
            name="radioGroup"
            id="forcedButton"
            value="forced"
            checked={localStore.value === 'forced'}
            onChange={(e) => handleChange(e)}
            className="cursor-pointer"
          />
          <span>{t('Forced')}</span>
        </label>
        <label className="flex items-center gap-0.5 cursor-pointer">
          <input
            type="radio"
            id="unforcedButton"
            name="radioGroup"
            value="unforced"
            checked={localStore.value === 'unforced'}
            onChange={(e) => handleChange(e)}
            className="cursor-pointer"
          />
          <span>{t('Unforced')}</span>
        </label>
      </div>
    </div>
  );
};

export default RadioExampleRadioGroup;
