import React from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({
  color: "#42b6f4"
});

class ColorSelector extends React.Component {
  //   state = {
  //   };

  handleChange(e) {
    // preventDefault(e);
    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    console.log(JSON.stringify(e.target.value));
    localStore.color = e.target.value;
    factorVizOptionsHolder.consensusIndicator = e.target.value;
    state.setState({
      factorVizOptionsHolder,
      updateFactorVisualizationsButtonColor: "orange"
    });

    // this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    return (
      <div>
        <input
          type="color"
          id="color"
          defaultValue={localStore.color}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default view(ColorSelector);
