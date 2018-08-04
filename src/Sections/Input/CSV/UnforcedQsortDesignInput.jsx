import { view } from "react-easy-state";
import React from "react";
import store from "../../../store";
import styled from "styled-components";

class ForcedInput extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const array = event.target.value;
    const qSortPatternArray2 = array.split(",");
    const qSortPatternArray = [];
    for (const num of qSortPatternArray2) {
      const value = parseInt(num, 10);
      if (!isNaN(value)) {
        qSortPatternArray.push(value);
      }
    }
    qSortPatternArray.sort((a, b) => a - b);
    store.setState({
      qSortPattern: qSortPatternArray
    });
  }

  render() {
    const showForcedInput = store.getState("showForcedInput");
    if (showForcedInput) {
      return (
        <div>
          <Label htmlFor="qSortDesignInput">
            Input Q-Sort Design:
            <Input
              type="text"
              id="qSortDesignInput"
              onChange={this.handleChange}
              placeholder="sort values separated by commas"
            />
          </Label>
        </div>
      );
    }
    return null;
  }
}

export default view(ForcedInput);

const Label = styled.label`
  font-family: Helvetica, sans-serif;
  font-size: 20px;
`;

const Input = styled.input`
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  width: 100%;
`;
