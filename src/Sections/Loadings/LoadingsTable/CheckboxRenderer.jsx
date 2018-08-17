import React from "react";
import store from "../../store";
import { Checkbox } from "semantic-ui-react";

class CheckboxRenderer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        this.props.data[this.props.colDef.field] = !this.props.data[
                this.props.colDef.field
        ];
        this.setState({
            value: this.props.data[this.props.colDef.field]
        });
        store.setState({
            showOutputFactorSelection: false,
            showFactorCorrelationsTable: false,
            showStandardErrorsDifferences: false,
            showFactorCharacteristicsTable: false,
            showDownloadOutputButtons: false,
            shouldDisplayFactorVizOptions: false,
            displayFactorVisualizations: false
        });
    }

    render() {
        return (
            <Checkbox checked={ this.state.value } onChange={ this.handleCheckboxChange } />
            );
    }
}

export default CheckboxRenderer;
