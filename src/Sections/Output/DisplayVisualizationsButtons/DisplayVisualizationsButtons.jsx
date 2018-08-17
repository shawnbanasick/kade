import React from "react";
import { easyComp } from "react-easy-state";
import store from "../../store";
import { Button } from "semantic-ui-react";

// todo - change this back to normal button
// display rules prevent premature click now
class DisplayVisualizationsButtons extends React.Component {
  store = {};

  handleOpenVizOptions = () => {
    let shouldDisplayFactorVizOptions = store.getState(
      "shouldDisplayFactorVizOptions"
    );
    let shouldShow = !shouldDisplayFactorVizOptions;
    store.setState({
      shouldDisplayFactorVizOptions: shouldShow
    });
  };

  handleDisplayViz = () => {
    let displayFactorVisualizations = store.getState(
      "displayFactorVisualizations"
    );
    let shouldShow = !displayFactorVisualizations;
    store.setState({
      displayFactorVisualizations: shouldShow
    });
  };

  render() {
    let showDownloadOutputButtons = store.getState("showDownloadOutputButtons");
    if (showDownloadOutputButtons) {
      return (
        <div style={{ display: "flex" }}>
          <Button
            id="displayVisualizationsButton"
            className="instagram"
            size={"large"}
            style={{ marginTop: 50, marginBottom: 50 }}
            onClick={this.handleDisplayViz}
          >
            Display Visualizations of Composite Factors
          </Button>
          <Button
            id="viewVisualizationsDisplayOptions"
            size={"large"}
            style={{ marginTop: 50, marginLeft: 30, marginBottom: 50 }}
            onClick={this.handleOpenVizOptions}
          >
            View Visualization Display Options
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default easyComp(DisplayVisualizationsButtons);
