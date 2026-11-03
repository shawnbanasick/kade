import { useId } from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_OPTIONS = [
  {
    value: 'forced',
    titleKey: 'Forced',
    descriptionKey: 'The number of statements in each column was limited.',
  },
  {
    value: 'unforced',
    titleKey: 'Free Placement',
    descriptionKey: 'No limit on the number of statements per column.',
  },
];

const ForcedUnforcedRadio = ({ value, onChange, options = DEFAULT_OPTIONS, legend }) => {
  const { t } = useTranslation();
  const groupName = useId();

  return (
    <fieldset className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {legend && <legend className="sr-only">{legend}</legend>}
      <div className="space-y-7">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-2.5 rounded-lg border transition-colors ${
              option.disabled
                ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                : value === option.value
                  ? 'border-blue-400 bg-blue-50/50 cursor-pointer'
                  : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
              className="mt-2 h-4 w-4 accent-blue-500 disabled:cursor-not-allowed"
            />
            <div className="ml-3 w-40">
              <span className="block text-xs text-left font-medium text-gray-900">
                {t(option.titleKey)}
              </span>
              <span className="block text-xs text-left text-gray-500">
                {t(option.descriptionKey)}
              </span>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ForcedUnforcedRadio;
