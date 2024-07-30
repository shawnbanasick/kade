import { useState } from 'react';
import vizState from '../../GlobalState/vizState';

const ColorSelector = (props) => {
  const [localStore, setLocalStore] = useState({
    // color: '#d9effe',
    color: props.defaultColor,
  });

  // todo - check this - use localStore? for color value
  function handleChange(e) {
    // getState
    const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
    const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
    const updateFactorVisualizationsButtonColor = vizState(
      (state) => state.updateFactorVisualizationsButtonColor
    );

    setLocalStore({ color: e.target.value });

    const colorProperty = e.target.id;
    factorVizOptionsHolder[colorProperty] = e.target.value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('orange');
  }

  return (
    <input id={props.id} type="color" defaultValue={localStore.color} onChange={handleChange} />
  );
};

export default ColorSelector;
