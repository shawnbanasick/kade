import { useState } from 'react';
import vizState from '../../GlobalState/vizState';
import './UserSelectionSwitch.css';
import Toggle from 'react-toggle';
import BatsuMark from './batsuMark';
import CheckMark from './checkMark';

const UserSelectionSwitch = (props) => {
  const [toggle, setToggle] = useState(props.toggle);
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const clickToggle = (e) => {
    e.stopPropagation();
    const oldValue = toggle;
    const newValue = !oldValue;
    const key = props.value;
    factorVizOptionsHolder[key] = newValue;
    setToggle(newValue);
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('orange');
  };

  return (
    <Toggle
      id={props.name}
      name={props.name}
      defaultChecked={props.toggle}
      onChange={(e) => clickToggle(e)}
      icons={{
        checked: <CheckMark />,
        unchecked: <BatsuMark />,
      }}
    />
  );
};

export default UserSelectionSwitch;
