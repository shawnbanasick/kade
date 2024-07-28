import XLSX from 'xlsx';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import { dialog } from 'electron';

const createXlsxFile = async (dataObj) => {
  //   console.log('createXlsxFile dataObj:', dataObj);

  var datenum = function (v, date1904) {
    if (date1904) {
      v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  };

  const projectName = dataObj.projectName;
  const data = [...dataObj.dataXlsx];
  const wsName = [...dataObj.sheetNamesXlsx];
  const wscols = [...dataObj.colSizes];

  function sheetFromArrayOfArrays(data) {
    const ws = {};
    const range = {
      s: {
        c: 10000000,
        r: 10000000,
      },
      e: {
        c: 0,
        r: 0,
      },
    };
    for (let R = 0; R !== data.length; ++R) {
      for (let C = 0; C !== data[R].length; ++C) {
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        const cell = {
          v: data[R][C],
        };
        if (cell.v === null) continue;
        const cell_ref = XLSX.utils.encode_cell({
          c: C,
          r: R,
        });

        if (typeof cell.v === 'number') cell.t = 'n';
        else if (typeof cell.v === 'boolean') cell.t = 'b';
        else if (cell.v instanceof Date) {
          cell.t = 'n';
          cell.z = XLSX.SSF._table[14];
          cell.v = datenum(cell.v);
        } else cell.t = 's';

        ws[cell_ref] = cell;
      }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);

    return ws;
  }

  function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
  }

  const wb = new Workbook();

  /* add worksheet to workbook */
  for (let i = 0; i < wsName.length; i += 1) {
    const ws = sheetFromArrayOfArrays(data[i]);
    ws['!cols'] = wscols[i];
    wb.SheetNames.push(wsName[i]);
    wb.Sheets[wsName[i]] = ws;
  }

  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let nameFile = `KADE_results_${projectName}_${timeStamp}.xlsx`;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: nameFile,
  });

  if (!canceled && filePath) {
    try {
      XLSX.writeFile(wb, filePath, { compression: true });
      dialog.showMessageBoxSync({
        title: 'KADE',
        type: 'info',
        message: `File saved to:`,
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    } catch (err) {
      console.error('Error saving file:', err);
    }
  }
};

export default createXlsxFile;
