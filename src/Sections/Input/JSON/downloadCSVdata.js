import store from "../../../store";

const fs = require('fs');
const {dialog} = require("electron").remote;


function saveFile(fileName, csvFile) {

  dialog.showSaveDialog({
    filters: [
      {
        name: 'csv',
        extensions: ['csv']
      }
    ]
  }, (fileName) => {

    if (fileName === undefined) return;

    fs.writeFile(fileName, csvFile, (err) => {
      if (err === undefined || err === null) {
        dialog.showMessageBox({
          message: "The file has been saved!",
          buttons: ["OK"]
        });

      } else {
        dialog.showErrorBox("File Save Error", err.message);
      }
    });
  });
}

function exportToCsv(fileName, rows) {
  const processRow = function(row) {
    let finalVal = "";
    for (let j = 0; j < row.length; j++) {
      let value = row[j];
      if (value === null || value === undefined) {
        value = "";
      }
      const innerValue = value.toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${  result  }"`;
      }
      if (j > 0) {
        finalVal += ",";
      }
      finalVal += result;
    }
    console.log(finalVal);

    return `${finalVal  }\n`;
  };

  let csvFile = "";
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  saveFile(fileName, csvFile);
}
;

function downloadCSVdata() {
  const csvBody2 = store.getState("csvData");

  // todo - find out what is adding the extra set of brackets around the data
  const csvBody = csvBody2[0];
  // let shouldIncludeTimestamp = store.getState("shouldIncludeTimestamp");
  const projectName = store.getState("projectName");

  const nameWithExtension = `${projectName}.csv`;

  // export the file
  exportToCsv(nameWithExtension, csvBody);
}
;

export default downloadCSVdata;
