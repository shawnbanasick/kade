import React, { useState } from 'react';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';

const PcaScenarios = () => {
  const updateLinkFilter = correlationState((state) => state.updateLinkFilter);
  const [selected, setSelected] = useState('all');
  const { t } = useTranslation();

  const handleSelection = (value) => {
    setSelected(value);
    updateLinkFilter(value);
  };

  const options = [
    { id: 'one', label: t('1') },
    { id: 'two', label: t('2') },
    { id: 'three', label: t('3') },
    { id: 'four', label: t('4') },
    { id: 'five', label: t('5') },
    { id: 'six', label: t('6') },
    { id: 'seven', label: t('7') },
    { id: 'eight', label: t('8') },
    { id: 'none', label: t('Clear') },
  ];

  return (
    <div className="flex flex-col rounded-lg bg-white p-1 ml-8">
      <label className="label mb-0.5">
        <span className="label-text font-medium">{t('PCA Scenarios')}: </span>
      </label>
      <div className="inline-flex flex-wrap gap-1 h-[25px]">
        <button
          className={`
            relative px-0 py-1.5 bg-white rounded-md text-sm font-medium bg-grey-button
          `}
        >
          {t('Principal Components')}:
        </button>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`
            relative px-3 py-1.5 rounded-md text-sm font-medium bg-grey-button transition-all duration-200
            ${
              selected === option.id
                ? `bg-primary-button shadow-md transform scale-100`
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

export default PcaScenarios;
