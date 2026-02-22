import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();
  const splitFactorsArray = loadingState((state) => state.splitFactorsArray);
  const bipolarFactorsArray = loadingState((state) => state.bipolarFactorsArray);
  const updateFactorToSplit = loadingState((state) => state.updateFactorToSplit);

  const [activeValue, setActiveValue] = useState('');

  const saveDropdownValueToState = (e) => {
    const factorToSplit = e.target.value;
    setActiveValue(factorToSplit);
    updateFactorToSplit(factorToSplit);
  };

  const getOptions = () => {
    if (bipolarFactorsArray.length > 0) {
      return splitFactorsArray.filter((object) => !bipolarFactorsArray.includes(object.value));
    }
    return splitFactorsArray;
  };

  const options = getOptions();

  return (
    <div className="flex items-center">
      <span className="mr-5 text-[30px]">{`${t('Select the factor to split')}: `}</span>
      <select
        value={activeValue}
        onChange={saveDropdownValueToState}
        className="select select-bordered bg-white text-[14px] w-full max-w-xs"
      >
        <option value="" disabled>
          ?
        </option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InvertFactorDropdownSelect;
