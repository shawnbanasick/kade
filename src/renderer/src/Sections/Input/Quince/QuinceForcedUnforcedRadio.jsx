import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const QuinceForcedUnforcedRadio = () => {
  const { t } = useTranslation();

  const quinceForcedUnforcedState = inputState((state) => state.quinceForcedUnforcedState);
  const updateQuinceForcedUnforcedState = inputState((state) => ({
    updateQuinceForcedUnforcedState: state.updateQuinceForcedUnforcedState,
  }));
  const [selected, setSelected] = useState('forced');

  const handleChange = (event) => {
    console.log('Selected value:', event.target.value);
    const selectedValue = event.target.value;

    setSelected(selectedValue);
  };

  const options = [
    {
      id: 'forced',
      title: 'Forced',
      description: 'The number of statements in each column was limited.',
    },
    {
      id: 'unforced',
      title: 'Free Placement',
      description: 'No limit on the number of statements per column.',
    },
  ];

  return (
    <div className="max-w-md mx-auto  p-4 bg-white rounded-xl shadow-sm border border-gray-100 space-y-3">
      <div className="space-y-7">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={!option.disabled ? option.id : undefined}
            className={`flex items-start p-2.5 rounded-lg border transition-colors ${
              option.disabled
                ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                : selected === option.id
                  ? 'border-blue-400 bg-blue-50/50 cursor-pointer'
                  : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <input
              type="radio"
              id={option.id}
              name="forced-unforced-options-labels"
              value={option.id}
              checked={selected === option.id}
              disabled={option.disabled}
              onChange={(e) => handleChange(e)}
              className="mt-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-blue-400 accent-blue-500 disabled:cursor-not-allowed"
            />
            <div className="ml-3 w-40">
              <span
                className={`block text-xs font-medium ${option.disabled ? 'text-gray-400' : 'text-gray-900'}`}
              >
                {option.title}
              </span>
              <span
                className={`block text-xs ${option.disabled ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {option.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuinceForcedUnforcedRadio;
