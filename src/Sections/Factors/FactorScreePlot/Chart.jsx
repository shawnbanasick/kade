import React from "react";
import { view } from "react-easy-state";
import state from "../../../store";
import ScatterPlot from "./ScatterPlot";
import DownloadSvgButtons from "./DownloadSvgButtons";

const styles = {
  width: 800,
  height: 600,
  padding: 80
};

class Chart extends React.Component {
  render() {
    const data = state.getState("screePlotData");
    return (
      <div style={ { maxWidth: 1197 } }>
        <h1>Scree Plot</h1>
        <ScatterPlot data={ data } {...this.props} {...styles} />
        <div className="controls">
          <DownloadSvgButtons />
        </div>
      </div>
      );
  }
}

export default view(Chart);
