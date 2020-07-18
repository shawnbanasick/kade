import React from "react";
import { view } from "react-easy-state";
import FactorViz from "./FactorViz";
import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";

import outputState from "../../GlobalState/outputState";
import vizState from "../../GlobalState/vizState";
const clone = require("rfdc")();

const styles = {
  width: "100%",
  height: 1200,
  padding: 30,
  margin: 10
};

// todo - need to calculate dynamic height here for styles

const FactorVizDispatch = props => {
  // getState
  const factorVizOptions = clone(vizState.factorVizOptions);
  const factorData = createFactorVizDataObjectForProps(factorVizOptions);
  const shouldDisplayFactorViz = outputState.displayFactorVisualizations;

  if (shouldDisplayFactorViz) {
    return (
      <div>
        {factorData.map((i, index) => (
          <div key={`key${index.toString()}`}>
            <FactorViz
              key={`viz${index}`}
              {...factorData[index]}
              {...props}
              {...styles}
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default view(FactorVizDispatch);
