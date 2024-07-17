import { useState } from 'react';
import vizState from '../../GlobalState/vizState';

const ColorSelector = (props) => {
  const [localStore, setLocalStore] = useState({
    color: '#d9effe',
  });

  // todo - check this - use localStore? for color value
  function handleChange(e) {
    // getState
    const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
    const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
    const updateUpdateFactorVisualizationsButtonColor = vizState(
      (state) => state.updateUpdateFactorVisualizationsButtonColor
    );

    setLocalStore({ color: e.target.value });

    const colorProperty = e.target.id;
    factorVizOptionsHolder[colorProperty] = e.target.value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateUpdateFactorVisualizationsButtonColor('orange');
  }

  return (
    <input id={props.id} type="color" defaultValue={props.defaultColor} onChange={handleChange} />
  );
};

export default ColorSelector;
