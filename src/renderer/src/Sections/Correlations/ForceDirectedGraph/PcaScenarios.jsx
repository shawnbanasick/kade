import React, { useState } from 'react';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';
import structureState from '../../GlobalState/structureState';

const PcaScenarios = (props) => {
  const updatePcaFilter = correlationState((state) => state.updatePcaFilter);
  const [selected, setSelected] = useState('one');
  const [resetSelection, setResetSelection] = useState(false);
  const { t } = useTranslation();
  const updateShowAutoFlags = structureState((state) => state.updateShowAutoFlags);
  const updateSelectedPcaScenario = structureState((state) => state.updateSelectedPcaScenario);
  const selectedPcaScenario = structureState((state) => state.selectedPcaScenario);

  const handleSelection = (id, value) => {
    props.onSelectionChange(id, value);
    updateSelectedPcaScenario(id);
    updateShowAutoFlags(false);
  };

  if (props.isGrayscale !== resetSelection) {
    updateSelectedPcaScenario('one');
    setResetSelection(props.isGrayscale);
  }

  const options = [
    { id: 'one', label: '1', value: 0 },
    { id: 'two', label: '2', value: 1 },
    { id: 'three', label: '3', value: 2 },
    { id: 'four', label: '4', value: 3 },
    { id: 'five', label: '5', value: 4 },
    { id: 'six', label: '6', value: 5 },
    { id: 'seven', label: '7', value: 6 },
    { id: 'eight', label: '8', value: 7 },
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
    'bg-gray-300', // Gray
  ];

  const colorArrayBW = [
    'bg-gray-300', // Gray
    'bg-gray-300', // Blue
    'bg-gray-300', // Orange
    'bg-gray-300', // Green
    'bg-gray-300', // Red
    'bg-gray-300', // Cyan
    'bg-gray-300', // Magenta
    'bg-gray-300', // Purple
    'bg-gray-300', // Gray
  ];

  // Find the selected option to get its value
  const selectedOption = options.find((opt) => opt.id === selectedPcaScenario);
  const selectedValue = selectedOption?.value;

  return (
    <div className="flex flex-col  rounded-lg bg-white ">
      <label className="label mb-2">
        <span className="label-text font-medium">
          {t('PCA Scenarios - Select Number of Factors')}:{' '}
        </span>
      </label>
      <div className="inline-flex flex-wrap gap-3">
        {options.map((option, index) => {
          // Determine if this button should be scaled
          const shouldScale =
            option.id === selectedPcaScenario ||
            (selectedValue !== null && option.value !== null && option.value <= selectedValue);

          return (
            <button
              key={option.id}
              onClick={() => handleSelection(option.id, option.value)}
              className={`
                relative ${props.isGrayscale ? colorArrayBW[index] : colorArray[index]} px-3 rounded-md text-sm font-medium transition-all duration-200
                ${shouldScale ? 'scale-125  opacity-100 hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]' : 'text-gray-700 hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] opacity-50'}
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
