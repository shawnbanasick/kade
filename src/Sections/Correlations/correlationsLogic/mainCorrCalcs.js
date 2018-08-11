import store from "../../../store";
// import { checkIfOnline } from "./checkIfOnline";
import { calculateCorrelations } from "./createCorrelations";
import workerCorr from "../../wrkrs/workerCorr";

export function mainCorrCalcs(respondentNames, rawSortsArray) {
  const isOnline = false;

  if (window.Worker && isOnline) {
    console.log("worker called");

    workerCorr();
  } else if (respondentNames.length > 0) {
    // $("#correlationsSpinner").append('<p id="spinnerText">&nbsp&nbsp Calculating, <i>please wait</i>&nbsp&nbsp</p>').fadeIn(300);

    // do the calcuations
    calculateCorrelations(rawSortsArray, respondentNames);

    // $("#correlationsSpinner").children("p").remove();
  }
  store.setState({
    showCorrelationMatrix: true,
    activeStartAnalysisButton: true,
    isLoadingBeginAnalysis: false
  });
}
