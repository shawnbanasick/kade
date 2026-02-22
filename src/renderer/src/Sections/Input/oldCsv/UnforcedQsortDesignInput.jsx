import { view, store } from '@risingstack/react-easy-state';
import React from 'react';
import state from '../../../store';

const localStore = store({ inputValue: '' });

const handleChange = (event) => {
  const array = event.target.value;
  localStore.inputValue = array;
  const qSortPatternArray2 = array.split(',');
  const qSortPatternArray = [];
  for (const num of qSortPatternArray2) {
    const value = parseInt(num, 10);
    if (!isNaN(value)) {
      qSortPatternArray.push(value);
    }
  }
  qSortPatternArray.sort((a, b) => a - b);
  state.setState({
    qSortPattern: qSortPatternArray,
  });
};

const UnforcedQsortDesignInput = () => {
  const showForcedInput = state.getState().showForcedInput;
  if (showForcedInput) {
    return (
      <div>
        <label htmlFor="qSortDesignInput" className="font-sans text-[20px]">
          Input Q-Sort Design:
          <input
            type="text"
            id="qSortDesignInput"
            onChange={(e) => handleChange(e)}
            placeholder="sort values separated by commas"
            value={localStore.inputValue}
            className="font-sans text-[20px] w-full"
          />
        </label>
      </div>
    );
  }
  return null;
};

export default UnforcedQsortDesignInput;
