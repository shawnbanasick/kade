import React from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import resetSection6 from '../../../Utils/resetSection6';
import resetManualRotation from '../../../Utils/resetManualRotation';
import resetBipolarFactors from '../../../Utils/resetBipolarFactors';
import resetVarimax from '../../../Utils/resetVarimax';
import rotationState from '../../GlobalState/rotationState';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';
import outputState from '../../GlobalState/outputState';

//todo - convert to functional component

const FactorSelectionForOutputButtons = () => {
  // componentWillUnmount() {
  //   // getState
  //   const isFacSelectDisabled = rotationState.getState().isFacSelectDisabled;
  //   if (!isFacSelectDisabled) {
  //     clearAllButtons();
  //   }
  // }

  // get state
  const updateFactor1Active = rotationState((state) => state.updateFactor1Active);
  const updateFactor2Active = rotationState((state) => state.updateFactor2Active);
  const updateFactor3Active = rotationState((state) => state.updateFactor3Active);
  const updateFactor4Active = rotationState((state) => state.updateFactor4Active);
  const updateFactor5Active = rotationState((state) => state.updateFactor5Active);
  const updateFactor6Active = rotationState((state) => state.updateFactor6Active);
  const updateFactor7Active = rotationState((state) => state.updateFactor7Active);
  const updateFactor8Active = rotationState((state) => state.updateFactor8Active);

  const factor1Active = rotationState((state) => state.factor1Active);
  const factor2Active = rotationState((state) => state.factor2Active);
  const factor3Active = rotationState((state) => state.factor3Active);
  const factor4Active = rotationState((state) => state.factor4Active);
  const factor5Active = rotationState((state) => state.factor5Active);
  const factor6Active = rotationState((state) => state.factor6Active);
  const factor7Active = rotationState((state) => state.factor7Active);
  const factor8Active = rotationState((state) => state.factor8Active);

  const updateNumFactorsKeptForRot = rotationState((state) => state.updateNumFactorsKeptForRot);
  const updateShouldDisplayFacKept = rotationState((state) => state.updateShouldDisplayFacKept);
  const updateShowLoadingsTable = loadingState((state) => state.updateShowLoadingsTable);

  const updateIsRotationButtonGreen = appState((state) => state.updateIsRotationButtonGreen);

  // getState
  const isCentroid = factorState((state) => state.activeCentroidRevealButton);
  const isFacSelectDisabled = rotationState((state) => state.isFacSelectDisabled);
  const numCentroidFactors = factorState((state) => state.numCentroidFactors);
  const showKeepFacForRotButton = rotationState((state) => state.showKeepFacForRotButton);
  const minNumFactors = coreState((state) => state.numQsorts);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);

  const clearAllButtons = () => {
    updateFactor1Active(false);
    updateFactor2Active(false);
    updateFactor3Active(false);
    updateFactor4Active(false);
    updateFactor5Active(false);
    updateFactor6Active(false);
    updateFactor7Active(false);
    updateFactor8Active(false);
  };

  const handleOnclick = (event) => {
    const value = event.target.value;
    const factor = event.target.id;
    clearAllButtons();

    // highlight selected button
    if (factor === 'factor1') {
      updateFactor1Active(true);
      console.log('factor1Active', factor1Active);
    }
    if (factor === 'factor2') {
      updateFactor2Active(true);
    }
    if (factor === 'factor3') {
      updateFactor3Active(true);
    }
    if (factor === 'factor4') {
      updateFactor4Active(true);
    }
    if (factor === 'factor5') {
      updateFactor5Active(true);
    }
    if (factor === 'factor6') {
      updateFactor6Active(true);
    }
    if (factor === 'factor7') {
      updateFactor7Active(true);
    }
    if (factor === 'factor8') {
      updateFactor8Active(true);
    }

    updateNumFactorsKeptForRot(value);
    updateShouldDisplayFacKept(false);
    updateShowLoadingsTable(false);

    updateUserSelectedFactors([]);

    // hide section 6
    resetSection6();

    // hide manual rotation
    resetManualRotation();

    // hide bipolar factors
    resetBipolarFactors();

    // hide varimax
    resetVarimax();

    updateIsRotationButtonGreen(true);
    console.log(event.target);
  };

  const buttonsArray = [];

  // const btnId = [1, 2, 3, 4, 5, 6, 7, 8];
  if (minNumFactors < buttonsArray.length) {
    buttonsArray.length = minNumFactors;
  }

  if (isCentroid) {
    // btnId.length = +numCentroidFactors;
    buttonsArray.length = +numCentroidFactors;
  }

  if (showKeepFacForRotButton) {
    return (
      <React.Fragment>
        <GeneralButton
          key={`f1`}
          width="50px"
          height="40px"
          value={1}
          $isActive={factor1Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor1`}
        >
          1
        </GeneralButton>
        <GeneralButton
          key={`f2`}
          width="50px"
          height="40px"
          value={2}
          $isActive={factor2Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor2`}
        >
          2
        </GeneralButton>
        <GeneralButton
          key={`f3`}
          width="50px"
          height="40px"
          value={3}
          $isActive={factor3Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor3`}
        >
          3
        </GeneralButton>
        <GeneralButton
          key={`f4`}
          width="50px"
          height="40px"
          value={4}
          $isActive={factor4Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor4`}
        >
          4
        </GeneralButton>
        <GeneralButton
          key={`f5`}
          width="50px"
          height="40px"
          value={5}
          $isActive={factor5Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor5`}
        >
          5
        </GeneralButton>
        <GeneralButton
          key={`f6`}
          width="50px"
          height="40px"
          value={6}
          $isActive={factor6Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor6`}
        >
          6
        </GeneralButton>
        <GeneralButton
          key={`f7`}
          width="50px"
          height="40px"
          value={7}
          $isActive={factor7Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor7`}
        >
          7
        </GeneralButton>
        <GeneralButton
          key={`f8`}
          width="50px"
          height="40px"
          value={8}
          $isActive={factor8Active}
          disabled={isFacSelectDisabled}
          onClick={handleOnclick}
          id={`factor8`}
        >
          8
        </GeneralButton>
      </React.Fragment>
    );
  }
  return null;
};
export default FactorSelectionForOutputButtons;
