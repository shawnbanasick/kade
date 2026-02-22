import { Component } from 'react';
import TimestampSelectionSwitch from '../FactorViz/TimestampSelectionSwitch';

class RemoveTimestampOption extends Component {
  render() {
    return (
      <div className="flex items-center justify-items-center">
        <div className="switchDiv">
          <div className="switchText" style={{ fontSize: 26, marginBottom: '5px' }}>
            Include timestamp in download name?
          </div>
          <TimestampSelectionSwitch
            name="shouldIncludeTimestamp"
            value="shouldIncludeTimestamp"
            toggle
          />
        </div>
      </div>
    );
  }
}

export default RemoveTimestampOption;
