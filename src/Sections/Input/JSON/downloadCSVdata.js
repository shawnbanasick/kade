import coreState from "../../GlobalState/coreState";
const fs = require("fs");
const { dialog } = require("electron").remote;
// needed to attach open dialog to mainWindow when opened
const { remote } = require("electron");
const mainWindow = remote.getCurrentWindow();

async function saveFile(fileName, csvFile) {
  const files = await dialog.showSaveDialog(mainWindow, {
    title: "Save file as",
    defaultPath: `*/${fileName}`,
    filters: [
      {
        name: "csv",
        extensions: ["csv"]
      }
    ]
  });

  const filePath = files.filePath;

  fs.writeFile(filePath, csvFile, err => {
    console.log(err);
    if (err === undefined || err === null) {
      dialog.showMessageBoxSync(mainWindow, {
        message: `The file has been saved to ${filePath}.`,
        buttons: ["OK"]
      });
    } else {
      dialog.showErrorBox("File Save Error", err.message);
    }
  });
}

function exportToCsv(fileName, rows) {
  const processRow = row => {
    let finalVal = "";
    for (let j = 0; j < row.length; j += 1) {
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
  for (let i = 0; i < rows.length; i += 1) {
    csvFile += processRow(rows[i]);
  }
  saveFile(fileName, csvFile);
}
function downloadCSVdata() {
  const csvBody2 = coreState.csvData;

  // todo - find out what is adding the extra set of brackets around the data
  const csvBody = csvBody2[0];
  let projectName = coreState.projectName;
  if (projectName === "") {
    projectName = "KADE-CSV_download_from_JSON_data";
  }

  console.log(projectName);
  const nameWithExtension = `${projectName}.csv`;

  // export the file
  exportToCsv(nameWithExtension, csvBody);
}
export default downloadCSVdata;
