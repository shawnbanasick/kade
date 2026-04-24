import { useState, useEffect } from 'react';
import correlationState from '../../GlobalState/correlationState';
import structureState from '../../GlobalState/structureState';

const DebouncedNumberInput = ({
  value,
  label,
  placeholder = 'val',
  min,
  max,
  step = 1,
  debounceMs = 500,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const updateCorrelationThreshold = correlationState((state) => state.updateCorrelationThreshold);
  const updateShowAutoFlags = structureState((state) => state.updateShowAutoFlags);
  const updateSelectedPcaScenario = structureState((state) => state.updateSelectedPcaScenario);

  useEffect(() => {
    // Update debounced value after a specified delay
    const handler = setTimeout(() => {
      updateCorrelationThreshold(localValue);
    }, debounceMs);

    // Cleanup function to cancel the timer if value changes again
    return () => {
      clearTimeout(handler);
    };
  }, [localValue, debounceMs]); // Only re-run the effect if value or delay change

  const handleChange = (e) => {
    const val = e.target.value;
    const newValue = val === '' ? '' : Number(val);
    setLocalValue(newValue);
    updateShowAutoFlags(false); // Reset auto-flags when changing correlation threshold
    updateSelectedPcaScenario('one'); // Reset PCA scenario to 'one' when changing correlation threshold
  };

  return (
    <div className={`form-control flex flex-col w-15 max-w-xs p-0 pt-0 mr-2 mb-1 ${className}`}>
      {label && (
        <label className="label mt-2">
          <span className="label-text font-medium mb-1">{label}:</span>
        </label>
      )}
      <input
        type="number"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`input input-bordered w-14 h-[38px]`}
      />
    </div>
  );
};

export default DebouncedNumberInput;
