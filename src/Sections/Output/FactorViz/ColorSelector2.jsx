import React from "react";
import { view, store } from "react-easy-state";
import vizState from "../../GlobalState/vizState";
const clone = require("rfdc")();

const localStore = store({
  color: "#d9effe"
});

function handleChange(e) {
  // getState
  const factorVizOptionsHolder = clone(vizState.factorVizOptionsHolder);
  localStore.color = e.target.value;
  const colorProperty = e.target.id;
  factorVizOptionsHolder[colorProperty] = e.target.value;
  vizState.factorVizOptionsHolder = factorVizOptionsHolder;
  vizState.updateFactorVisualizationsButtonColor = "orange";
}

const ColorSelector = props => {
  // const handleClose = () => {
  //   this.setState({ displayColorPicker: false });
  // };

  return (
    <input
      id={props.id}
      type="color"
      defaultValue={props.defaultColor}
      onChange={handleChange}
    />
  );
};

export default view(ColorSelector);
