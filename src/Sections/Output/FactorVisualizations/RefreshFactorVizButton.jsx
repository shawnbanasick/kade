import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import state from "../../../store";
// import refreshVizOptionsState from "./refreshVizOptionsState";
// import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";
// const styles = {
//     width: "100%",
//     height: 1200,
//     padding: 30,
//     margin: 10
// };

// todo - need to calculate dynamic height here for styles
// const factorVizOptions = state.getState("factorVizOptions");

// const localStore = store({
//   factorData: createFactorVizDataObjectForProps(factorVizOptions)
// });

class RefreshFactorVizButton extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   factorData: createFactorVizDataObjectForProps(factorVizOptions)
    // };

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    console.log("refresh called");

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

    // const userValues = refreshVizOptionsState();
    // state.setState({
    //   factorVizOptions: userValues
    // });

    // // createFactorVizDataObjectForProps(userValues);

    // this.setState({
    //   factorData: createFactorVizDataObjectForProps(userValues)
    // });
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
          <div
            style={{
              marginTop: 50,
              marginBottom: 50,
              height: 100,
              display: "block"
            }}
          >
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
          </div>
        </div>
      </Transition>
    );
  }
}

export default view(RefreshFactorVizButton);

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

  &:hover {
    background-color: ${props => props.buttonColor};
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
    /* margin-top: 3px; */
    /* background-color: rgba(144, 238, 144, 0.6); */
  }
`;
