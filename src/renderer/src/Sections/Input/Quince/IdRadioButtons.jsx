import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IdRadioButtons = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState('option1');

  const options = [
    { id: 'option1', title: 'Random ID', description: 'Default option' },
    {
      id: 'option2',
      title: 'Participant ID',
      description: 'Available',
    },
    {
      id: 'option3',
      title: 'URL Usercode',
      description: 'Available',
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100 space-y-3">
      <div className="space-y-1">
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
              name="compact-options-labels"
              value={option.id}
              checked={selected === option.id}
              disabled={option.disabled}
              onChange={(e) => setSelected(e.target.value)}
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

export default IdRadioButtons;
