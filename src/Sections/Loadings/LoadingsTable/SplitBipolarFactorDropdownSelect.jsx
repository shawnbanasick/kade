import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Dropdown } from "semantic-ui-react";

const saveDropdownValueToState = (event, data) => {
    let factorToSplit = data.value;
    store.setState({
        factorToSplit: factorToSplit
    });
};

class InvertFactorDropdownSelect extends React.Component {
    store = {};

    componentWillUpdate() {
        this.store.options = this.getOptions();
    }

    componentWillMount() {
        this.store.options = this.getOptions();
    }

    getOptions = () => {
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
        let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");
        options.length = +numFactorsKeptForRot;

        return options;
    };

    render() {
        const {options} = this.store;
        return (
            <div style={ { display: "flex" } }>
              <span style={ { marginRight: 20, fontSize: 30 } }>Select the factor to split: </span>
              <Dropdown placeholder={ "?" } onChange={ saveDropdownValueToState } openOnFocus={ true } button simple item options={ options } />
            </div>
            );
    }
}
export default easyComp(InvertFactorDropdownSelect);
