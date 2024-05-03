import { view, store } from '@risingstack/react-easy-state';
import React from 'react';
import styled from 'styled-components';
import state from '../../../store';
import centroidDispatch from '../centroidLogic/centroidDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
const localStore = store({
  buttonColor: '#d6dbe0'
});

const handleClick = () => {
  const numFactors = state.getState('numCentroidFactors');

  if (isNaN(numFactors)) {
    state.setState({
      showCentroidError: true,
      errorMessage: 'Select the number of factors to extract first'
    });
  } else {
    state.setState({
      isCentroidLoading: true
    });
    setTimeout(() => {
      centroidDispatch(numFactors);
      state.setState({
        numFacsForTableWidth: numFactors,
        showUnrotatedFactorTable: true,
        showEigenvaluesTable: true,
        showScreePlot: true,
        activeCentroidRevealButton: true,
        isPcaButtonDisabled: true,
        disabledCentroidFactorButton: true,
        showKeepFacForRotButton: true,
        showCentroidSpinner: true,
        showCentroidError: false,
        isFactorsButtonGreen: true
      });
    }, 10);
  }
};

const CallCentroidFactorButton = () => {
  const showCentroidSpinner = state.getState('showCentroidSpinner');
  return (
    <GeneralButton buttonColor={localStore.buttonColor} onClick={() => handleClick()}>
      {showCentroidSpinner ? <Spinner /> : <p>Centroid Factors</p>}
    </GeneralButton>
  );
};

export default view(CallCentroidFactorButton);

const BeginCentroidButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${(props) => props.buttonColor};
  height: 48px;
  width: 160px;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  outline: none;
  margin-left: 33px;
  /* margin-top: 3px; */
  box-shadow: 0 2px 2px 0 black;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 1px 1px 0 black inset;
    margin-left: 27px;
    transform: translateY(1px);
    /* margin-top: 3px; */
  }
`;

// spinner from https://codepen.io/mandelid/pen/vwKoe
const Spinner = styled.div`
  display: inline-block;
  margin-left: 57px;
  width: 25px;
  height: 25px;
  border: 6px solid lightgray;
  border-radius: 50%;
  border-top-color: rgba(32, 178, 170, 0.3);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
