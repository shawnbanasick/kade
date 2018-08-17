import currentDate1 from "../../Utils/currentDate1";
import currentTime1 from "../../Utils/currentTime1";
import store from "../../store";
import exportToCsv from "./exportToCsv";

const downloadCsvOutputFile = function() {
    let data = store.getState("outputData");

    let spacer = ["", "", ""];

    let newDataArray = [];
    for (let i = 0, iLen = data.length; i < iLen; i++) {
        for (let j = 0, jLen = data[i].length; j < jLen; j++) {
            newDataArray.push(data[i][j]);
        }
        newDataArray.push(spacer, spacer, spacer, spacer, spacer, spacer);
    }

    newDataArray.shift();

    let timeStamp = currentDate1() + "_" + currentTime1();
    let projectName = store.getState("projectName");
    let shouldIncludeTimestamp = store.getState("shouldIncludeTimestamp");

    let nameFile;
    if (shouldIncludeTimestamp === true) {
        nameFile = "KenQ_output_" + projectName + "_" + timeStamp + ".csv";
    } else {
        nameFile = "KenQ_output_" + projectName + ".csv";
    }

    exportToCsv(nameFile, newDataArray);
};

export default downloadCsvOutputFile;
