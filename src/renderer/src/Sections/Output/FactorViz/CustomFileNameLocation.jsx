import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';

const radioOptions = [
  { label: 'Prepend', value: 'prepend' },
  { label: 'Append', value: 'append' },
  { label: 'Replace', value: 'replace' },
];

const CustomFileNameLocation = () => {
  const { t } = useTranslation();
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const [customFileNameLocation, setCustomFileNameLocation] = useState('');

  const handleChange = (value) => {
    setCustomFileNameLocation(value);
    factorVizOptionsHolder.customFileNameLocation = value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('bg-[orange]');
  };

  return (
    <div className="flex mt-3.75 text-[20px] select-none items-center">
      <span>{t('Custom name position')}</span>
      {radioOptions.map(({ label, value }) => (
        <label key={value} className="flex items-center gap-2 ml-4 cursor-pointer text-[20px]">
          <input
            type="radio"
            name="radioGroup"
            value={value}
            checked={customFileNameLocation === value}
            onChange={() => handleChange(value)}
            className="radio radio-sm"
          />
          {t(label)}
        </label>
      ))}
    </div>
  );
};

export default CustomFileNameLocation;
