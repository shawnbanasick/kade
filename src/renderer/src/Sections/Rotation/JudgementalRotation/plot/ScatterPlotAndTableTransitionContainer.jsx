import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScatterPlot from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';
import rotationState from '../../../GlobalState/rotationState';
import GeneralButton from '../../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

// sets scatterplot width and height
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

  // don't delete - needed for first render on reload

  useEffect(() => {
    const size = getWidthHeight();
    setLocalStore({ width: size, height: size });
    window.addEventListener('resize', () => {
      const size = getWidthHeight();
      setLocalStore({ width: size, height: size });
    });

    return () => {
      window.removeEventListener('resize', () => {
        const size = getWidthHeight();
        setLocalStore({ width: size, height: size });
      });
    };
  }, []);

  const degreesText = `${rotationDegrees}\u00B0`;
  const leftContWidth = getWidthHeight();
  const maxTableHeight = window.innerHeight - 300;

  if (showScatterPlotTableDiv) {
    return (
      <React.Fragment>
        <DegreesDiv>
          <TextButton as={GeneralButton}>{t('Rotate axes')}</TextButton>
          <RotationButtons />
          <ClockwiseButtons baselineData={props.baselineData} />
          <DegreesText>
            {' '}
            <p>{degreesText}</p>
          </DegreesText>
          <SaveRotationButton />
        </DegreesDiv>
        <PlotAndChartDiv id="scatterPlotDiv">
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
        </PlotAndChartDiv>
      </React.Fragment>
    );
  }
  return null;
};

export default ScatterPlotAndTableTransitionContainer;

const DegreesText = styled.div`
  text-align: center;
  height: 60px;
  font-size: 50px;
  width: 105px;
  margin-left: 10px;
  margin-right: 17px;
`;

const PlotAndChartDiv = styled.div`
  display: flex;
  width: calc(100wv - 523);
  height: calc(100vh - 255);
  margin-top: 10px;
`;

const TextButton = styled.div`
  font-size: 20px;
  background-color: white;
`;

const DegreesDiv = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  margin-top: 5;
  margin-bottom: 20;
`;
