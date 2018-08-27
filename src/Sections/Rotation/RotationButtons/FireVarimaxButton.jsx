import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import varimaxDispatch from "../varimaxLogic/varimaxDispatch";
import store from "../../../store";

class RotationButtonGroup extends Component {
    onVarimaxClick(event) {
        store.setState({
            rotationDegrees: 0
        });
        const userSelectedRotFactors = [];
        const abFactors = [];
        store.setState({
            highlightRotfactor1: false,
            highlightRotfactor2: false,
            highlightRotfactor3: false,
            highlightRotfactor4: false,
            highlightRotfactor5: false,
            highlightRotfactor6: false,
            highlightRotfactor7: false,
            highlightRotfactor8: false,
            userSelectedRotFactors,
            abFactors,
            showScatterPlotTableDiv: false,
            isCalculatingVarimax: true,
            varimaxButtonActive: true
        });
        setTimeout(() => {
            varimaxDispatch();
        }, 50);
    }


    render() {
        // const {active} = true;
        const shouldDisplay = store.getState("shouldDisplayFacKept");
        const varimaxButtonActive = store.getState("varimaxButtonActive");
        let varimaxButtonDisabled = store.getState("varimaxButtonDisabled");
        const varimaxButtonText = store.getState("varimaxButtonText");
        const isCalculatingVarimax = store.getState("isCalculatingVarimax");
        const isDisabled = store.getState("bipolarDisabled");

        if (varimaxButtonDisabled === true || isDisabled === true) {
            varimaxButtonDisabled = true;
        }

        if (shouldDisplay) {
            return (
                <div>
                  <Button id="pcaRotationButton" size={ "small" } toggle active={ varimaxButtonActive } loading={ isCalculatingVarimax } disabled={ varimaxButtonDisabled } onClick={ this.onVarimaxClick }>
                    { varimaxButtonText }
                  </Button>
                </div>
                );
        }
        return (
            <p style={ { fontSize: 22 } }>Select the number of factors to keep for rotation first.</p>
        )

    }
}

export default view(RotationButtonGroup);
