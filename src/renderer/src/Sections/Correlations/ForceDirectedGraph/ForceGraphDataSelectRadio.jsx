import React, { useState } from 'react';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';
import structureState from '../../GlobalState/structureState';

const ForceGraphDataSelectRadio = () => {
  const updateLinkFilter = correlationState((state) => state.updateLinkFilter);
  const [selected, setSelected] = useState('positive');
  const { t } = useTranslation();
  const updateShowAutoFlags = structureState((state) => state.updateShowAutoFlags);
  const updateSelectedPcaScenario = structureState((state) => state.updateSelectedPcaScenario);

  // setShowAutoFlags(!showAutoFlags)

  const handleSelection = (value) => {
    setSelected(value);
    updateLinkFilter(value);
    updateShowAutoFlags(false); // Reset auto-flags when changing correlation link filter
    updateSelectedPcaScenario('one'); // Reset PCA scenario to 'one' when changing correlation link filter
  };

  const options = [
    { id: 'positive', label: '+' },
    { id: 'negative', label: '-' },
    { id: 'all', label: t('All') },
  ];

  return (
    <div className="flex flex-col rounded-lg bg-white">
      <label className="label">
        <span className="label-text font-medium">{t('Correlation Links')}: </span>
      </label>
      <div className="inline-flex gap-1  ">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`
            flex px-4 rounded-md text-large bg-grey-button transition-all duration-200  w-10 pb-1 items-center justify-center
            ${
              selected === option.id
                ? `bg-primary-button hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]`
                : `text-gray-700 hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]`
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
