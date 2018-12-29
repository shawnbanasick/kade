const fs = require("fs");
const { dialog } = require("electron").remote;

const exportToCsv = (fileName, rows) => {
  const processRow = row => {
    let finalVal = "";
    for (let j = 0, jLen = row.length; j < jLen; j += 1) {
      let value = row[j];
      if (value === null || value === undefined) {
        value = "";
      }
      const innerValue = value.toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${result}"`;
      }
      if (j > 0) {
        finalVal += ",";
      }
      finalVal += result;
    }
    return `${finalVal}\n`;
  };

  let csvFile = "";
  for (let i = 0, iLen = rows.length; i < iLen; i += 1) {
    csvFile += processRow(rows[i]);
  }

  const saveOptions = {
    defaultPath: `*/${fileName}`,
    filters: [
      {
        name: "csv",
        extensions: ["csv"]
      }
    ]
  };

  dialog.showSaveDialog(saveOptions, fileName => {
    // prevents an error when user selects cancel
    if (fileName === undefined) {
      // console.log("You didn't save the file");
      return;
    }

    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(fileName, csvFile, "utf-8", err => {
      if (err === undefined || err === null) {
        dialog.showMessageBox({
          message: "The file has been saved.",
          buttons: ["OK"]
        });
      } else {
        dialog.showErrorBox("File Save Error", err.message);
      }
    });
  });
};

export default exportToCsv;
