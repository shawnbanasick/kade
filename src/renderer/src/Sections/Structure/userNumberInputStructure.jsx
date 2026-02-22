import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import structureState from '../GlobalState/structureState';

const UserNumberInput = (props) => {
  const { t } = useTranslation();
  const updateLineDisplayCutoff = structureState((state) => state.updateLineDisplayCutoff);
  const updateAdjustVerticalSpacing = structureState((state) => state.updateAdjustVerticalSpacing);
  const [value, setValue] = useState(props.value);
  const [showWarning, setShowWarning] = useState(false);
  const updateRefreshVizButtonColor = structureState((state) => state.updateRefreshVizButtonColor);

  const handleChange = (e) => {
    let value = e.target.value;
    if (isNaN(value)) return null;

    const key = props.name;
    setShowWarning(false);
    const { upperLimit, lowerLimit } = props;

    if (value < lowerLimit || value > upperLimit) {
      setValue(value);
      setShowWarning(true);
    } else {
      setValue(value);
      if (key === 'adjustEdgeCutoffTo') {
        updateLineDisplayCutoff(value);
      } else if (key === 'adjustVerticalSpacing') {
        updateAdjustVerticalSpacing(value);
      }
      updateRefreshVizButtonColor('orange');
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
        className="optionsInput text-black cursor-pointer mb-0 w-[75px] rounded-md box-border h-[25px] border border-gray-300 shadow-none outline-none transition-all duration-150 text-center hover:outline-none hover:bg-transparent hover:shadow-none"
      />
      {showWarning && (
        <div className="ml-2.5 pt-1 px-2.5 bg-pink-200 text-black h-[25px] w-auto">
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default UserNumberInput;
