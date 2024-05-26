import React, { useEffect } from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import ScatterPlot from './ScatterPlot';
import ParticipantPopUp from './ParticipantPopUp';
import ClockwiseButtons from './ClockwiseButtons';
import RotationTable from '../rotationTable/RotationTable';
import RotationButtons from '../FactorSelect/RotationButtons';
import SaveRotationButton from '../FactorSelect/SaveRotationButton';
import rotationState from '../../../GlobalState/rotationState';
import GeneralButton from '../../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getRotationState from '../../../GlobalState/getRotationState';

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

const localStore = store({
  width: getWidthHeight(),
  height: getWidthHeight(),
});

const scatterPlotStyles = {
  padding: 30,
  marginBottom: 10,
};

const ScatterPlotAndTableTransitionContainer = (props) => {
  const { t } = useTranslation();

  // don't delete - needed for first render on reload
  const size = getWidthHeight();
  localStore.width = size;
  localStore.height = size;

  useEffect(() => {
    window.addEventListener('resize', () => {
      const size = getWidthHeight();
      localStore.width = size;
      localStore.height = size;
    });

    return () => {
      window.removeEventListener('resize', () => {
        const size = getWidthHeight();
        localStore.width = size;
        localStore.height = size;
      });
    };
  }, []);

  const showScatterPlotTableDiv = getRotationState('showScatterPlotTableDiv');
  const degreesText = `${rotationState.rotationDegrees}\u00B0`;
  const data = getRotationState('newRotationVectors');
  const leftContWidth = getWidthHeight();
  const colDefs = getRotationState('rotColDefsFactorTable');
  const rowData = getRotationState('rotRowDataFactorTable');
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
