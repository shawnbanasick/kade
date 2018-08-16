import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Button, Dropdown, Transition } from "semantic-ui-react";
import FactorSelectButtonModal from "./FactorSelectButtonModal";

const saveDropdownValueToState = (event, data) => {
    let userSelectedRotFactors = [];
    let abFactors = [];

    


    store.setState({
        numFactorsKeptForRot: data.value,
        shouldDisplayFacKept: false,
        // hide section 5
        showLoadingsTable: false,
        // hide section 6
        showOutputFactorSelection: false,
        shouldDisplayFactorVizOptions: false,
        showFactorCorrelationsTable: false,
        showStandardErrorsDifferences: false,
        showFactorCharacteristicsTable: false,
        showDownloadOutputButtons: false,
        displayFactorVisualizations: false,
        userSelectedFactors: [],
        // reset bipolar
        bipolarDisabled: false,
        bipolarSplitCount: 0,
        // reset manual rotation
        shouldShowJudgeRotDiv: false,
        judgeButtonActive: false,
        showScatterPlotTableDiv: false,
        abFactors: abFactors,
        highlightRotfactor1: false,
        highlightRotfactor2: false,
        highlightRotfactor3: false,
        highlightRotfactor4: false,
        highlightRotfactor5: false,
        highlightRotfactor6: false,
        highlightRotfactor7: false,
        highlightRotfactor8: false,
        userSelectedRotFactors: userSelectedRotFactors,
        // reset varimax
        varimaxButtonDisabled: false,
        varimaxButtonText: "Varimax Rotation",
        varimaxButtonActive: false
    });
};

class FactorSelectDropdown extends React.Component {
    store = {};

    componentWillUpdate() {
        this.store.options = this.getOptions();
    }

    componentWillMount() {
        this.store.options = this.getOptions();
    }

    getOptions = () => {
        let isCentroid = store.getState("activeCentroidFactorsButton");
        let options = [
            {
                key: "factor1",
                text: "1",
                value: 1
            },
            {
                key: "factor2",
                text: "2",
                value: 2
            },
            {
                key: "factor3",
                text: "3",
                value: 3
            },
            {
                key: "factor4",
                text: "4",
                value: 4
            },
            {
                key: "factor5",
                text: "5",
                value: 5
            },
            {
                key: "factor6",
                text: "6",
                value: 6
            },
            {
                key: "factor7",
                text: "7",
                value: 7
            },
            {
                key: "factor8",
                text: "8",
                value: 8
            }
        ];
        // shorten options list if using centroid
        if (isCentroid) {
            let numCentroidFactors = store.getState("numCentroidFactors");
            options.length = +numCentroidFactors;
        }
        return options;
    };

    render() {
        const {options} = this.store;
        let showKeepFacForRotButton = store.getState("showKeepFacForRotButton");
        return (
            <Transition visible={ showKeepFacForRotButton } animation="fade" duration={ 1000 }>
              <div>
                <span style={ { marginRight: 20 } }>
                                                                                                                                    How many factors to keep for rotation?{ " " }
                                                                                                                                  </span>
                <Button.Group size={ "big" }>
                  <Dropdown id="factorSelectDropdown" placeholder={ "?" } onChange={ saveDropdownValueToState } openOnFocus={ true } button simple item options={ options }
                  />
                  <FactorSelectButtonModal />
                </Button.Group>
              </div>
            </Transition>
            );
    }
}
export default easyComp(FactorSelectDropdown);
