import React from "react";
import store from "../../store";
import ScatterPlot from "./ScatterPlot";
import { easyComp } from "react-easy-state";
import DownloadSvgButtons from "./DownloadSvgButtons";

const styles = {
  width: 800,
  height: 600,
  padding: 80
};

class Chart extends React.Component {
  render() {
    let data = store.getState("screePlotData");
    return (
      <div style={{ maxWidth: 1197 }}>
        <h1>Scree Plot</h1>
        <ScatterPlot data={data} {...this.props} {...styles} />
        <div className="controls">
          <DownloadSvgButtons />
        </div>
      </div>
    );
  }
}

export default easyComp(Chart);
