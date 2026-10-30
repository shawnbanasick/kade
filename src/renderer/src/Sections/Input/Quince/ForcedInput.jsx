import { useState, useEffect, useMemo } from 'react';
import coreState from '../../GlobalState/coreState';

import { renderRectColumnChart } from './rect-column-chart.js';

const ForcedInput = () => {
  const showForcedInput = true; // Replace with actual state from S1DataSlice

  const [qSortPatternInput, setQSortPatternInput] = useState([]);
  const [qSortInputText, setQSortInputText] = useState('');

  const numStatements = coreState((state) => state.numStatements);

  function repeatByCounts(values, counts) {
    if (!Array.isArray(values) || !Array.isArray(counts)) {
      return [];
    }

    const n = Math.min(values.length, counts.length);
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += counts[i];
    }
    const result = new Array(total);
    let k = 0;
    for (let i = 0; i < n; i++) {
      const v = values[i];
      for (let j = 0; j < counts[i]; j++) {
        result[k++] = v;
      }
    }
    return result;
  }

  const values = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
    () => qSortPatternInput.reduce((sum, n) => sum + (Number.isFinite(n) ? n : 0), 0),
    [qSortPatternInput]
  );

  const isComplete = qSortInputText.trim() !== '' && enteredTotal === Number(numStatements);

  const handleChange = (e) => {
    const array = e.target.value;
    setQSortInputText(array);
    setQSortPatternInput(array.split(',').map(Number));
    const qSortPatternArray2 = array.split(',');
    const qSortPatternArray = repeatByCounts(values, qSortPatternArray2.map(Number));

    // setQSortPattern([...qSortPatternArray]);
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
          value={qSortInputText}
        />
        <div id="chart" className=" min-h-[105px] mt-1 rounded-xl"></div>
      </div>
    );
  } else {
    return <div style={{ height: 38 }} />;
  }
};

export default ForcedInput;
