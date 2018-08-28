import React from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import store from "../../../store";

// todo - change this back to normal button
// display rules prevent premature click now
class DisplayVisualizationsButtons extends React.Component {
    // constructor(props) {
    //   super(props);

    //   store = {};
    // }

    handleOpenVizOptions() {
        const shouldDisplayFactorVizOptions = store.getState(
            "shouldDisplayFactorVizOptions"
        );
        const shouldShow = !shouldDisplayFactorVizOptions;
        store.setState({
            shouldDisplayFactorVizOptions: shouldShow
        });
    }

    handleDisplayViz() {
        const displayFactorVisualizations = store.getState(
            "displayFactorVisualizations"
        );
        const shouldShow = !displayFactorVisualizations;
        store.setState({
            displayFactorVisualizations: shouldShow
        });
    }

    render() {
        const showDownloadOutputButtons = store.getState(
            "showDownloadOutputButtons"
        );
        if (showDownloadOutputButtons) {
            return (
                <div style={ { display: "flex" } }>
                  <Button id="displayVisualizationsButton" size={ "large" } style={ { marginTop: 50, marginBottom: 50 } } onClick={ this.handleDisplayViz }>
                    Display Visualizations of Composite Factors
                  </Button>
                  <Button id="viewVisualizationsDisplayOptions" size={ "large" } style={ { marginTop: 50, marginLeft: 30, marginBottom: 50 } } onClick={ this.handleOpenVizOptions }>
                    View Visualization Display Options
                  </Button>
                </div>
                );
        }
        return null;
    }
}

export default view(DisplayVisualizationsButtons);
