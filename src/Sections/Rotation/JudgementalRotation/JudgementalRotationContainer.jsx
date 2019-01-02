import React, { Component } from "react";
import { view } from "react-easy-state";
// import { Transition } from "semantic-ui-react";
import ScatterPlotDiv from "./plot/ScatterPlotDiv";
import state from "../../../store";

const getStyles = () => {
  // let widthHeight = window.innerWidth - 518 + 125;
  // if (widthHeight > 900) {
  //   widthHeight = 1200;
  // }
  const styles = {
    width: "100%",
    maxWidth: 1800,
    height: "100%",
    // border: "2px solid purple",
    marginTop: 10,
    display: "flex"
  };
  return styles;
};

// window.onresize = function() {
//   widthHeight();
// };

// const localStore = store({mainWidth: 500, mainHeight: 500});

class judgementalRotationContainer extends Component {
  render() {
    const shouldShowJudgeRotDiv = state.getState("shouldShowJudgeRotDiv");

    return (
      <div>
        {shouldShowJudgeRotDiv ? (
          <div style={getStyles()}>
            <ScatterPlotDiv />
          </div>
        ) : null}
      </div>
    );
  }
}

export default view(judgementalRotationContainer);
