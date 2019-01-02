import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { ToastContainer, toast, Zoom } from "react-toastify";
import state from "../../../../store";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import FactorSelectButtons from "../FactorSelect/FactorSelectButtons";
import ScatterPlotAndTableTransitionContainer from "./ScatterPlotAndTableTransitionContainer";

// notification of table data sent to output
function notify() {
  toast.success("Rotation Data Saved to Loadings Table", {
    autoClose: 5000
  });
  state.setState({
    notifyForSavedRotation: false
  });
}

class ScatterPlotDiv extends React.Component {
  render() {
    const factorMatrix = state.getState("factorMatrix");
    const baselineData = transposeMatrix(factorMatrix);
    const notifyForSavedRotation = state.getState("notifyForSavedRotation");
    if (notifyForSavedRotation) {
      notify();
    }

    return (
      <JudgeTitleDiv id="outmostDiv">
        <FactorSelectionBar id="selectButton">
          <SelectLabel>Select factors:</SelectLabel>
          <FactorSelectButtons baselineData={baselineData} />
          <ToastContainer transition={Zoom} />
        </FactorSelectionBar>
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

const FactorSelectionBar = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 20px;
  height: 50px;
  width: 100%;
`;

const SelectLabel = styled.div`
  margin-right: 3px;
`;
