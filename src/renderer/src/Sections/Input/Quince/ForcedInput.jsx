import { useState, useEffect, useMemo } from 'react';

import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';

import { renderRectColumnChart } from './rect-column-chart.js';

const values = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const ForcedInput = () => {
  const showForcedInput = true; // Replace with actual state from S1DataSlice

  const [qSortPatternInput, setQSortPatternInput] = useState([]);

  const quinceQsortInputText = inputState((state) => state.quinceQsortInputText);
  const setQuinceQsortInputText = inputState((state) => state.updateQuinceQsortInputText);

  const numStatements = coreState((state) => state.numStatements);
  const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  const isQuinceQsortImportButtonDisabled = inputState(
    (state) => state.isQuinceQsortImportButtonDisabled
  );
  const updateIsQuinceQsortImportButtonDisabled = inputState(
    (state) => state.updateIsQuinceQsortImportButtonDisabled
  );
  const quinceForcedUnforcedState = inputState((state) => state.quinceForcedUnforcedState);

  function repeatByCounts(values, counts) {
    if (!Array.isArray(values) || !Array.isArray(counts)) return [];

    const n = Math.min(values.length, counts.length);
    const result = [];
    for (let i = 0; i < n; i++) {
      const c = Number.isInteger(counts[i]) && counts[i] > 0 ? counts[i] : 0;
      for (let j = 0; j < c; j++) result.push(values[i]);
    }
    return result;
  }

  useEffect(() => {
    if (showForcedInput) {
      renderRectColumnChart('#chart', qSortPatternInput, {
        maxRects: 20,
        colGap: 5,
        cellSize: 12,
      });
    }
  }, [showForcedInput, qSortPatternInput]);

  // Sum of the comma separated numbers entered so far
  const enteredTotal = useMemo(
    () =>
      (Array.isArray(qSortPatternInput) ? qSortPatternInput : []).reduce(
        (sum, n) => sum + (Number.isFinite(n) ? n : 0),
        0
      ),
    [qSortPatternInput]
  );

  const isComplete =
    (quinceQsortInputText?.trim() ?? '') !== '' && enteredTotal === Number(numStatements);

  useEffect(() => {
    if (quinceForcedUnforcedState === 'forced') {
      updateIsQuinceQsortImportButtonDisabled(false);
    } else if (quinceForcedUnforcedState === 'unforced') {
      updateIsQuinceQsortImportButtonDisabled(!isComplete);
    }
  }, [quinceForcedUnforcedState, isComplete, updateIsQuinceQsortImportButtonDisabled]);

  const handleChange = (e) => {
    const text = e.target.value;
    setQuinceQsortInputText(text);

    const counts = text.split(',').map((s) => Number(s.trim()));
    setQSortPatternInput(counts);
    updateQSortPattern(repeatByCounts(values, counts));
  };

  if (showForcedInput) {
    return (
      <div className="flex flex-col text-left justify-center items-center ">
        <label className="label ">
          <div className="flex flex-col justify-center items-center text-xs mb-2">
            <div className="pl-4 text-balance text-left font-semibold w-70">
              {`Input the number of statements in each column separated by commas,
              starting with the -6 column. Example: 0,0,2,3,4,5,5,5,4,3,2`}
            </div>
          </div>
        </label>
        <input
          type="text"
          onChange={handleChange}
          className={`input input-bordered rounded-md w-[280px] p-2 text-sm! outline-2 outline-offset-0 focus:outline-2 ${
            isComplete
              ? 'border-[#a5d6a7] outline-[#a5d6a7] focus:outline-[#a5d6a7]'
              : 'border-[#ffa500] outline-[#ffa500] focus:outline-[#ffa500]'
          }`}
          placeholder=""
          value={quinceQsortInputText ?? ''}
        />
        <div id="chart" className=" min-h-[105px] mt-1 rounded-xl"></div>
      </div>
    );
  } else {
    return <div style={{ height: 38 }} />;
  }
};

export default ForcedInput;
