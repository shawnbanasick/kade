import React from "react";
import { view } from "react-easy-state";
import store from "../../../../store";
import ScatterPlot from "./ScatterPlot";
import ParticipantPopUp from "./ParticipantPopUp";
import ClockwiseButtons from "./ClockwiseButtons";
import RotationTable from "../rotationTable/RotationTable";
import RotationButtons from "../FactorSelect/RotationButtons";
import SaveRotationButton from "../FactorSelect/SaveRotationButton";

let widthHeight = window.innerWidth - 518 - 100;
if (widthHeight > 900) {
  widthHeight = 900;
}

const scatterPlotStyles = {
  width: widthHeight,
  height: widthHeight,
  padding: 50,
  marginBottom: 10
};

const degreesDivStyles = {
  width: "100%",
  height: 80,
  display: "flex",
  flexDirection: "row",
  // border: "2px solid yellow",
  marginTop: 20,
  marginBottom: 20,
  fontSize: ".9em"
};

const plotAndChartStyles = {
  width: "100%",
  display: "flex",
  height: "auto"
};

class ScatterPlotAndTableTransitionContainer extends React.Component {
  render() {
    const showScatterPlotTableDiv = store.getState("showScatterPlotTableDiv");
    const degreesText = `${store.getState("rotationDegrees")}\u00B0`;
    const data = store.getState("newRotationVectors");
    const leftContWidth = window.innerWidth - 518;
    const colDefs = store.getState("rotColDefsFactorTable");
    const rowData = store.getState("rotRowDataFactorTable");

    if (showScatterPlotTableDiv) {
      return (
        <div>
          <div id="degreesDiv" style={degreesDivStyles}>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  marginRight: 5,
                  fontSize: "22px",
                  marginBottom: 5,
                  marginTop: "auto"
                }}
              >
                Rotate axes
              </span>
              <div style={{ marginTop: "auto" }}>
                <RotationButtons />
              </div>
              <span
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 5,
                  marginTop: "auto",
                  fontSize: ".9em"
                }}
              >
                {" - "}
              </span>
              <div style={{ marginTop: "auto" }}>
                <ClockwiseButtons baselineData={this.props.baselineData} />
              </div>
              <span className="degreesTextStyles"> {degreesText} </span>
              <div style={{ marginTop: "auto" }}>
                <SaveRotationButton />
              </div>
            </div>
          </div>
          <div id="scatterPlotDiv" style={plotAndChartStyles}>
            <div style={{ width: leftContWidth }}>
              <ScatterPlot data={data} {...this.props} {...scatterPlotStyles} />
              <ParticipantPopUp />
            </div>
            <div id="rotFactorsTableDiv" style={{ width: 518 }}>
              <RotationTable colDefs={colDefs} rowData={rowData} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default view(ScatterPlotAndTableTransitionContainer);
