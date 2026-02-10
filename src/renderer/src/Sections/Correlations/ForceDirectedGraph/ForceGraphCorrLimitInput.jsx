import { useState, useEffect } from 'react';
import correlationState from '../../GlobalState/correlationState';

const DebouncedNumberInput = ({
  value,
  label,
  placeholder = 'Enter a number',
  min,
  max,
  step = 1,
  debounceMs = 500,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const updateCorrelationThreshold = correlationState((state) => state.updateCorrelationThreshold);

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
  };

  return (
    <div className={`form-control w-[150px] max-w-xs ml-3 p-0 pt-0 mr-5${className}`}>
      {label && (
        <label className="label mb-1 mt-1">
          <span className="label-text font-medium">{label}:</span>
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
        className={`input input-bordered w-[135px] h-[22px]`}
      />
    </div>
  );
};

export default DebouncedNumberInput;
