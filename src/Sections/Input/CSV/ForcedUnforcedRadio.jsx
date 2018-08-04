import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import store from "../../../store";

class RadioExampleRadioGroup extends Component {
  constructor() {
    super();

    this.state = {
      value: "forced"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;

    this.setState({
      value
    });

    // if "UNFORCED" is selected
    const hasQsortPattern = store.getState("qSortPattern");
    const dataOrigin = store.getState("dataOrigin");
    if (value === "unforced") {
      store.setState({
        showForcedInput: true,
        isForcedQsortPattern: false,
        requireQsortPatternInput: true
      });
      if (dataOrigin === "csv" || dataOrigin === "json") {
        store.setState({
          oldQsortPattern: hasQsortPattern,
          qSortPattern: []
        });
      }
    } else {
      // if FORCED is selected
      const oldQsortPattern = store.getState("oldQsortPattern");
      store.setState({
        showForcedInput: false,
        isForcedQsortPattern: true,
        requireQsortPatternInput: false
      });
      if (dataOrigin === "csv" || dataOrigin === "json") {
        store.setState({
          qSortPattern: oldQsortPattern
        });
      }
    }
  }

  render() {
    return (
      <RadioDiv>
        <div>
          Q-Sorts are: <b>{this.state.value}</b>
        </div>
        <Label htmlFor="forcedButton">
          <input
            type="radio"
            name="radioGroup"
            id="forcedButton"
            value="forced"
            checked={this.state.value === "forced"}
            onChange={this.handleChange}
          />
          Forced
        </Label>
        <Label htmlFor="unforcedButton">
          <input
            type="radio"
            id="unforcedButton"
            name="radioGroup"
            value="unforced"
            checked={this.state.value === "unforced"}
            onChange={this.handleChange}
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
  justify-items: left;
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
  margin-top: 3px;
  margin-left: 5px;
  align-items: center;
  justify-items: left;
`;
