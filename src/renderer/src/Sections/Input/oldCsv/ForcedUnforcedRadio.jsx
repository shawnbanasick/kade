import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';

const RadioExampleRadioGroup = (props) => {
  const { t } = useTranslation();
  const unforcedRadioButtonState = inputState((state) => state.unforcedRadioButtonState);
  const updateShowForcedInput = inputState((state) => state.updateShowForcedInput);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);
  const updateRequireQsortPatternInput = inputState(
    (state) => state.updateRequireQsortPatternInput
  );
  const updateUnforcedRadioButtonState = inputState(
    (state) => state.updateUnforcedRadioButtonState
  );
  const oldQsortPattern = coreState((state) => state.oldQsortPattern);
  const dataOrigin = inputState((state) => state.dataOrigin);
  const updateQsortPattern = coreState((state) => state.updateQSortPattern);

  const [localStore, setLocalStore] = useState({
    value: 'forced',
  });

  setLocalStore({ value: unforcedRadioButtonState });

  const handleChange = (e) => {
    const valueIn = e.target.value;
    setLocalStore({ value: valueIn });

    // if "UNFORCED" is selected
    if (valueIn === 'unforced') {
      updateShowForcedInput(true);
      updateIsForcedQsortPattern(false);
      updateRequireQsortPatternInput(true);
      updateUnforcedRadioButtonState('unforced');
    } else {
      // getState - if FORCED is selected
      updateShowForcedInput(false);
      updateIsForcedQsortPattern(true);
      updateRequireQsortPatternInput(false);
      updateUnforcedRadioButtonState('forced');
      if (dataOrigin === 'json') {
        updateQsortPattern(oldQsortPattern);
      }
    }
  };

  return (
    <RadioDiv>
      <LabelDiv>
        <b>{props.number}</b> {t('Q sorts are')}
      </LabelDiv>
      <StyledInput
        type="radio"
        name="radioGroup"
        id="forcedButton"
        value="forced"
        checked={localStore.value === 'forced'}
        onChange={(e) => handleChange(e)}
      />
      <LabelDiv2 htmlFor="forcedButton">{t('Forced')}</LabelDiv2>
      <StyledInput
        type="radio"
        id="unforcedButton"
        name="radioGroup"
        value="unforced"
        checked={localStore.value === 'unforced'}
        onChange={(e) => handleChange(e)}
      />
      <Label htmlFor="unforcedButton">{t('Unforced')}</Label>
    </RadioDiv>
  );
};

export default RadioExampleRadioGroup;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  height: 40px;
  grid-column-start: 1;
  grid-column-end: 3;
  padding-left: 8px;
  width: 100%;
  grid-row-start: ${(props) => props.startingRow};
`;

const LabelDiv2 = styled.label`
  display: inline-block;
  margin-right: 10px;
  width: fit-content;
`;

const Label = styled.label`
  // min-width: 180px;
  display: inline-block;
  width: fit-content;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  padding-left: 10px;
  margin-right: 2px;
  width: fit-content;
`;

const LabelDiv = styled.div`
  display: inline-block;
  width: fit-content;
  text-align: right;
  display: inline-block;
  padding-right: 10px;
`;
