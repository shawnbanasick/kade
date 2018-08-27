import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import state from "../../../store";

// import '../LoadingsTable/MajorityCommonVarianceCheckbox.css';

const localStore = store({
  checked: true
});

class MajorityCommonVarianceCheckbox extends Component {
  toggle() {
    let requireMajorityCommonVariance = state.getState("requireMajorityCommonVariance");
    requireMajorityCommonVariance = !requireMajorityCommonVariance;
    state.setState({
      requireMajorityCommonVariance
    });

    localStore.checked = !localStore.checked;
  };

  render() {
    const isChecked = localStore.checked;
    return (
      <div className="commonVarianceDiv">
        <Checkbox label="Require Majority of Common Variance" onChange={ this.toggle } checked={ isChecked } />
      </div>
      );
  }
}

export default view(MajorityCommonVarianceCheckbox);

/*
label {
    font-size: 21px;
}

.commonVarianceDiv {
    margin-left: 55px;
}
*/
