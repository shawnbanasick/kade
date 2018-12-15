import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import store from "../../../store";

// todo - change this back to normal button
// display rules prevent premature click now
class DisplayVisualizationsButtons extends React.Component {
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
          <StyledWrapper>
            <Button id="displayVisualizationsButton" className="wrapper1" size={ "large" } style={ { marginTop: 50, marginBottom: 50 } } onClick={ this.handleDisplayViz }>
              Display Visualizations of Composite Factors
            </Button>
          </StyledWrapper>
        </div>
        );
    }
    return null;
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
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      margin-top: 3px;
    }
  }
`;

