import React, { useState } from 'react';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';

const PcaScenarios = () => {
  const updateLinkFilter = correlationState((state) => state.updateLinkFilter);
  const [selected, setSelected] = useState('all');
  const { t } = useTranslation();

  const handleSelection = (value, index) => {
    console.log(value, index);
    setSelected(value);
    updateLinkFilter(value);
  };

  const options = [
    { id: 'one', label: t('1'), value: 0 },
    { id: 'two', label: t('2'), value: 1 },
    { id: 'three', label: t('3'), value: 2 },
    { id: 'four', label: t('4'), value: 3 },
    { id: 'five', label: t('5'), value: 4 },
    { id: 'six', label: t('6'), value: 5 },
    { id: 'seven', label: t('7'), value: 6 },
    { id: 'eight', label: t('8'), value: 7 },
    { id: 'none', label: t('Clear'), value: null },
  ];

  const colorArray = [
    'bg-gray-300', // Gray
    'bg-sky-300', // Blue
    'bg-orange-300', // Orange
    'bg-green-300', // Green
    'bg-red-300', // Red
    'bg-cyan-300', // Cyan
    'bg-pink-300', // Magenta
    'bg-purple-300', // Purple
  ];

  // Find the selected option to get its value
  const selectedOption = options.find((opt) => opt.id === selected);
  const selectedValue = selectedOption?.value;

  return (
    <div className="flex flex-col rounded-lg bg-white p-1 ml-8">
      <label className="label mb-0.5">
        <span className="label-text font-medium">{t('PCA Scenarios')}: </span>
      </label>
      <div className="inline-flex flex-wrap gap-4 h-[25px]">
        <button
          className={`
            relative px-0 py-1.5 bg-white rounded-md text-sm font-medium bg-grey-button
          `}
        >
          {t('Principal Components')}:
        </button>
        {options.map((option, index) => {
          // Determine if this button should be scaled
          const shouldScale =
            option.id === selected ||
            (selectedValue !== null && option.value !== null && option.value <= selectedValue);

          return (
            <button
              key={option.id}
              onClick={() => handleSelection(option.id, option.value)}
              className={`
                relative ${colorArray[index]} px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${shouldScale ? 'scale-135 shadow-md opacity-100' : 'text-gray-700 hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] opacity-50'}
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PcaScenarios;
