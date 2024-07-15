import React from 'react';
import includes from 'lodash/includes';
import styled from 'styled-components';
import data from '../plot/data';
import doD3ChartDataPrep from '../rotationLogic/doD3ChartDataPrep';
import rotationTablePrep from '../rotationTable/rotationTablePrep';
import displaySelectedFactorsOnPlot from './displaySelectedFactorsOnPlot';
import calculateCommunalities from '../../varimaxLogic/2calculateCommunalities';
import calculatefSigCriterionValues from '../../varimaxLogic/2calculateSigCriterionValues';
import transposeMatrix from '../../../../Utils/transposeMatrix';
import GeneralButton from '../../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import rotationState from '../../../GlobalState/rotationState';
import factorState from '../../../GlobalState/factorState';

const FactorSelectButtons = (props) => {
  const { t } = useTranslation();
  // getState
  let userSelectedRotFactors = rotationState((state) => state.userSelectedRotFactors);
  let abFactors = rotationState((state) => state.abFactors);
  const factorMatrix1 = factorState((state) => state.factorMatrix);
  const shouldDisplayRotFactorButtons = rotationState((state) => state.shouldShowJudgeRotDiv);
  const numFactorsKeptForRotation = rotationState((state) => state.numFactorsKeptForRot);
  const showRotFactorSelectWarning = rotationState((state) => state.showRotFactorSelectWarning);

  const updateHighlightRotfactor1 = rotationState((state) => state.updateHighlightRotfactor1);
  const updateHighlightRotfactor2 = rotationState((state) => state.updateHighlightRotfactor2);
  const updateHighlightRotfactor3 = rotationState((state) => state.updateHighlightRotfactor3);
  const updateHighlightRotfactor4 = rotationState((state) => state.updateHighlightRotfactor4);
  const updateHighlightRotfactor5 = rotationState((state) => state.updateHighlightRotfactor5);
  const updateHighlightRotfactor6 = rotationState((state) => state.updateHighlightRotfactor6);
  const updateHighlightRotfactor7 = rotationState((state) => state.updateHighlightRotfactor7);
  const updateHighlightRotfactor8 = rotationState((state) => state.updateHighlightRotfactor8);

  const highlightRotfactor1 = rotationState((state) => state.highlightRotfactor1);
  const highlightRotfactor2 = rotationState((state) => state.highlightRotfactor2);
  const highlightRotfactor3 = rotationState((state) => state.highlightRotfactor3);
  const highlightRotfactor4 = rotationState((state) => state.highlightRotfactor4);
  const highlightRotfactor5 = rotationState((state) => state.highlightRotfactor5);
  const highlightRotfactor6 = rotationState((state) => state.highlightRotfactor6);
  const highlightRotfactor7 = rotationState((state) => state.highlightRotfactor7);
  const highlightRotfactor8 = rotationState((state) => state.highlightRotfactor8);

  const updateUserSelectedRotFactors = rotationState((state) => state.updateUserSelectedRotFactors);
  const updateAbFactors = rotationState((state) => state.updateAbFactors);
  const updateShowScatterPlotTableDiv = rotationState(
    (state) => state.updateShowScatterPlotTableDiv
  );
  const updateD3RotChartData = rotationState((state) => state.updateD3RotChartData);
  const updateTempRotFacStateArray = rotationState((state) => state.updateTempRotFacStateArray);
  const updateRotationDegrees = rotationState((state) => state.updateRotationDegrees);
  const updateShowRotFactorSelectWarning = rotationState(
    (state) => state.updateShowRotFactorSelectWarning
  );

  const handleSubmit = () => {
    // getState - if only 1 factor selected show modal
    updateRotationDegrees(0);
    if (userSelectedRotFactors.length < 2) {
      updateShowRotFactorSelectWarning(true);
    } else {
      // show scatter plot and table
      updateShowRotFactorSelectWarning(false);
      updateShowScatterPlotTableDiv(true);
    }
  };

  // passing in baseline data from props
  const handleClick = (event, baselineData) => {
    const factor = event.target.id;
    // getState

    // clear all buttons
    if (factor === 'clearAllRotFacs') {
      updateRotationDegrees(0);
      // userSelectedRotFactors = [];
      // abFactors = [];
      updateHighlightRotfactor1(false);
      updateHighlightRotfactor2(false);
      updateHighlightRotfactor3(false);
      updateHighlightRotfactor4(false);
      updateHighlightRotfactor5(false);
      updateHighlightRotfactor6(false);
      updateHighlightRotfactor7(false);
      updateHighlightRotfactor8(false);
      updateUserSelectedRotFactors([]);
      updateAbFactors([]);
      updateShowScatterPlotTableDiv(false);
    } else {
      // if the button hasn't already been selected
      if (!includes(userSelectedRotFactors, factor)) {
        // if fewer than two buttons have been selected
        if (userSelectedRotFactors.length < 2) {
          // add button clicked id to userselected factors
          userSelectedRotFactors.push(factor);
          // add id to ab factors array
          const idValue = factor.substr(factor.length - 1);
          abFactors.push(parseInt(idValue, 10));
          abFactors.sort((a, b) => a - b);

          // set new variables - highlighting, abFactors, and userSelectedFactors - to state
          const factor2 = factor.replace(' ', '');
          // const newFactorId = `highlightRot${  factor2}`;
          const newFactorId = `highlightRot${factor2}`;

          if (newFactorId === 'highlightRotfactor1') {
            updateHighlightRotfactor1(true);
          }
          if (newFactorId === 'highlightRotfactor2') {
            updateHighlightRotfactor2(true);
          }
          if (newFactorId === 'highlightRotfactor3') {
            updateHighlightRotfactor3(true);
          }
          if (newFactorId === 'highlightRotfactor4') {
            updateHighlightRotfactor4(true);
          }
          if (newFactorId === 'highlightRotfactor5') {
            updateHighlightRotfactor5(true);
          }
          if (newFactorId === 'highlightRotfactor6') {
            updateHighlightRotfactor6(true);
          }
          if (newFactorId === 'highlightRotfactor7') {
            updateHighlightRotfactor7(true);
          }
          if (newFactorId === 'highlightRotfactor8') {
            updateHighlightRotfactor8(true);
          }

          updateUserSelectedRotFactors(userSelectedRotFactors);
          updateAbFactors(abFactors);
        }
        // if length = 2, fire calculations
        if (userSelectedRotFactors.length === 2) {
          // matrix in factor  format

          // transpose matrix to table display format
          const factorMatrixTransposed = transposeMatrix(factorMatrix1);

          // expects bare full array - required to calc significance levels for table/circles
          const arrayWithCommunalities = calculateCommunalities(factorMatrixTransposed);

          // gets array for fSig testing from LS of calculateCommunalities
          // - sets fSigCriterionResults for this factor matrix
          calculatefSigCriterionValues('flag');

          // returns dataValuesArray for D3 chart
          const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);

          // mutate state
          updateD3RotChartData(d3Prep);
          updateTempRotFacStateArray(factorMatrixTransposed);

          // format table data and paint 2-factor table
          rotationTablePrep(d3Prep, baselineData);

          // call to update D3 plot data
          data();
          displaySelectedFactorsOnPlot();
        }
      }
    }
  };

  const buttonsToRenderArray = [];
  const baselineData = props.baselineData;
  for (let i = 0; i < 8; i++) {
    if (i < numFactorsKeptForRotation) {
      buttonsToRenderArray.push(true);
    } else {
      buttonsToRenderArray.push(false);
    }
  }
  const show1 = buttonsToRenderArray[0];
  const show2 = buttonsToRenderArray[1];
  const show3 = buttonsToRenderArray[2];
  const show4 = buttonsToRenderArray[3];
  const show5 = buttonsToRenderArray[4];
  const show6 = buttonsToRenderArray[5];
  const show7 = buttonsToRenderArray[6];
  const show8 = buttonsToRenderArray[7];

  if (shouldDisplayRotFactorButtons) {
    return (
      <React.Fragment>
        {show1 && (
          <GeneralButton
            id={'factor 1'}
            $isActive={highlightRotfactor1}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f1'}
          >
            1
          </GeneralButton>
        )}
        {show2 && (
          <GeneralButton
            id={'factor 2'}
            $isActive={highlightRotfactor2}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f2'}
          >
            2
          </GeneralButton>
        )}
        {show3 && (
          <GeneralButton
            id={'factor 3'}
            $isActive={highlightRotfactor3}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f3'}
          >
            3
          </GeneralButton>
        )}
        {show4 && (
          <GeneralButton
            id={'factor 4'}
            width={'50px'}
            $isActive={highlightRotfactor4}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f4'}
          >
            4
          </GeneralButton>
        )}
        {show5 && (
          <GeneralButton
            id={'factor 5'}
            $isActive={highlightRotfactor5}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f5'}
          >
            5
          </GeneralButton>
        )}
        {show6 && (
          <GeneralButton
            id={'factor 6'}
            $isActive={highlightRotfactor6}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f6'}
          >
            6
          </GeneralButton>
        )}
        {show7 && (
          <GeneralButton
            id={'factor 7'}
            $isActive={highlightRotfactor7}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f7'}
          >
            7
          </GeneralButton>
        )}
        {show8 && (
          <GeneralButton
            id={'factor 8'}
            $isActive={highlightRotfactor8}
            width={'50px'}
            onClick={(e) => handleClick(e, baselineData)} // e => this.handleClick(e, baselineData)
            key={'f8'}
          >
            8
          </GeneralButton>
        )}
        <GeneralButton className="wrapper1" id="clearAllRotFacs" onClick={handleClick}>
          {t('Clear')}
        </GeneralButton>
        <GeneralButton id="startRotationDisplay" onClick={handleSubmit}>
          {t('Display')}
        </GeneralButton>
        {showRotFactorSelectWarning && (
          <div style={{ width: 160, backgroundColor: 'red' }}>
            <span
              style={{
                color: 'white',
                marginRight: 5,
                marginLeft: 5,
                marginTop: 10,
              }}
            >
              Select 2 factor
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
  return null;
};

export default FactorSelectButtons;

const GenButton = styled.div`
  width: 50px;
`;
