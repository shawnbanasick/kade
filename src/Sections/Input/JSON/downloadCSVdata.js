import store from "../../../store";
// import sanitizeUserInputText from "../../../Utils/sanitizeUserInputText";
const fs = require('fs');

const downloadCSVdata = function() {
  let csvBody2 = store.getState("csvData");

  // todo - find out what is adding the extra set of brackets around the data
  let csvBody = csvBody2[0];
  // let shouldIncludeTimestamp = store.getState("shouldIncludeTimestamp");
  let projectName = store.getState("projectName");

  // export the file
  exportToCsv(projectName + ".csv", csvBody);
};

const exportToCsv = function(filename, rows) {
  let processRow = function(row) {
    let finalVal = "";
    for (let j = 0; j < row.length; j++) {
      let value = row[j];
      if (value === null || value === undefined) {
        value = "";
      }
      let innerValue = value.toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = '"' + result + '"';
      }
      if (j > 0) {
        finalVal += ",";
      }
      finalVal += result;
    }
    console.log(finalVal);

    return finalVal + "\n";
  };

  let csvFile = "";
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  console.log(JSON.stringify(csvFile));


  fs.writeFile(__dirname + fileName, csvFile, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log('Its saved!');
    }
  });


  // let blob = new Blob([csvFile], {
  //   type: "text/CSV;charset=UTF-8;"
  // });
  // if (navigator.msSaveBlob) {
  //   // IE 10+
  //   navigator.msSaveBlob(blob, filename);
  // } else {
  //   let link = document.createElement("a");
  //   if (link.download !== undefined) {
  //     // feature detection
  //     // Browsers that support HTML5 download attribute
  //     let url = URL.createObjectURL(blob);
  //     link.setAttribute("href", url);
  //     link.setAttribute("download", filename);
  //     link.style.visibility = "hidden";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // }
};

export default downloadCSVdata;
