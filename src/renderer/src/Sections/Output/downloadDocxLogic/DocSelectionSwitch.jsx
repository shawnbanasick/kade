import { useState } from 'react';
import './UserSelectionSwitch.css';
import Toggle from 'react-toggle';
import BatsuMark from '../FactorViz/batsuMark';
import CheckMark from '../FactorViz/checkMark';
import outputState from '../../GlobalState/outputState';

const UserSelectionSwitch = (props) => {
  const [toggle, setToggle] = useState(props.toggle);

  const clickToggle = (e) => {
    e.stopPropagation();
    const oldValue = toggle;
    const newValue = !oldValue;
    const key = props.value;
    console.log(key, newValue, oldValue);
    setToggle(newValue);
    // outputState[key] = newValue;
    outputState.setState({ [key]: newValue });
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
