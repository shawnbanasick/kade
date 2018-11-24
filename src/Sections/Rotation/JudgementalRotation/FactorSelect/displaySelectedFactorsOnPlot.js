import data from "../plot/data";
import store from "../../../../store";
import doD3ChartDataPrep from "../rotationLogic/doD3ChartDataPrep";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";

const displaySelectedFactorsOnPlot = function() {
  const tempRotFacStateArray = store.getState("tempRotFacStateArray");
  // let tempRotFacStateArray = store.getState("factorMatrix");

  // expects bare full array - required to calc significance level for circles
  const arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray);

  // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
  calculatefSigCriterionValues("flag");

  // returns dataValuesArray for D3 chart
  const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);
  store.setState({
    d3RotChartData: d3Prep
  }); // drawD3Chart(d3Prep);

  // call to update D3 plot data
  data();
};

export default displaySelectedFactorsOnPlot;
