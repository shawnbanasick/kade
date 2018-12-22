import React from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({
  color: "#d9effe"
});

function handleChange(e) {
  const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
  localStore.color = e.target.value;
  const colorProperty = e.target.id;
  factorVizOptionsHolder[colorProperty] = e.target.value;
  state.setState({
    factorVizOptionsHolder,
    updateFactorVisualizationsButtonColor: "orange"
  });
}

class ColorSelector extends React.Component {
  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  render() {
    return (
      <input
        id={this.props.id}
        type="color"
        defaultValue={this.props.defaultColor}
        onChange={handleChange}
      />
    );
  }
}

export default view(ColorSelector);
