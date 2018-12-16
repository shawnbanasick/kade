import React from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({});

class UserSelectionSwitch extends React.Component {
  constructor(props) {
    super(props);

    // localStore.toggle = this.props.toggle;
    console.log(`toggle initial: ${JSON.stringify(localStore.toggle)}`);

    this.state = {
      toggle: this.props.toggle
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    console.log(`initial val: ${JSON.stringify(localStore.toggle)}`);

    e.stopPropagation();
    const oldValue = this.state.toggle;
    const newValue = !oldValue;
    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    // const stateFrag = {};
    const key = this.props.value;
    // const stateValue = localStore.toggle;
    factorVizOptionsHolder[key] = newValue;
    this.state.toggle = newValue;
    // stateFrag[key] = stateValue;
    console.log(`holder: ${JSON.stringify(factorVizOptionsHolder)}`);

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

/*


 <div className='example'>
          <label>
            <Toggle
              defaultChecked={this.state.baconIsReady}
              onChange={this.handleBaconChange} />
            <span className='label-text'>Wrapper label tag</span>
          </label>

          <pre>
            {`<label>
          <Toggle
            defaultChecked={this.state.baconIsReady}
            onChange={this.handleBaconChange} />
          <span>Wrapper label tag</span>
        </label>`}
          </pre>
          <pre>
            this.state.baconIsReady: {JSON.stringify(this.state.baconIsReady)}
          </pre>
        </div>
*/
