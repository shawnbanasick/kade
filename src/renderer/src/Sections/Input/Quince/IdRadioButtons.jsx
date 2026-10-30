import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const IdRadioButtons = () => {
  const { t } = useTranslation();

  const quinceIdMethod = inputState((state) => state.quinceIdMethod);
  const [selected, setSelected] = useState('randomId');
  const updateQuinceIdMethod = inputState((state) => state.updateQuinceIdMethod);

  const handleChange = (event) => {
    console.log('Selected value:', event.target.value);
    const selectedValue = event.target.value;
    setSelected(selectedValue);
    updateQuinceIdMethod(selectedValue);
  };

  const options = [
    { id: 'randomId', title: 'Random ID', description: 'Default option' },
    {
      id: 'partId',
      title: 'Participant ID',
      description: 'Available',
    },
    {
      id: 'urlUsercode',
      title: 'URL Usercode',
      description: 'Available',
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100 space-y-3">
      <div className="space-y-6.5">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={!option.disabled ? option.id : undefined}
            className={`flex items-center p-2.5 rounded-lg border transition-colors ${
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
              onChange={(e) => handleChange(e)}
              className="mt-0.5 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-blue-400 accent-blue-500 disabled:cursor-not-allowed"
            />
            <div className="ml-3 w-40">
              <span
                className={`block text-xs font-medium ${option.disabled ? 'text-gray-400' : 'text-gray-900'}`}
              >
                {option.title}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default IdRadioButtons;
