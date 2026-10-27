import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';

const RadioExampleRadioGroup = ({ numbering }) => {
  const { t } = useTranslation();

  // Unique per component instance
  const uid = useId();
  const groupName = `qsort-type-${uid}`;
  const forcedId = `forced-${uid}`;
  const unforcedId = `unforced-${uid}`;

  const unforcedRadioButtonState = inputState((state) => state.unforcedRadioButtonState);
  const updateShowForcedInput = inputState((state) => state.updateShowForcedInput);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);
  const updateUnforcedRadioButtonState = inputState(
    (state) => state.updateUnforcedRadioButtonState
  );
  const dataOrigin = inputState((state) => state.dataOrigin);
  const oldQsortPattern = coreState((state) => state.oldQsortPattern);
  const updateQsortPattern = coreState((state) => state.updateQSortPattern);

  const handleChange = (e) => {
    const valueIn = e.target.value;

    if (valueIn === 'unforced') {
      updateShowForcedInput(true);
      updateIsForcedQsortPattern(false);
      updateUnforcedRadioButtonState('unforced');
    } else {
      updateShowForcedInput(false);
      updateIsForcedQsortPattern(true);
      updateUnforcedRadioButtonState('forced');
      if (dataOrigin === 'json') {
        updateQsortPattern(oldQsortPattern);
      }
    }
  };

  return (
    <div className="flex items-center h-10 col-span-2 pl-2 text-black font-sans text-xl">
      <span className="pr-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-button text-sm font-bold text-black">
        {numbering}
      </span>
      <div className="pr-2.5 pl-2.5">{t('Q sorts are')}</div>
      <div className="flex items-center pt-1 gap-2.5" role="radiogroup">
        <label htmlFor={forcedId} className="flex items-center gap-0.5 cursor-pointer">
          <input
            type="radio"
            id={forcedId}
            name={groupName}
            value="forced"
            checked={unforcedRadioButtonState === 'forced'}
            onChange={handleChange}
            className="cursor-pointer"
          />
          <span>{t('Forced')}</span>
        </label>
        <label htmlFor={unforcedId} className="flex items-center gap-0.5 cursor-pointer">
          <input
            type="radio"
            id={unforcedId}
            name={groupName}
            value="unforced"
            checked={unforcedRadioButtonState === 'unforced'}
            onChange={handleChange}
            className="cursor-pointer"
          />
          <span>{t('Unforced')}</span>
        </label>
      </div>
    </div>
  );
};

export default RadioExampleRadioGroup;
