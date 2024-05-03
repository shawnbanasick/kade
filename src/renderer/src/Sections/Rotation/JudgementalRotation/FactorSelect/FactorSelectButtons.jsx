import React from 'react';
import includes from 'lodash/includes';
import { view } from '@risingstack/react-easy-state';
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
import getRotationState from '../../../GlobalState/getRotationState';
import getFactorState from '../../../GlobalState/getFactorState';

const FactorSelectButtons = (props) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    // getState - if only 1 factor selected show modal
    rotationState.rotationDegrees = 0;
    const userSelectedRotFactors = getRotationState('userSelectedRotFactors');
    if (userSelectedRotFactors.length < 2) {
      rotationState.showRotFactorSelectWarning = true;
    } else {
      // show scatter plot and table
      rotationState.showRotFactorSelectWarning = false;
      rotationState.showScatterPlotTableDiv = true;
    }
  };

  // passing in baseline data from props
  const handleClick = (event, baselineData) => {
    const factor = event.target.id;
    // getState
    let userSelectedRotFactors = getRotationState('userSelectedRotFactors');
    let abFactors = getRotationState('abFactors');

    // clear all buttons
    if (factor === 'clearAllRotFacs') {
      rotationState.rotationDegrees = 0;
      userSelectedRotFactors = [];
      abFactors = [];
      rotationState.highlightRotfactor1 = false;
      rotationState.highlightRotfactor2 = false;
      rotationState.highlightRotfactor3 = false;
      rotationState.highlightRotfactor4 = false;
      rotationState.highlightRotfactor5 = false;
      rotationState.highlightRotfactor6 = false;
      rotationState.highlightRotfactor7 = false;
      rotationState.highlightRotfactor8 = false;
      rotationState.userSelectedRotFactors = userSelectedRotFactors;
      rotationState.abFactors = abFactors;
      rotationState.showScatterPlotTableDiv = false;
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
          rotationState[newFactorId] = true;
          rotationState.userSelectedRotFactors = userSelectedRotFactors;
          rotationState.abFactors = abFactors;
        }
        // if length = 2, fire calculations
        if (userSelectedRotFactors.length === 2) {
          // matrix in factor  format
          const factorMatrix1 = getFactorState('factorMatrix');

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
          rotationState.d3RotChartData = d3Prep;
          rotationState.tempRotFacStateArray = factorMatrixTransposed;

          // format table data and paint 2-factor table
          rotationTablePrep(d3Prep, baselineData);

          // call to update D3 plot data
          data();
          displaySelectedFactorsOnPlot();
        }
      }
    }
  };

  // getState
  const shouldDisplayRotFactorButtons = getRotationState('shouldShowJudgeRotDiv');
  const numFactorsKeptForRotation = getRotationState('numFactorsKeptForRot');
  const showRotFactorSelectWarning = getRotationState('showRotFactorSelectWarning');
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
          <GenButton
            as={GeneralButton}
            id={'factor 1'}
            isActive={rotationState.highlightRotfactor1}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f1'}
          >
            1
          </GenButton>
        )}
        {show2 && (
          <GenButton
            as={GeneralButton}
            id={'factor 2'}
            isActive={rotationState.highlightRotfactor2}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f2'}
          >
            2
          </GenButton>
        )}
        {show3 && (
          <GenButton
            as={GeneralButton}
            id={'factor 3'}
            isActive={rotationState.highlightRotfactor3}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f3'}
          >
            3
          </GenButton>
        )}
        {show4 && (
          <GenButton
            as={GeneralButton}
            id={'factor 4'}
            isActive={rotationState.highlightRotfactor4}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f4'}
          >
            4
          </GenButton>
        )}
        {show5 && (
          <GenButton
            as={GeneralButton}
            id={'factor 5'}
            isActive={rotationState.highlightRotfactor5}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f5'}
          >
            5
          </GenButton>
        )}
        {show6 && (
          <GenButton
            as={GeneralButton}
            id={'factor 6'}
            isActive={rotationState.highlightRotfactor6}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f6'}
          >
            6
          </GenButton>
        )}
        {show7 && (
          <GenButton
            as={GeneralButton}
            id={'factor 7'}
            isActive={rotationState.highlightRotfactor7}
            onClick={(e) => handleClick(e, baselineData)}
            key={'f7'}
          >
            7
          </GenButton>
        )}
        {show8 && (
          <GenButton
            as={GeneralButton}
            id={'factor 8'}
            isActive={rotationState.highlightRotfactor8}
            onClick={(e) => handleClick(e, baselineData)} // e => this.handleClick(e, baselineData)
            key={'f8'}
          >
            8
          </GenButton>
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
                marginTop: 10
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

export default view(FactorSelectButtons);

const GenButton = styled.div`
  width: 50px;
`;
