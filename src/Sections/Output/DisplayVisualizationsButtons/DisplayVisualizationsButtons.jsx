import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import state from "../../../store";

// todo - change this back to normal button
// display rules prevent premature click now
class DisplayVisualizationsButtons extends React.Component {
  handleDisplayViz() {
    const displayFactorVisualizations = state.getState(
      "displayFactorVisualizations"
    );
    const shouldShow = !displayFactorVisualizations;
    state.setState({
      displayFactorVisualizations: shouldShow
    });
  }

  render() {
    const showDownloadOutputButtons = state.getState(
      "showDownloadOutputButtons"
    );
    if (showDownloadOutputButtons) {
      return (
        <div style={ { display: "flex" } }>
          <StyledWrapper>
            <Button id="displayVisualizationsButton" className="wrapper1" size={ "large" } style={ { marginTop: 50, marginBottom: 50 } } onClick={ this.handleDisplayViz }>
              Display Composite Factors
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
      font-weight: 900;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      /* margin-top: 3px; */
    }
  }
`;
