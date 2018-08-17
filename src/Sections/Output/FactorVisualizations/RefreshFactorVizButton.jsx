import React from "react";
import store from "../../store";
import { easyComp } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";
import refreshVizOptionsState from "./refreshVizOptionsState";

// const styles = {
//     width: "100%",
//     height: 1200,
//     padding: 30,
//     margin: 10
// };

// todo - need to calculate dynamic height here for styles
let factorVizOptions = store.getState("factorVizOptions");

class RefreshFactorVizButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factorData: createFactorVizDataObjectForProps(factorVizOptions)
        };
        this.refresh = this.refresh.bind(this);
    }

    refresh = () => {
        console.log("refresh called");

        let userValues = refreshVizOptionsState();
        store.setState({
            factorVizOptions: userValues
        });

        this.setState({
            factorData: createFactorVizDataObjectForProps(userValues)
        });
    };

    render() {
        let shouldDisplayFactorVizOptions = store.getState(
            "shouldDisplayFactorVizOptions"
        );

        return (
            <Transition visible={ shouldDisplayFactorVizOptions } animation="fade" duration={ 1000 }>
              <div>
                <div style={ { marginTop: 50, marginBottom: 50, height: 100, display: "block" } }>
                  <Button id="refreshFactorVizButton" onClick={ this.refresh } size="huge" className="instagram" floated="left">
                    Update Factor Visualizations
                  </Button>
                </div>
              </div>
            </Transition>
            );
    }
}

export default easyComp(RefreshFactorVizButton);
