const exportToCsv = function(filename, rows) {
  const processRow = function(row) {
    let finalVal = "";
    for (let j = 0, jLen = row.length; j < jLen; j++) {
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
    return `${finalVal  }\n`;
  };

  let csvFile = "";
  for (let i = 0, iLen = rows.length; i < iLen; i++) {
    csvFile += processRow(rows[i]);
  }

  // var blob = new Blob(['\ufeff' + csvFile], {
  //     type: "text/csv;charset=utf-8"
  // });
  const blob = new Blob([`\uFEFF${  csvFile}`], {
    type: "text/csv; charset=utf-8"
  });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export default exportToCsv;
