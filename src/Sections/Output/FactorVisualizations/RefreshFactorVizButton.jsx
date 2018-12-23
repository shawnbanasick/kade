import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import state from "../../../store";

class RefreshFactorVizButton extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    const factorVizOptions = state.getState("factorVizOptions");
    const factorVizOptionsHolder = state.getState("factorVizOptionsHolder");
    const updateKeys = Object.keys(factorVizOptionsHolder);

    for (let i = 0; i < updateKeys.length; i += 1) {
      factorVizOptions[updateKeys[i]] = factorVizOptionsHolder[updateKeys[i]];
    }

    state.setState({
      factorVizOptions,
      factorVizOptionsHolder: {},
      updateFactorVisualizationsButtonColor: "rgba(144,	238,	144, .6)"
    });
  }

  render() {
    const shouldDisplayFactorVizOptions = state.getState(
      "shouldDisplayFactorVizOptions"
    );
    const updateFactorVisualizationsButtonColor = state.getState(
      "updateFactorVisualizationsButtonColor"
    );

    return (
      <Transition
        visible={shouldDisplayFactorVizOptions}
        animation="fade"
        duration={1000}
      >
        <div>
          <RefreshButtonContainerDiv>
            <RefreshButton
              id="refreshFactorVizButton"
              className="wrapper1"
              onClick={this.refresh}
              size="huge"
              floated="left"
              buttonColor={updateFactorVisualizationsButtonColor}
            >
              Update Factor Visualizations
            </RefreshButton>
          </RefreshButtonContainerDiv>
        </div>
      </Transition>
    );
  }
}

export default view(RefreshFactorVizButton);

const RefreshButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 40px;
  width: 240px;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  border: 1px solid black;
  box-shadow: 0 2px 2px 0 black;
  outline: none;
  user-select: none;

  &:hover {
    background-color: ${props => props.buttonColor};
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;

const RefreshButtonContainerDiv = styled.div`
  margin-top: 10px;
  /* margin-top: ${props => `${props.marginTop}px`}; */
  /* margin-bottom: ${props => `${props.marginBottom}px`}; */
  margin-bottom: 10px;
  display: block;
`;
