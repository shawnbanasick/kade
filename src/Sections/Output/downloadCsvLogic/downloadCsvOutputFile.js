import currentDate1 from "../../../Utils/currentDate1";
import currentTime1 from "../../../Utils/currentTime1";
import state from "../../../store";
import exportToCsv from "./exportToCsv";

const downloadCsvOutputFile = function() {
  const data = state.getState("outputData");

  const spacer = ["", "", ""];

  const newDataArray = [];
  for (let i = 0, iLen = data.length; i < iLen; i++) {
    for (let j = 0, jLen = data[i].length; j < jLen; j++) {
      newDataArray.push(data[i][j]);
    }
    newDataArray.push(spacer, spacer, spacer, spacer, spacer, spacer);
  }

  newDataArray.shift();

  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  const projectName = state.getState("projectName");
  const shouldIncludeTimestamp = state.getState("shouldIncludeTimestamp");

  let nameFile;
  if (shouldIncludeTimestamp === true) {
    nameFile = `KADE_results_${projectName}_${timeStamp}.csv`;
  } else {
    nameFile = `KADE_results_${projectName}.csv`;
  }

  exportToCsv(nameFile, newDataArray);
};

export default downloadCsvOutputFile;
