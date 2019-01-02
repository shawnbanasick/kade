import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import state from "../../../store";

// todo - change this back to normal button
// display rules prevent premature click now
class DisplayVisualizationsButtons extends React.Component {
  handleOpenVizOptions() {
    const shouldDisplayFactorVizOptions = state.getState(
      "shouldDisplayFactorVizOptions"
    );
    const shouldShow = !shouldDisplayFactorVizOptions;
    state.setState({
      shouldDisplayFactorVizOptions: shouldShow
    });
  }

  render() {
    const showDownloadOutputButtons = state.getState(
      "showDownloadOutputButtons"
    );
    if (showDownloadOutputButtons) {
      return (
        <div style={{ display: "flex" }}>
          <StyledWrapper>
            <Button
              id="viewVisualizationsDisplayOptions"
              className="wrapper1"
              size={"large"}
              style={{ marginTop: 50, marginLeft: 30, marginBottom: 50 }}
              onClick={this.handleOpenVizOptions}
            >
              Display Visualization Display Options
            </Button>
          </StyledWrapper>
        </div>
      );
    }
    return (
      <h2 style={{ marginTop: 50, marginLeft: 50 }}>
        Select factors to output in the Options tab
      </h2>
    );
  }
}

export default view(DisplayVisualizationsButtons);

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
      font-weight: 900;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      /* margin-top: 3px; */
    }
  }
`;
