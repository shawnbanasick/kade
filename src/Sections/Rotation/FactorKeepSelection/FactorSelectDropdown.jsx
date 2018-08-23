import React from "react";
import { view, store } from "react-easy-state";
import { Button, Dropdown, Transition } from "semantic-ui-react";
import FactorSelectButtonModal from "./FactorSelectButtonModal";
import state from "../../../store";

const saveDropdownValueToState = (event, data) => {
  const userSelectedRotFactors = [];
  const abFactors = [];

  state.setState({
    numFactorsKeptForRot: data.value,
    shouldDisplayFacKept: false,
    // hide section 5
    showLoadingsTable: false,
    // hide section 6
    showOutputFactorSelection: false,
    shouldDisplayFactorVizOptions: false,
    showFactorCorrelationsTable: false,
    showStandardErrorsDifferences: false,
    showFactorCharacteristicsTable: false,
    showDownloadOutputButtons: false,
    displayFactorVisualizations: false,
    userSelectedFactors: [],
    // reset bipolar
    bipolarDisabled: false,
    bipolarSplitCount: 0,
    // reset manual rotation
    shouldShowJudgeRotDiv: false,
    judgeButtonActive: false,
    showScatterPlotTableDiv: false,
    abFactors,
    highlightRotfactor1: false,
    highlightRotfactor2: false,
    highlightRotfactor3: false,
    highlightRotfactor4: false,
    highlightRotfactor5: false,
    highlightRotfactor6: false,
    highlightRotfactor7: false,
    highlightRotfactor8: false,
    userSelectedRotFactors,
    // reset varimax
    varimaxButtonDisabled: false,
    varimaxButtonText: "Varimax Rotation",
    varimaxButtonActive: false
  });
};

// const localStore = store({ options: [] });

function getOptions() {
  const isCentroid = state.getState("activeCentroidFactorsButton");
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
  if (isCentroid) {
    const numCentroidFactors = state.getState("numCentroidFactors");
    options.length = +numCentroidFactors;
  }
  return options;
}

class FactorSelectDropdown extends React.Component {
  // componentWillUpdate() {
  //   this.state.options = this.getOptions();
  // }

  // componentDidMount() {
  //   localStore.options = this.getOptions();
  // }

  render() {
    const options = getOptions();
    // let showKeepFacForRotButton = store.getState("showKeepFacForRotButton");
    return (
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: 20 }}>
          How many factors to keep for rotation?{" "}
        </span>

        <Dropdown
          id="factorSelectDropdown"
          placeholder={"?"}
          onChange={saveDropdownValueToState}
          openOnFocus
          button
          simple
          item
          options={options}
        />
        <FactorSelectButtonModal />
      </div>
    );
  }
}
export default view(FactorSelectDropdown);