import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({ value: "forced" });

const handleChange = e => {
  const value = e.target.value;

  localStore.value = value;

  // if "UNFORCED" is selected
  const hasQsortPattern = state.getState("qSortPattern");
  const dataOrigin = state.getState("dataOrigin");
  if (value === "unforced") {
    state.setState({
      showForcedInput: true,
      isForcedQsortPattern: false,
      requireQsortPatternInput: true
    });
    if (dataOrigin === "csv" || dataOrigin === "json") {
      state.setState({
        oldQsortPattern: hasQsortPattern,
        qSortPattern: []
      });
    }
  } else {
    // if FORCED is selected
    const oldQsortPattern = state.getState("oldQsortPattern");
    state.setState({
      showForcedInput: false,
      isForcedQsortPattern: true,
      requireQsortPatternInput: false
    });
    if (dataOrigin === "csv" || dataOrigin === "json") {
      state.setState({
        qSortPattern: oldQsortPattern
      });
    }
  }
};

class RadioExampleRadioGroup extends Component {
  render() {
    return (
      <RadioDiv>
        <div>
          Q-Sorts are: <b>{localStore.value}</b>
        </div>
        <Label htmlFor="forcedButton">
          <input
            type="radio"
            name="radioGroup"
            id="forcedButton"
            value="forced"
            checked={localStore.value === "forced"}
            onChange={e => handleChange(e)}
          />
          Forced
        </Label>
        <Label htmlFor="unforcedButton">
          <input
            type="radio"
            id="unforcedButton"
            name="radioGroup"
            value="unforced"
            checked={localStore.value === "unforced"}
            onChange={e => handleChange(e)}
          />
          Unforced
        </Label>
      </RadioDiv>
    );
  }
}

export default view(RadioExampleRadioGroup);

const RadioDiv = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 30px 30px 30px;
  align-items: center;
  font-family: Helvetica, sans-serif;
  margin-top: 0px;
  margin-bottom: 15px;
  font-size: 20px;
  margin-bottom: 0px;
  margin-left: 20px;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 25px 1fr;
  margin-top: 0px;
  margin-left: 10px;
  align-items: center;
`;
