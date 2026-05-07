import React, { useEffect, useState } from 'react';
import ScatterPlot from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';
import rotationState from '../../../GlobalState/rotationState';
import { useTranslation } from 'react-i18next';

function getWidthHeight() {
  let windowWidth = window.innerWidth - 533;
  const windowHeight = window.innerHeight - 275;

  if (windowWidth > windowHeight) {
    return windowHeight;
  }
  if (windowWidth > 1100) {
    windowWidth = 1100;
  }
  return windowWidth;
}

const scatterPlotStyles = {
  padding: 30,
  marginBottom: 10,
};

const ScatterPlotAndTableTransitionContainer = (props) => {
  const { t } = useTranslation();
  const showScatterPlotTableDiv = rotationState((state) => state.showScatterPlotTableDiv);
  const data = rotationState((state) => state.newRotationVectors);
  const colDefs = rotationState((state) => state.rotColDefsFactorTable);
  const rowData = rotationState((state) => state.rotRowDataFactorTable);
  const rotationDegrees = rotationState((state) => state.rotationDegrees);

  const [localStore, setLocalStore] = useState({
    width: getWidthHeight(),
    height: getWidthHeight(),
  });

  useEffect(() => {
    const size = getWidthHeight();
    setLocalStore({ width: size, height: size });

    const handleResize = () => {
      const size = getWidthHeight();
      setLocalStore({ width: size, height: size });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const degreesText = `${rotationDegrees}\u00B0`;
  const leftContWidth = getWidthHeight();
  const maxTableHeight = window.innerHeight - 284;
  // const maxTableHeight = window.innerHeight / 2 - 120;

  if (showScatterPlotTableDiv) {
    return (
      <React.Fragment>
        <div className="flex items-end w-full h-10 flex-row mb-3" id="RotPlotFactorsSelectDiv">
          {/* <div className="flex h-[30px] w-[85px] text-[clamp(0.80rem,1.2cqw,2rem)] justify-baseline items-center"> */}
          <div className="flex h-7 w-21.25 text-[22px] justify-baseline items-center">
            {t('Rotate')}:
          </div>
          <RotationButtons />
          <ClockwiseButtons baselineData={props.baselineData} />
          <div className="text-center h-12.5 text-[36px] leading-16 w-30">
            <p>{degreesText}</p>
          </div>
          <SaveRotationButton />
        </div>
        <div id="scatterPlotDiv" className="flex w-full h-[calc(100vh-200px)] mt-1.25">
          <div style={{ width: leftContWidth }}>
            <ParticipantPopUp />
            <ScatterPlot
              data={data}
              width={localStore.width}
              height={localStore.height}
              {...props}
              {...scatterPlotStyles}
            />
          </div>
          <div className="flex flex-col">
            <div id="rotFactorsTableDiv">
              <RotationTable colDefs={colDefs} maxHeight={maxTableHeight} rowData={rowData} />
            </div>
            {/* <div className="flex items-center justify-center h-full mt-2 outline-2 outline-red-200">
              <span>network graphs and legend will go here</span>
            </div> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default ScatterPlotAndTableTransitionContainer;
