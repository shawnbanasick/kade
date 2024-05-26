import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import vizState from '../../GlobalState/vizState';
import getVizState from '../../GlobalState/getVizState';

const localStore = store({
  color: '#d9effe',
});

function handleChange(e) {
  // getState
  const factorVizOptionsHolder = getVizState('factorVizOptionsHolder');

  localStore.color = e.target.value;
  const colorProperty = e.target.id;
  factorVizOptionsHolder[colorProperty] = e.target.value;
  vizState.factorVizOptionsHolder = factorVizOptionsHolder;
  vizState.updateFactorVisualizationsButtonColor = 'orange';
}

const ColorSelector = (props) => {
  return (
    <input id={props.id} type="color" defaultValue={props.defaultColor} onChange={handleChange} />
  );
};

export default ColorSelector;
