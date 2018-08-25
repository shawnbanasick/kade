import React from "react";
// import "./ScatterPlotDiv.css";
import { view } from "react-easy-state";
import FactorSelectButtons from "../FactorSelect/FactorSelectButtons";
import ScatterPlotAndTableTransitionContainer from "./ScatterPlotAndTableTransitionContainer";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import store from "../../../../store";

// this.refs.child.parentNode.clientWidth
const selectButtonStyles = {
  width: "100",
  height: 100
  // border: "2px solid green"
};

class ScatterPlotDiv extends React.Component {
  render() {
    // store.setState({"rotPlotContainerWidth": leftContWidth});
    const factorMatrix = store.getState("factorMatrix");
    const baselineData = transposeMatrix(factorMatrix);

    return (
      <div id="outmostDiv" style={{ width: "100%" }}>
        <div id="selectButton" style={selectButtonStyles}>
          <h1>Select 2 factors to rotate:</h1>
          <FactorSelectButtons baselineData={baselineData} />
        </div>
        <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
      </div>
    );
  }
}

export default view(ScatterPlotDiv);
