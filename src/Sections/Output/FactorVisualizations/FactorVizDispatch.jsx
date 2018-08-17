import React from "react";
import store from "../../store";
import FactorViz from "./FactorViz";
import { easyComp } from "react-easy-state";
import refreshVizOptionsState from "./refreshVizOptionsState";
import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";

const styles = {
    width: "100%",
    height: 1200,
    padding: 30,
    margin: 10
};

// todo - need to calculate dynamic height here for styles

class FactorVizDispatch extends React.Component {
    refresh = () => {
        let userValues = refreshVizOptionsState();
        store.setState({
            factorVizOptions: userValues
        });
    };

    render() {
        let factorVizOptions = store.getState("factorVizOptions");
        let factorData = createFactorVizDataObjectForProps(factorVizOptions);
        let shouldDisplayFactorViz = store.getState("displayFactorVisualizations");

        if (shouldDisplayFactorViz) {
            return (
                <div>
                  { factorData.map((i, index) => {
                        return (
                            <div key={ index }>
                              <FactorViz key={ "viz" + index } {...factorData[index]} {...this.props} {...styles} />
                            </div>
                            );
                    }) }
                </div>
                );
        } else {
            return null;
        }
    }
}

export default easyComp(FactorVizDispatch);
