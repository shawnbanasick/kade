import React, { useState } from 'react';

import outputState from '../../GlobalState/outputState';
import './UserSelectionSwitch.css';
import Toggle from 'react-toggle';
import BatsuMark from '../FactorViz/batsuMark';
import CheckMark from '../FactorViz/checkMark';

const UserSelectionSwitch = (props) => {
  const [toggle, setToggle] = useState(props.toggle);

  const clickToggle = (e) => {
    e.stopPropagation();
    const oldValue = toggle;
    const newValue = !oldValue;
    const key = props.value;
    setToggle(newValue);
    outputState[key] = newValue;
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
