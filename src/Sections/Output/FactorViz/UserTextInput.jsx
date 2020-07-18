import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import vizState from "../../GlobalState/vizState";

const clone = require("rfdc")();

const UserTextInput = props => {
  const handleChange = e => {
    const factorVizOptionsHolder = clone(vizState.factorVizOptionsHolder);
    const key = props.name;
    factorVizOptionsHolder[key] = e.target.value;
    vizState.factorVizOptionsHolder = factorVizOptionsHolder;
    vizState.updateFactorVisualizationsButtonColor = "orange";
  };

  return (
    <UserText
      placeholder={props.placeholder}
      width={props.width}
      left={props.left}
      name={props.name}
      value={props.value}
      onChange={handleChange}
      className="optionsInput"
    />
  );
};

export default view(UserTextInput);

const UserText = styled.input(props => ({
  width: `${props.width}px`,
  marginLeft: `${props.left}px`,
  paddingLeft: `10px`
}));
