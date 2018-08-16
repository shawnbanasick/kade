import store from "../../../store";
import React from "react";
import { easyComp } from "react-easy-state";
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
        let showScatterPlotTableDiv = store.getState("showScatterPlotTableDiv");
        let degreesText = store.getState("rotationDegrees") + "\u00B0";
        let data = store.getState("newRotationVectors");
        let leftContWidth = window.innerWidth - 518;
        let colDefs = store.getState("rotColDefsFactorTable");
        let rowData = store.getState("rotRowDataFactorTable");

        if (showScatterPlotTableDiv) {
            return (
                <div>
                  <div id="degreesDiv" style={ degreesDivStyles }>
                    <div style={ { display: "flex" } }>
                      <span style={ { marginRight: 5, fontSize: ".9em", marginBottom: 5, marginTop: "auto" } }>
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
                      <span className="degreesTextStyles"> { degreesText } </span>
                      <div style={ { marginTop: "auto" } }>
                        <SaveRotationButton />
                      </div>
                    </div>
                  </div>
                  <div id="scatterPlotDiv" style={ plotAndChartStyles }>
                    <div style={ { width: leftContWidth } }>
                      <ScatterPlot data={ data } {...this.props} {...scatterPlotStyles} />
                      <ParticipantPopUp />
                    </div>
                    <div id="rotFactorsTableDiv" style={ { width: 518 } }>
                      <RotationTable colDefs={ colDefs } rowData={ rowData } />
                    </div>
                  </div>
                </div>
                );
        } else {
            return null;
        }
    }
}

export default easyComp(ScatterPlotAndTableTransitionContainer);
