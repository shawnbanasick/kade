import React, { useEffect, useState } from 'react';
import ScatterPlot from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';
import rotationState from '../../../GlobalState/rotationState';
import GeneralButton from '../../../../Utils/GeneralButton';
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
  const maxTableHeight = window.innerHeight - 300;

  if (showScatterPlotTableDiv) {
    return (
      <React.Fragment>
        <div className="flex items-end w-full flex-row mb-[20px]">
          <div className="flex h-[30px] w-[7vw] text-[clamp(0.80rem,1.2cqw,2rem)] mr-4 justify-baseline items-center">
            {t('Rotate axes')}:
          </div>
          <RotationButtons />
          <ClockwiseButtons baselineData={props.baselineData} />
          <div className="text-right h-[60px] text-[50px] w-[120px]">
            <p>{degreesText}</p>
          </div>
          <SaveRotationButton />
        </div>
        <div
          id="scatterPlotDiv"
          className="flex w-[calc(100vw-523px)] h-[calc(100vh-255px)] mt-[10px]"
        >
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
          <div id="rotFactorsTableDiv">
            <RotationTable colDefs={colDefs} maxHeight={maxTableHeight} rowData={rowData} />
          </div>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default ScatterPlotAndTableTransitionContainer;
