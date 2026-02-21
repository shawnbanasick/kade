import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

const DocxNumberInput = (props) => {
  const { t } = useTranslation();
  const updateCorrelationThreshold = outputState((state) => state.updateCorrelationThreshold);
  const correlationThreshold = outputState((state) => state.correlationThreshold);

  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (isNaN(value)) return null;

    setShowWarning(false);
    const upperLimit = props.upperLimit;
    const lowerLimit = props.lowerLimit;
    if (value < lowerLimit || value > upperLimit) {
      setShowWarning(true);
    } else {
      updateCorrelationThreshold(value);
    }
  };

  const warningMessage = `${t('Lower Limit')}: ${props.lowerLimit}, ${t('Upper Limit')}: ${props.upperLimit}`;

  return (
    <div className="flex flex-row w-[90px]">
      <input
        type="number"
        placeholder={props.placeholder}
        name={props.name}
        step={props.step}
        value={correlationThreshold}
        onChange={handleChange}
        className="optionsInput text-black cursor-pointer mb-0 w-[45px] rounded-[5px] box-border h-[25px] border border-gray-300 shadow-none outline-none transition-all duration-150 text-center hover:outline-none hover:bg-transparent hover:shadow-none"
      />
      {showWarning && (
        <div className="ml-[10px] pt-1 px-[10px] bg-pink-200 text-black h-[25px] w-auto">
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default DocxNumberInput;
