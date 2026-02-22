import { useState } from 'react';
import UserNumberInputStructure from './userNumberInputStructure';
import refreshViz from './refreshViz';
import structureState from '../GlobalState/structureState';

const ControlPanel = () => {
  const [selectedValue, setSelectedValue] = useState('variance');
  const refreshVizButtonColor = structureState((state) => state.refreshVizButtonColor);
  const updateRefreshVizButtonColor = structureState((state) => state.updateRefreshVizButtonColor);

  const handleRefresh = () => {
    refreshViz();
    updateRefreshVizButtonColor(
      getComputedStyle(document.documentElement).getPropertyValue('--main-theme-color')
    );
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[150px] w-full border-b-[1.5px] border-black bg-white pb-2.5">
      {/* Row 1 - Message */}
      <div className="flex flex-row items-center justify-between w-[90%] mt-2.5 [&_span]:text-base [&_span]:mr-1.5">
        <span className="text-base w-[1000px]">
          Individual links and boxes can be deleted by left clicking on them with your mouse and
          then pressing the &quot;Backspace&quot; key.
        </span>
      </div>

      {/* Row 2 - Line Display Cutoff */}
      <div className="flex flex-row items-center justify-between w-[90%] mt-2.5 [&_span]:text-base [&_span]:mr-1.5">
        <div className="flex flex-row items-center justify-center w-[230px]">
          <span className="text-base mr-1.5 w-[300px]">Line Display Cutoff:</span>
          <UserNumberInputStructure
            name={'adjustEdgeCutoffTo'}
            step="0.01"
            lowerLimit={0.01}
            upperLimit={1.0}
            value={0.3}
          />
        </div>
        <MainButton>Display Number of Autoflagged Q Sorts</MainButton>
        <MainButton>Download PNG Image</MainButton>
      </div>

      {/* Row 3 - Radio buttons */}
      <div className="flex flex-1 mt-2.5 justify-center items-center">
        <div className="flex flex-row text-base items-center justify-around rounded-lg">
          <span className="mr-0">Box Width:</span>
          <div className="flex flex-row items-stretch ml-2.5">
            <input
              type="radio"
              id="variance"
              value="variance"
              checked={selectedValue === 'variance'}
              onChange={() => handleRadioChange('variance')}
            />
            <label htmlFor="variance" className="flex ml-2">
              Explained Variance
            </label>
          </div>
          <div className="flex flex-row items-stretch ml-2.5">
            <input
              type="radio"
              id="constant"
              value="constant"
              checked={selectedValue === 'constant'}
              onChange={() => handleRadioChange('constant')}
            />
            <label htmlFor="constant" className="flex ml-2">
              Constant
            </label>
          </div>
        </div>
      </div>

      {/* Row 4 - Vertical Spacing */}
      <div className="flex flex-row items-center justify-between w-[90%] mt-2.5 [&_span]:text-base [&_span]:mr-1.5">
        <div className="flex flex-row items-center justify-between w-[255px]">
          <span className="text-base mr-1.5 w-[300px]">Adjust Vertical Spacing:</span>
          <UserNumberInputStructure
            name={'adjustVerticalSpacing'}
            step="0.01"
            lowerLimit={0.01}
            upperLimit={1.0}
            value={0.4}
            width={150}
          />
        </div>
        <MainButton onClick={handleRefresh} buttonColor={refreshVizButtonColor}>
          Refresh Visualization
        </MainButton>
        <MainButton>Download SVG Image</MainButton>
      </div>
    </div>
  );
};

// MainButton extracted as a small component to handle dynamic buttonColor prop cleanly
const MainButton = ({ children, onClick, buttonColor, isActive, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: buttonColor }}
      className={`
        grid items-center justify-items-center shadow-none min-h-[20px] h-auto w-auto
        text-center text-base font-normal font-sans border-none rounded-[4px]
        mr-[3px] mb-[3px] py-[5px] px-[10px] cursor-pointer text-black no-underline
        transition-[box-shadow] duration-300 translate-z-0
        focus:outline-none disabled:pointer-events-none disabled:opacity-70
        hover:[box-shadow:inset_0_0_0_4px_#666,_0_0_1px_transparent]
        ${
          isActive
            ? '[box-shadow:inset_0_0_0_2px_#666,_0_0_1px_transparent]'
            : '[box-shadow:inset_0_0_0_0px_#666,_0_0_0px_transparent]'
        }
      `}
    >
      {children}
    </button>
  );
};

export default ControlPanel;
