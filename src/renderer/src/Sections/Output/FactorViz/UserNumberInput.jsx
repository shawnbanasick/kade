import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';

const UserNumberInput = (props) => {
  const { t } = useTranslation();
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const [value, setValue] = useState(props.value);
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) return null;

    const key = props.name;
    setShowWarning(false);
    const { upperLimit, lowerLimit } = props;

    if (value < lowerLimit || value > upperLimit) {
      setValue(value);
      setShowWarning(true);
    } else {
      setValue(value);
      factorVizOptionsHolder[key] = value;
      updateFactorVizOptionsHolder(factorVizOptionsHolder);
      updateFactorVisualizationsButtonColor('bg-[orange]');
    }
  };

  const warningMessage = `${t('Lower Limit')}: ${props.lowerLimit}, ${t('Upper Limit')}: ${props.upperLimit}`;

  return (
    <div className="flex flex-row" style={{ width: props.width ? `${props.width}px` : '400px' }}>
      <input
        type="number"
        placeholder={props.placeholder}
        name={props.name}
        step={props.step}
        value={value}
        onChange={handleChange}
        className="optionsInput text-black cursor-pointer mb-0 w-[75px] rounded-[5px] box-border h-[25px] border border-lightgray shadow-none outline-none transition-all duration-150 text-center hover:outline-none hover:bg-transparent hover:shadow-none"
      />
      {showWarning && (
        <div className="ml-[10px] pt-[4px] px-[10px] bg-[lightpink] text-black h-[25px] w-auto">
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default UserNumberInput;
