import { useState } from 'react';
import vizState from '../../GlobalState/vizState';
import './UserSelectionSwitch.css';
import Toggle from 'react-toggle';
import BatsuMark from './batsuMark';
import CheckMark from './checkMark';

const UserSelectionSwitch = (props) => {
  const [toggle, setToggle] = useState(props.toggle);

  const clickToggle = (e) => {
    e.stopPropagation();
    const oldValue = toggle;
    const newValue = !oldValue;
    const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
    const key = props.value;
    factorVizOptionsHolder[key] = newValue;
    setToggle(newValue);

    vizState.factorVizOptionsHolder = factorVizOptionsHolder;
    vizState.updateFactorVisualizationsButtonColor = 'orange';
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
