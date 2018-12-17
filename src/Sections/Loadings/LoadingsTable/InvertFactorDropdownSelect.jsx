import React from "react";
import { Dropdown } from "semantic-ui-react";
import { view } from "react-easy-state";
import state from "../../../store";

const saveDropdownValueToState = (event, data) => {
  const factorToInvert = data.value;
  state.setState({
    factorToInvert
  });
};

class InvertFactorDropdownSelect extends React.Component {
  getOptions() {
    const options = [
      {
        key: "factor1",
        text: "1",
        value: 1
      },
      {
        key: "factor2",
        text: "2",
        value: 2
      },
      {
        key: "factor3",
        text: "3",
        value: 3
      },
      {
        key: "factor4",
        text: "4",
        value: 4
      },
      {
        key: "factor5",
        text: "5",
        value: 5
      },
      {
        key: "factor6",
        text: "6",
        value: 6
      },
      {
        key: "factor7",
        text: "7",
        value: 7
      },
      {
        key: "factor8",
        text: "8",
        value: 8
      }
    ];
    // shorten options list if using centroid
    const numFactorsKeptForRot = state.getState("numFactorsKeptForRot");
    options.length = +numFactorsKeptForRot;
    return options;
  }

  render() {
    const options = this.getOptions();
    return (
      <div>
        <span style={{ marginRight: 20, fontSize: 30 }}>
          Select the factor to invert:{" "}
        </span>
        <Dropdown
          placeholder={"?"}
          onChange={saveDropdownValueToState}
          openOnFocus
          button
          simple
          item
          options={options}
        />
      </div>
    );
  }
}
export default view(InvertFactorDropdownSelect);
