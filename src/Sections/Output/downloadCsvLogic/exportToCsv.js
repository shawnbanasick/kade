const exportToCsv = function(filename, rows) {
    var processRow = function(row) {
        var finalVal = "";
        for (var j = 0, jLen = row.length; j < jLen; j++) {
            var value = row[j];
            if (value === null || value === undefined) {
                value = "";
            }
            var innerValue = value.toString();
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0) {
                result = '"' + result + '"';
            }
            if (j > 0) {
                finalVal += ",";
            }
            finalVal += result;
        }
        return finalVal + "\n";
    };

    var csvFile = "";
    for (var i = 0, iLen = rows.length; i < iLen; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob(['\ufeff' + csvFile], {
        type: "text/CSV;charset=utf-8"
    });
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
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
