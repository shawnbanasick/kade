import { useState } from 'react';

import factorState from '../../GlobalState/factorState';

const CentroidSelectDropdown = () => {
  const isDisabled = factorState((state) => state.disabledCentroidFactorButton);
  const numCentroidFactors = factorState((state) => state.numCentroidFactors);
  const updateNumCentroidFactors = factorState((state) => state.updateNumCentroidFactors);

  const [localStore, setLocalStore] = useState({
    value: numCentroidFactors ?? 7,
  });

  useEffect(() => {
    setLocalStore({ value: numCentroidFactors });
  }, [numCentroidFactors]);

  const saveDropdownValueToState = (e) => {
    const val = Number(e.target.value);
    updateNumCentroidFactors(val);
    setLocalStore({ value: val });
  };

  const options = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[22px] text-center mt-1">Extract</span>
      <select
        id="centroidSelectDropdown"
        value={localStore.value}
        onChange={saveDropdownValueToState}
        disabled={isDisabled}
        className="select select-bordered select-sm border-black text-sm h-9 min-h-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((num) => (
          <option key={`factor${num}`} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CentroidSelectDropdown;
