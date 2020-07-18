import React from "react";
import { view } from "react-easy-state";
import ScreePlot from "./ScreePlot";
import DownloadSvgButtons from "./DownloadSvgButtons";
import factorState from "../../GlobalState/factorState";
import coreState from "../../GlobalState/coreState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const styles = {
  width: 800,
  height: 600,
  padding: 80
};

const ScreeContainer = props => {
  const { t } = useTranslation();

  // get State and adjust if number of sorts is less than 8
  const data = clone(factorState.screePlotData);
  let maxLength = +factorState.numCentroidFactors;
  const numQsorts = coreState.numQsorts;
  if (numQsorts < maxLength) {
    maxLength = numQsorts;
  }
  // trim data from Horst
  data.length = maxLength;
  const numFactors = Number(factorState.numCentroidFactors) + 1;

  return (
    <React.Fragment>
      <h1>{t("Scree Plot")}</h1>
      <ScreePlot data={data} {...props} {...styles} numFacs={numFactors} />
      <div className="controls">
        <DownloadSvgButtons />
      </div>
    </React.Fragment>
  );
};

export default view(ScreeContainer);
