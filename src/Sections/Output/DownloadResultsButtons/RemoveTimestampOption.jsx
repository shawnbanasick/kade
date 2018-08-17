import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import TimestampSelectionSwitch from "../FactorViz/TimestampSelectionSwitch";

// const styles = {
//   fontSize: 32
// };

class RemoveTimestampOption extends Component {
  render() {
    return (
      <div>
        <div className="switchDiv">
          <span className="switchText" style={{ fontSize: 26 }}>
            Include timestamp in download name?
          </span>
          <TimestampSelectionSwitch
            name="shouldIncludeTimestamp"
            value="shouldIncludeTimestamp"
            toggle={true}
          />
        </div>
      </div>
    );
  }
}

export default easyComp(RemoveTimestampOption);
