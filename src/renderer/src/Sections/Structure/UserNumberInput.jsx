import { useState, useEffect, useRef } from 'react';

const UserNumberInput = ({
  value,
  label = 'label',
  placeholder = 'val',
  min,
  max,
  step = 1,
  debounceMs = 500,
  className = '',
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const isMounted = useRef(false);

  // Sync local value if the external `value` prop changes (e.g. Zustand state
  // updated from another part of the app)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce: call onChange with the latest localValue, but skip the
  // first render to avoid a spurious update on mount
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const handler = setTimeout(() => {
      onChange(localValue); // ← pass the value to the Zustand updater
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localValue, debounceMs]); // intentionally omitting `onChange` — see note below

  const handleChange = (e) => {
    const val = e.target.value;
    const newValue = val === '' ? 0 : Number(val);
    setLocalValue(newValue);
  };

  return (
    <div className={`form-control flex flex-col p-0 pt-0 mr-2 ${className}`}>
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
        className="input input-bordered h-[42px] ml-4"
      />
    </div>
  );
};

export default UserNumberInput;
