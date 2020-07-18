import styled from "styled-components";
import React from "react";
import { view, store } from "react-easy-state";
import throwDataAlreadyLoadedInputErrorModal from "../throwDataAlreadyLoadedInputErrorModal";
import inputState from "../../GlobalState/inputState";
import coreState from "../../GlobalState/coreState";
import { useTranslation } from "react-i18next";
const clone = require("rfdc")();

const localStore = store({
  value: "forced"
});

const handleChange = e => {
  const value = e.target.value;

  localStore.value = value;
  // getState
  const isDataAlreadyLoaded = inputState.isDataAlreadyLoaded;

  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
    // if "UNFORCED" is selected
    // getState
    const hasQsortPattern = clone(coreState.qSortPattern);
    const dataOrigin = inputState.dataOrigin;
    if (value === "unforced") {
      inputState.showForcedInput = true;
      inputState.isForcedQsortPattern = false;
      inputState.requireQsortPatternInput = true;
      inputState.unforcedRadioButtonState = "unforced";

      if (dataOrigin === "csv" || dataOrigin === "json") {
        coreState.oldQsortPattern = hasQsortPattern;
        coreState.qSortPattern = [];
      }
    } else {
      // getState - if FORCED is selected
      const oldQsortPattern = clone(coreState.oldQsortPattern);
      inputState.showForcedInput = false;
      inputState.isForcedQsortPattern = true;
      inputState.requireQsortPatternInput = false;
      inputState.unforcedRadioButtonState = "forced";

      if (dataOrigin === "csv" || dataOrigin === "json") {
        coreState.qSortPattern = oldQsortPattern;
      }
    }
  }
};

const RadioExampleRadioGroup = () => {
  const { t } = useTranslation();

  // getState
  const unforcedRadioButtonState = inputState.unforcedRadioButtonState;
  localStore.value = unforcedRadioButtonState;

  return (
    <RadioDiv>
      <LabelDiv>{t("Q-Sorts are")}</LabelDiv>
      <StyledInput
        type="radio"
        name="radioGroup"
        id="forcedButton"
        value="forced"
        checked={localStore.value === "forced"}
        onChange={e => handleChange(e)}
      />
      <Label htmlFor="forcedButton">{t("Forced")}</Label>
      <StyledInput
        type="radio"
        id="unforcedButton"
        name="radioGroup"
        value="unforced"
        checked={localStore.value === "unforced"}
        onChange={e => handleChange(e)}
      />
      <Label htmlFor="unforcedButton">{t("Unforced")}</Label>
    </RadioDiv>
  );
};

export default view(RadioExampleRadioGroup);

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  height: 30px;
  grid-column-start: 1;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const StyledInput = styled.input`
  padding-left: 10px;
  margin-right: 2px;
`;

const LabelDiv = styled.div`
  text-align: right;
  width: 140px;
  padding-right: 10px;
`;
