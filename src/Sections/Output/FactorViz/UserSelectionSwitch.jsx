import React from "react";
import "./UserSelectionSwitch.css";
import store from '../../store';

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
        this.setState({
            toggle: !this.state.toggle
        });
        let stateFrag = {};
        let key = this.props.value;
        let stateValue = !this.state.toggle;
        stateFrag[key] = stateValue;
        store.setState(stateFrag);
    }

    render() {
        return (
            <div style={ { marginTop: 5 } }>
              <label className="switch-light switch-holo">
                <input type="checkbox" name={ this.props.name } defaultChecked={ this.state.toggle } onChange={ e => this.toggle(e) } />
                <span key={ this.props.name } style={ { width: 100, marginTop: 6 } }>
                        <span>No</span>
                <span>YES</span>
                <a>.</a>
                </span>
              </label>
            </div>
            );
    }
}

export default UserSelectionSwitch;

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
