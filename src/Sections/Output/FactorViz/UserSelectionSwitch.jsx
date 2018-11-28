import React from "react";
import { view, store } from "react-easy-state";
import state from "../../../store";

const localStore = store({});

class UserSelectionSwitch extends React.Component {
  constructor(props) {
    super(props);

    localStore.toggle = this.props.toggle;

    // this.state = {
    //   toggle: this.props.toggle
    // };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    localStore.toggle = !localStore.toggle;
    const stateFrag = {};
    const key = this.props.value;
    const stateValue = !localStore.toggle;
    stateFrag[key] = stateValue;
    state.setState(stateFrag);
  }

  render() {
    return (
      <div style={{ marginTop: 5 }}>
        <label htmlFor={this.props.name} className="switch-light switch-holo">
          <input
            id={this.props.name}
            type="checkbox"
            name={this.props.name}
            defaultChecked={localStore.toggle}
            onChange={e => this.toggle(e)}
          />
          <span key={this.props.name} style={{ width: 100, marginTop: 6 }}>
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
