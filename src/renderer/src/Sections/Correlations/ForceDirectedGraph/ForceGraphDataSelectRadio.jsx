import React, { useState } from 'react';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';

const ForceGraphDataSelectRadio = () => {
  const updateLinkFilter = correlationState((state) => state.updateLinkFilter);
  const [selected, setSelected] = useState('positive');
  const { t } = useTranslation();

  const handleSelection = (value) => {
    setSelected(value);
    updateLinkFilter(value);
  };

  const options = [
    { id: 'positive', label: '+' },
    { id: 'negative', label: '-' },
    { id: 'all', label: t('All') },
  ];

  return (
    <div className="flex flex-col rounded-lg bg-white p-1 ">
      <label className="label mb-0.5">
        <span className="label-text font-medium">{t('Correlation Links')}: </span>
      </label>
      <div className="inline-flex gap-1 h-[25px]">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`
            relative px-4 pb-0 rounded-md text-sm font-medium bg-grey-button transition-all duration-200
            ${
              selected === option.id
                ? `bg-primary-button hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]`
                : `text-gray-700 hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]`
            }
          `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForceGraphDataSelectRadio;
