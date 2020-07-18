import currentDate1 from "../../../Utils/currentDate1";
import currentTime1 from "../../../Utils/currentTime1";
import exportToCsv from "./exportToCsv";
import coreState from '../../GlobalState/coreState';

import calcState from '../../GlobalState/calcState';
const clone = require('rfdc')()

const downloadCsvOutputFile = function() {
  const data = clone(calcState.outputData);

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
  // getState
  const projectName = coreState.projectName;
  const shouldIncludeTimestamp = calcState.shouldIncludeTimestamp;

  let nameFile;
  if (shouldIncludeTimestamp === true) {
    nameFile = `KADE_results_${projectName}_${timeStamp}.csv`;
  } else {
    nameFile = `KADE_results_${projectName}.csv`;
  }

  exportToCsv(nameFile, newDataArray);
};

export default downloadCsvOutputFile;
