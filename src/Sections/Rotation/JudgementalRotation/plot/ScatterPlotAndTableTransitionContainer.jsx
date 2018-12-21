import React from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../../../store";
import ScatterPlot from "./ScatterPlot";
import ParticipantPopUp from "./ParticipantPopUp";
import ClockwiseButtons from "./ClockwiseButtons";
import RotationTable from "../rotationTable/RotationTable";
import RotationButtons from "../FactorSelect/RotationButtons";
import SaveRotationButton from "../FactorSelect/SaveRotationButton";

// sets scatterplot width and height
function getWidthHeight() {
  let widthHeight = window.innerWidth - 518 - 200;
  if (widthHeight > 1100) {
    widthHeight = 1100;
  }
  return widthHeight;
}

const localStore = store({
  width: getWidthHeight(),
  height: getWidthHeight()
});

window.addEventListener("resize", () => {
  const size = getWidthHeight();
  localStore.width = size;
  localStore.height = size;
});

const scatterPlotStyles = {
  padding: 30,
  marginBottom: 10
};

const degreesDivStyles = {
  width: "100%",
  height: 60,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  marginTop: 5,
  marginBottom: 20,
  fontSize: ".9em"
};

class ScatterPlotAndTableTransitionContainer extends React.Component {

  componentDidMount() {
    window.addEventListener("resize", () => {
      const size = getWidthHeight();
      localStore.width = size;
      localStore.height = size;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      const size = getWidthHeight();
      localStore.width = size;
      localStore.height = size;
    });
  }



  render() {
    const showScatterPlotTableDiv = state.getState("showScatterPlotTableDiv");
    const degreesText = `${state.getState("rotationDegrees")}\u00B0`;
    const data = state.getState("newRotationVectors");
    const leftContWidth = window.innerWidth - 558;
    const colDefs = state.getState("rotColDefsFactorTable");
    const rowData = state.getState("rotRowDataFactorTable");

    if (showScatterPlotTableDiv) {
      return (
        <div>
          <div id="degreesDiv" style={ degreesDivStyles }>
            <div style={ { display: "flex" } }>
              <span style={ { marginRight: 5, fontSize: "22px", marginBottom: 5, marginTop: "auto" } }>
                        Rotate axes
                      </span>
              <div style={ { marginTop: "auto" } }>
                <RotationButtons />
              </div>
              <span style={ { marginLeft: 5, marginRight: 5, marginBottom: 5, marginTop: "auto", fontSize: ".9em" } }>
                        { " - " }
                      </span>
              <div style={ { marginTop: "auto" } }>
                <ClockwiseButtons baselineData={ this.props.baselineData } />
              </div>
              <DegreesText>
                { " " }
                <p>
                  { degreesText }
                </p>
              </DegreesText>
              <div style={ { marginTop: "auto" } }>
                <SaveRotationButton />
              </div>
            </div>
          </div>
          <PlotAndChartDiv id="scatterPlotDiv">
            <div style={ { width: leftContWidth } }>
              <ParticipantPopUp />
              <ScatterPlot data={ data } width={ localStore.width } height={ localStore.height + 20 } {...this.props} {...scatterPlotStyles} />
            </div>
            <div id="rotFactorsTableDiv" style={ { width: 518 } }>
              <RotationTable colDefs={ colDefs } maxHeight={ localStore.height } rowData={ rowData } />
            </div>
          </PlotAndChartDiv>
        </div>
        );
    }
    return null;
  }
}

export default view(ScatterPlotAndTableTransitionContainer);

const DegreesText = styled.div`
  text-align: center;
  height: 60px;
  font-size: 50px;
  width: 105px;
  margin-left: 17px;
  margin-right: 17px;
`;

const PlotAndChartDiv = styled.div`
  display: flex;
  width: auto;
  height: auto;
  /* border: 2px solid purple; */
`;
