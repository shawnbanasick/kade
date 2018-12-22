import React from "react";
import { view } from "react-easy-state";
import state from "../../../store";

class UserSelectionSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: this.props.toggle
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    const oldValue = this.state.toggle;
    const newValue = !oldValue;
    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    const key = this.props.value;
    factorVizOptionsHolder[key] = newValue;
    this.state.toggle = newValue;

    state.setState({
      factorVizOptionsHolder,
      updateFactorVisualizationsButtonColor: "orange"
    });
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="switch-light switch-holo">
          <input
            id={this.props.name}
            type="checkbox"
            name={this.props.name}
            defaultChecked={this.state.toggle}
            onChange={e => this.toggle(e)}
          />
          <span
            key={this.props.name}
            style={{ width: 100, marginRight: 15, marginLeft: 20 }}
          >
            <span>No</span>
            <span>YES</span>
            <a>.</a>
          </span>
        </label>
      </div>
    );
  }
}

export default view(UserSelectionSwitch);
