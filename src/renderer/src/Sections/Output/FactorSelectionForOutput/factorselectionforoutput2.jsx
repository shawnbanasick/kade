import includes from 'lodash/includes';
import state from '../../../store';

import outputDispatch from '../calcualteOutputLogic/1_outputDispatch';

const handleSubmit = () => {
  outputDispatch();
  state.setState({
    showDownloadOutputButtons: true,
  });
};

const handleOnclick = (event) => {
  const factor = event.target.id;
  let userSelectedFactors = state.getState('userSelectedFactors');

  // select all
  if (factor === 'selectAllFacsButton') {
    const numFactorsKeptForRotation = state.getState('numFactorsKeptForRot');
    userSelectedFactors = [
      'factor 1',
      'factor 2',
      'factor 3',
      'factor 4',
      'factor 5',
      'factor 6',
      'factor 7',
      'factor 8',
    ];
    userSelectedFactors.length = numFactorsKeptForRotation;
    state.setState({
      // highlightfactor1: true,
      // highlightfactor2: true,
      // highlightfactor3: true,
      // highlightfactor4: true,
      // highlightfactor5: true,
      // highlightfactor6: true,
      // highlightfactor7: true,
      // highlightfactor8: true,
      // userSelectedFactors,
      // selectAllClicked: true,
    });

    // clear all
  } else if (factor === 'clearAllFacsButton') {
    userSelectedFactors = [];
    state.setState({
      // highlightfactor1: false,
      // highlightfactor2: false,
      // highlightfactor3: false,
      // highlightfactor4: false,
      // highlightfactor5: false,
      // highlightfactor6: false,
      // highlightfactor7: false,
      // highlightfactor8: false,
      // userSelectedFactors,
    });
  } else {
    // select individual factors
    const selectAllClicked = state.getState('selectAllClicked');
    if (selectAllClicked) {
      userSelectedFactors = [];
      state.setState({
        // highlightfactor1: false,
        // highlightfactor2: false,
        // highlightfactor3: false,
        // highlightfactor4: false,
        // highlightfactor5: false,
        // highlightfactor6: false,
        // highlightfactor7: false,
        // highlightfactor8: false,
        // userSelectedFactors,
        // selectAllClicked: false,
      });
    }
    if (!includes(userSelectedFactors, factor)) {
      userSelectedFactors.push(factor);
      state.setState({ userSelectedFactors });
      const newFactorId = `highlight${factor.replace(' ', '')}`;
      // store[newFactorId] = true;
    }
  }
};

const FactorSelectionForOutputButtons = () => {
  const showOutputFactorSelection = state.getState('showOutputFactorSelection');
  const numFactorsKeptForRotation = state.getState('numFactorsKeptForRot');
  const buttonsToRenderArray = [];
  for (let i = 0; i < 8; i += 1) {
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

  if (showOutputFactorSelection) {
    return (
      <div>
        <span style={{ marginRight: 5 }}>Choose Factors To Output:</span>
        {show1 && (
          <GeneralButton
            id={'factor 1'}
            toggle
            active={state.getState('highlightfactor1')}
            onClick={handleOnclick}
            key={'f1'}
          >
            1
          </GeneralButton>
        )}
        {show2 && (
          <GeneralButton
            id={'factor 2'}
            toggle
            active={state.getState('highlightfactor2')}
            onClick={handleOnclick}
            key={'f2'}
          >
            2
          </GeneralButton>
        )}
        {show3 && (
          <GeneralButton
            id={'factor 3'}
            toggle
            active={state.getState('highlightfactor3')}
            onClick={handleOnclick}
            key={'f3'}
          >
            3
          </GeneralButton>
        )}
        {show4 && (
          <GeneralButton
            id={'factor 4'}
            toggle
            active={state.getState('highlightfactor4')}
            onClick={handleOnclick}
            key={'f4'}
          >
            4
          </GeneralButton>
        )}
        {show5 && (
          <GeneralButton
            id={'factor 5'}
            toggle
            active={state.getState('highlightfactor5')}
            onClick={handleOnclick}
            key={'f5'}
          >
            5
          </GeneralButton>
        )}
        {show6 && (
          <GeneralButton
            id={'factor 6'}
            toggle
            active={state.getState('highlightfactor6')}
            onClick={handleOnclick}
            key={'f6'}
          >
            6
          </GeneralButton>
        )}
        {show7 && (
          <GeneralButton
            id={'factor 7'}
            toggle
            active={state.getState('highlightfactor7')}
            onClick={handleOnclick}
            key={'f7'}
          >
            7
          </GeneralButton>
        )}
        {show8 && (
          <GeneralButton
            id={'factor 8'}
            toggle
            active={state.getState('highlightfactor8')}
            onClick={handleOnclick}
            key={'f8'}
          >
            8
          </GeneralButton>
        )}
        <GeneralButton id="selectAllFacsButton" onClick={handleOnclick}>
          Select All
        </GeneralButton>
        <GeneralButton id="clearAllFacsButton" onClick={handleOnclick}>
          Clear
        </GeneralButton>
        <GeneralButton id="startOutputButton" onClick={handleSubmit}>
          Submit
        </GeneralButton>
      </div>
    );
  }
  return null;
};

export default FactorSelectionForOutputButtons;
