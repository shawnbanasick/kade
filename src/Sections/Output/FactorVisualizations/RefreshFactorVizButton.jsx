import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import store from "../../../store";
import refreshVizOptionsState from "./refreshVizOptionsState";
import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";

// const styles = {
//     width: "100%",
//     height: 1200,
//     padding: 30,
//     margin: 10
// };

// todo - need to calculate dynamic height here for styles
const factorVizOptions = store.getState("factorVizOptions");

class RefreshFactorVizButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factorData: createFactorVizDataObjectForProps(factorVizOptions)
        };
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        console.log("refresh called");

        const userValues = refreshVizOptionsState();
        store.setState({
            factorVizOptions: userValues
        });

        this.setState({
            factorData: createFactorVizDataObjectForProps(userValues)
        });
    }

    render() {
        const shouldDisplayFactorVizOptions = store.getState(
            "shouldDisplayFactorVizOptions"
        );

        return (
            <Transition visible={ shouldDisplayFactorVizOptions } animation="fade" duration={ 1000 }>
              <div>
                <div style={ { marginTop: 50, marginBottom: 50, height: 100, display: "block" } }>
                  <StyledWrapper>
                    <Button id="refreshFactorVizButton" className="wrapper1" onClick={ this.refresh } size="huge" floated="left">
                      Update Factor Visualizations
                    </Button>
                  </StyledWrapper>
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
