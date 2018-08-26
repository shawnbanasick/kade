import React from "react";
import styled from "styled-components";
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
      <JudgeTitleDiv id="outmostDiv">
        <div id="selectButton" style={selectButtonStyles}>
          <h1>Select 2 factors to rotate:</h1>
          <FactorSelectButtons baselineData={baselineData} />
        </div>
        <ScatterPlotAndTableTransitionContainer baselineData={baselineData} />
      </JudgeTitleDiv>
    );
  }
}

export default view(ScatterPlotDiv);

const JudgeTitleDiv = styled.div`
  width: 100%;
  height: 100%;
`;
