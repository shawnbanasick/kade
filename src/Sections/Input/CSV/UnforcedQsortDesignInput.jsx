import { view, store } from "react-easy-state";
import styled from "styled-components";
import React from "react";
import state from "../../../store";

const localStore = store({ inputValue: "" });

const handleChange = event => {
  const array = event.target.value;
  localStore.inputValue = array;
  const qSortPatternArray2 = array.split(",");
  const qSortPatternArray = [];
  for (const num of qSortPatternArray2) {
    const value = parseInt(num, 10);
    if (!isNaN(value)) {
      qSortPatternArray.push(value);
    }
  }
  qSortPatternArray.sort((a, b) => a - b);
  state.setState({
    qSortPattern: qSortPatternArray
  });
};

class ForcedInput extends React.Component {
  render() {
    const showForcedInput = state.getState("showForcedInput");
    if (showForcedInput) {
      return (
        <div>
          <Label htmlFor="qSortDesignInput">
            Input Q-Sort Design:
            <Input
              type="text"
              id="qSortDesignInput"
              onChange={e => handleChange(e)}
              placeholder="sort values separated by commas"
              value={localStore.inputValue}
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
