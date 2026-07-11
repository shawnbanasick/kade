import { useState } from 'react';
import rotationState from '../../GlobalState/rotationState';
import loadingState from '../../GlobalState/loadingState';
import { useTranslation } from 'react-i18next';

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();
  const updateFactorToInvert = loadingState((state) => state.updateFactorToInvert);
  const numFactorsKeptForRot = rotationState((state) => state.numFactorsKeptForRot);

  const [activeValue, setActiveValue] = useState('');

  const saveDropdownValueToState = (e) => {
    const factorToInvert = Number(e.target.value);
    setActiveValue(factorToInvert);
    updateFactorToInvert(factorToInvert);
  };

  const getOptions = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8];
    return options.slice(0, +numFactorsKeptForRot);
  };

  const options = getOptions();

  return (
    <div className="flex items-center">
      <span className="mr-5 text-[20px]">{`${t('Select the factor to invert')}: `}</span>
      <select
        value={activeValue}
        onChange={saveDropdownValueToState}
        style={{ color: 'black' }}
        className="select select-bordered bg-white text-[14px] text-black! w-full max-w-xs"
      >
        <option value="" disabled>
          ?
        </option>
        {options.map((num) => (
          <option key={`factor${num}`} value={num} className="text-black!">
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InvertFactorDropdownSelect;
