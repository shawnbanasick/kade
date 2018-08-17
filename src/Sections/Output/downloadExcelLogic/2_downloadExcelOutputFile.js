import * as XLSX from "xlsx";
import store from "../../store";
import { saveAs } from "filesaver.js-npm";
import currentDate1 from "../../Utils/currentDate1";
import currentTime1 from "../../Utils/currentTime1";

const downloadExcelOutputFile = function(dataXlsx, sheetNamesXlsx, colSizes) {

  var data = dataXlsx;
  var ws_name = sheetNamesXlsx;
  var wscols = colSizes;

  function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {
      s: {
        c: 10000000,
        r: 10000000
      },
      e: {
        c: 0,
        r: 0
      }
    };
    for (var R = 0; R !== data.length; ++R) {
      for (var C = 0; C !== data[R].length; ++C) {
        if (range.s.r > R)
          range.s.r = R;
        if (range.s.c > C)
          range.s.c = C;
        if (range.e.r < R)
          range.e.r = R;
        if (range.e.c < C)
          range.e.c = C;
        var cell = {
          v: data[R][C]
        };
        if (cell.v === null) continue;
        var cell_ref = XLSX.utils.encode_cell({
          c: C,
          r: R
        });

        if (typeof cell.v === "number")
          cell.t = "n";
        else if (typeof cell.v === "boolean")
          cell.t = "b";
        else if (cell.v instanceof Date) {
          cell.t = "n";
          cell.z = XLSX.SSF._table[14];
          cell.v = XLSX.datenum(cell.v);
        } else
          cell.t = "s";

        ws[cell_ref] = cell;
      }
    }
    if (range.s.c < 10000000)
      ws["!ref"] = XLSX.utils.encode_range(range);

    return ws;
  }

  function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
  }

  var wb = new Workbook();

  /* add worksheet to workbook */
  for (var i = 0; i < ws_name.length; i++) {
    var ws = sheet_from_array_of_arrays(data[i]);
    ws["!cols"] = wscols[i];
    wb.SheetNames.push(ws_name[i]);
    wb.Sheets[ws_name[i]] = ws;
  }

  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary"
  });

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  var timeStamp = currentDate1() + "_" + currentTime1();
  var projectName = store.getState("projectName");

  // to create option for no timestamp - useful for automated testing
  let shouldIncludeTimestamp = store.getState("shouldIncludeTimestamp");

  let nameFile;
  if (shouldIncludeTimestamp === true) {
    nameFile = "KenQ_output_" + projectName + "_" + timeStamp + ".xlsx";
  } else {
    nameFile = "KenQ_output_" + projectName + ".xlsx";
  }

  saveAs(
    new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }),
    nameFile
  );
};

export default downloadExcelOutputFile;
