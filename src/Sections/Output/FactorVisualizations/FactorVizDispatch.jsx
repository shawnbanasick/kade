import React from "react";
import { view } from "react-easy-state";
import store from "../../../store";
import FactorViz from "./FactorViz";
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
  refresh() {
    const userValues = refreshVizOptionsState();
    store.setState({
      factorVizOptions: userValues
    });
  }

  render() {
    const factorVizOptions = store.getState("factorVizOptions");
    const factorData = createFactorVizDataObjectForProps(factorVizOptions);
    const shouldDisplayFactorViz = store.getState("displayFactorVisualizations");

    if (shouldDisplayFactorViz) {
      return (
        <div>
          {factorData.map((i, index) => (
              <div key={index}>
                <FactorViz
                  key={`viz${  index}`}
                  {...factorData[index]}
                  {...this.props}
                  {...styles}
                />
              </div>
            ))}
        </div>
      );
    } 
      return null;
    
  }
}

export default view(FactorVizDispatch);
