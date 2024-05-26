import styled from 'styled-components';
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';

import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import getCoreState from '../../GlobalState/getCoreState';

const localStore = store({
  value: 'forced',
});

const handleChange = (e) => {
  const value = e.target.value;

  localStore.value = value;

  // if "UNFORCED" is selected
  // const hasQsortPattern = getCoreState("qSortPattern");
  const dataOrigin = getInputState('dataOrigin');
  if (value === 'unforced') {
    inputState.showForcedInput = true;
    inputState.isForcedQsortPattern = false;
    inputState.requireQsortPatternInput = true;
    inputState.unforcedRadioButtonState = 'unforced';
  } else {
    // getState - if FORCED is selected
    const oldQsortPattern = getCoreState('oldQsortPattern');
    inputState.showForcedInput = false;
    inputState.isForcedQsortPattern = true;
    inputState.requireQsortPatternInput = false;
    inputState.unforcedRadioButtonState = 'forced';

    if (dataOrigin === 'json') {
      coreState.qSortPattern = oldQsortPattern;
    }
  }
};

const RadioExampleRadioGroup = (props) => {
  const { t } = useTranslation();
  const unforcedRadioButtonState = getInputState('unforcedRadioButtonState');
  localStore.value = unforcedRadioButtonState;

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
