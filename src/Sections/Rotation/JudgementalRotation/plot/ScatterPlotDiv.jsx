import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import FactorSelectButtons from "../FactorSelect/FactorSelectButtons";
import ScatterPlotAndTableTransitionContainer from "./ScatterPlotAndTableTransitionContainer";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import store from "../../../../store";
import { ToastContainer, toast, Slide } from "react-toastify";

// notification of table data sent to output
function notify() {
  toast.success("Rotation Data Saved to Loadings Table", { autoClose: 5000 });
  store.setState({ notifyForSavedRotation: false });
}

class ScatterPlotDiv extends React.Component {
  render() {
    // store.setState({"rotPlotContainerWidth": leftContWidth});
    const factorMatrix = store.getState("factorMatrix");
    const baselineData = transposeMatrix(factorMatrix);
    const notifyForSavedRotation = store.getState("notifyForSavedRotation");
    if (notifyForSavedRotation) {
      notify();
    }

    return (
      <JudgeTitleDiv id="outmostDiv">
        <FactorSelectionBar id="selectButton">
          <SelectLabel>Select factors:</SelectLabel>
          <FactorSelectButtons baselineData={baselineData} />
          <ToastContainer transition={Slide} />
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
