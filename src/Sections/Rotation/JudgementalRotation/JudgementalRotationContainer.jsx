import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Transition } from 'semantic-ui-react';
import ScatterPlotDiv from "./plot/ScatterPlotDiv";

const getStyles = () => {
    let widthHeight = window.innerWidth - 518 + 125;
    if (widthHeight > 900) {
        widthHeight = 1200;
    }
    let styles = {
        width: "100",
        maxWidth: 1400,
        height: widthHeight,
        // border: "2px solid purple",
        marginTop: 50,
        display: "flex"
    };
    return styles;
};

// window.onresize = function() {
//   widthHeight();
// };

class judgementalRotationContainer extends Component {
    render() {
        let shouldShowJudgeRotDiv = store.getState("shouldShowJudgeRotDiv");
        return (
            <Transition visible={ shouldShowJudgeRotDiv } animation="fade" duration={ 1000 }>
              <div>
                <div style={ getStyles() }>
                  <ScatterPlotDiv />
                </div>
              </div>
            </Transition>
            );
    }
}

export default easyComp(judgementalRotationContainer);
