import { useState } from 'react';
import vizState from '../../GlobalState/vizState';

const ColorSelector = (props) => {
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const newFactorVizOptionsHolder = {
    ...factorVizOptionsHolder,
  };

  const [localStore, setLocalStore] = useState({
    // color: '#d9effe',
    color: props.defaultColor,
  });

  // todo - check this - use localStore? for color value
  function handleChange(e) {
    // getState

    setLocalStore({ color: e.target.value });

    const colorProperty = e.target.id;
    newFactorVizOptionsHolder[colorProperty] = e.target.value;
    updateFactorVizOptionsHolder(newFactorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('bg-[orange]');
  }

  return (
    <input id={props.id} type="color" defaultValue={localStore.color} onChange={handleChange} />
  );
};

export default ColorSelector;
