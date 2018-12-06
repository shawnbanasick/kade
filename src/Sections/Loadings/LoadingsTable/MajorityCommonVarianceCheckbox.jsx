import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import state from "../../../store";

// import '../LoadingsTable/MajorityCommonVarianceCheckbox.css';

const localStore = store({
  checked: true
});

class MajorityCommonVarianceCheckbox extends Component {
  toggle() {
    let requireMajorityCommonVariance = state.getState(
      "requireMajorityCommonVariance"
    );
    requireMajorityCommonVariance = !requireMajorityCommonVariance;
    state.setState({
      requireMajorityCommonVariance
    });

    localStore.checked = !localStore.checked;
  }

  render() {
    const isChecked = localStore.checked;
    return (
      <CommonVarianceDiv>
        <Checkbox
          label="Require Majority of Common Variance"
          onChange={this.toggle}
          checked={isChecked}
        />
      </CommonVarianceDiv>
    );
  }
}

export default view(MajorityCommonVarianceCheckbox);

const CommonVarianceDiv = styled.div`
  font-size: 21px;
  margin-left: 395px;
`;
