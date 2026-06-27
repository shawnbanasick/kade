import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import ExcelJS from 'exceljs';

const createConExcelFile = async (dataContent) => {
  var datenum = function (v, date1904) {
    if (date1904) {
      v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  };

  const workbook = new ExcelJS.Workbook();

  // 1. name worksheet
  const nameWorksheet = workbook.addWorksheet('name');
  nameWorksheet.columns = [{ header: 'Project Name', key: 'pName', width: 50 }];
  const headerCell = nameWorksheet.getCell('A1');
  headerCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: '0000000' } };
  headerCell.alignment = { horizontal: 'center' };
  headerCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  const nameCell = nameWorksheet.getCell('A2');
  nameCell.font = { name: 'Arial', size: 16, bold: false, color: { argb: '000000' } };
  nameCell.alignment = { horizontal: 'center' };
  nameCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFEE8C' },
  };

  // 2. sorts worksheet
  const sortsWorksheet = workbook.addWorksheet('sorts');
  sortsWorksheet.columns = [
    { header: 'Participant Name and Statement Number', key: 'partName', width: 30 },
  ];
  const sortsHeaderCell = sortsWorksheet.getCell('A1');
  sortsHeaderCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: '0000000' } };
  sortsHeaderCell.alignment = { horizontal: 'center', wrapText: true };
  sortsHeaderCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  // 3. statements worksheet
  const statementsWorksheet = workbook.addWorksheet('statements');
  const stateNumColumn = statementsWorksheet.getColumn('A');

  stateNumColumn.width = 20;
  stateNumColumn.font = { name: 'Arial', size: 12, bold: false, color: { argb: '0000000' } };
  stateNumColumn.alignment = { horizontal: 'center' };
  stateNumColumn.values = [
    'Number',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  const stateRow1 = statementsWorksheet.getRow(1);
  stateRow1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  const cell2 = statementsWorksheet.getCell('B1');
  cell2.value = 'Statements';
  cell2.alignment = { horizontal: 'center' };
  const stateColumn2 = (statementsWorksheet.getColumn('B').width = 150);

  // 3. pattern worksheet
  const patternWorksheet = workbook.addWorksheet('pattern');
  const patternRow1 = patternWorksheet.getRow(1);
  for (let c = 1; c <= 20; c++) {
    const cell = patternRow1.getCell(c);
    cell.value = -7 + c;
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd1e5f2' },
    };
    cell.alignment = { horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }
  const patternRow2 = patternWorksheet.getRow(2);
  for (let d = 1; d <= 20; d++) {
    const cell2 = patternRow2.getCell(d);
    cell2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFEE8C' },
    };
    cell2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // EXAMPLE - sorts
  const exSortsWorksheet = workbook.addWorksheet('EXAMPLE-sorts');
  exSortsWorksheet.columns = [
    { header: 'Participant Name and Statement Number', key: 'partName', width: 30 },
  ];
  const exSortsHeaderCell = exSortsWorksheet.getCell('A1');
  exSortsHeaderCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: '0000000' } };
  // exSortsHeaderCell.alignment = { horizontal: "center", wrapText: true };
  exSortsHeaderCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  const exSortsColA = exSortsWorksheet.getColumn('A');
  exSortsColA.alignment = { horizontal: 'center', wrapText: true };
  exSortsColA.values = [
    'Respondent Name and Statement Number',
    -4,
    -4,
    -3,
    -3,
    -3,
    -2,
    -2,
    -2,
    -2,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    4,
    4,
  ];

  const exSortsColB = exSortsWorksheet.getColumn('B');
  exSortsColB.alignment = { horizontal: 'center', wrapText: true };
  exSortsColB.values = [
    'US1',
    16,
    20,
    17,
    18,
    30,
    3,
    5,
    31,
    32,
    1,
    8,
    10,
    15,
    19,
    2,
    4,
    7,
    9,
    26,
    6,
    11,
    12,
    24,
    25,
    13,
    22,
    28,
    29,
    14,
    21,
    23,
    27,
    33,
  ];

  const exSortsColC = exSortsWorksheet.getColumn('C');
  exSortsColC.alignment = { horizontal: 'center', wrapText: true };
  exSortsColC.values = [
    'US2',
    30,
    9,
    16,
    32,
    4,
    18,
    31,
    19,
    22,
    3,
    1,
    12,
    29,
    14,
    20,
    17,
    10,
    2,
    24,
    8,
    15,
    7,
    26,
    23,
    5,
    11,
    25,
    27,
    6,
    28,
    21,
    13,
    33,
  ];

  const exSortsColD = exSortsWorksheet.getColumn('D');
  exSortsColD.alignment = { horizontal: 'center', wrapText: true };
  exSortsColD.values = [
    'US3',
    10,
    7,
    16,
    8,
    11,
    22,
    3,
    2,
    25,
    30,
    18,
    31,
    5,
    28,
    29,
    20,
    15,
    23,
    6,
    9,
    19,
    27,
    21,
    33,
    1,
    14,
    17,
    24,
    12,
    26,
    13,
    32,
    4,
  ];

  const exSortsColE = exSortsWorksheet.getColumn('E');
  exSortsColE.alignment = { horizontal: 'center', wrapText: true };
  exSortsColE.values = [
    'US4',
    10,
    16,
    7,
    3,
    15,
    8,
    20,
    14,
    24,
    11,
    5,
    27,
    17,
    4,
    25,
    29,
    9,
    33,
    12,
    22,
    2,
    31,
    23,
    26,
    30,
    18,
    28,
    32,
    6,
    1,
    13,
    19,
    21,
  ];

  const exSortsColF = exSortsWorksheet.getColumn('F');
  exSortsColF.alignment = { horizontal: 'center', wrapText: true };
  exSortsColF.values = [
    'JP5',
    9,
    1,
    24,
    25,
    26,
    30,
    18,
    32,
    19,
    4,
    33,
    2,
    13,
    21,
    15,
    20,
    17,
    12,
    28,
    5,
    29,
    31,
    23,
    6,
    16,
    8,
    11,
    22,
    3,
    14,
    27,
    10,
    7,
  ];

  const exSortsColG = exSortsWorksheet.getColumn('G');
  exSortsColG.alignment = { horizontal: 'center', wrapText: true };
  exSortsColG.values = [
    'CA6',
    24,
    15,
    33,
    2,
    22,
    9,
    21,
    10,
    7,
    20,
    17,
    12,
    29,
    23,
    18,
    8,
    3,
    14,
    27,
    1,
    19,
    13,
    31,
    11,
    25,
    26,
    30,
    32,
    4,
    5,
    16,
    28,
    6,
  ];

  const exSortsColH = exSortsWorksheet.getColumn('H');
  exSortsColH.alignment = { horizontal: 'center', wrapText: true };
  exSortsColH.values = [
    'UK7',
    24,
    15,
    29,
    23,
    8,
    33,
    21,
    3,
    26,
    22,
    10,
    7,
    12,
    31,
    2,
    9,
    27,
    19,
    5,
    13,
    11,
    30,
    4,
    6,
    20,
    18,
    14,
    1,
    17,
    25,
    32,
    16,
    28,
  ];

  const exSortsColI = exSortsWorksheet.getColumn('I');
  exSortsColI.alignment = { horizontal: 'center', wrapText: true };
  exSortsColI.values = [
    'US8',
    27,
    5,
    19,
    4,
    25,
    31,
    30,
    1,
    32,
    8,
    10,
    12,
    9,
    14,
    29,
    3,
    7,
    17,
    16,
    26,
    13,
    11,
    20,
    18,
    33,
    21,
    22,
    2,
    24,
    23,
    28,
    15,
    6,
  ];

  const exSortsColJ = exSortsWorksheet.getColumn('J');
  exSortsColJ.alignment = { horizontal: 'center', wrapText: true };
  exSortsColJ.values = [
    'FR9',
    5,
    28,
    22,
    23,
    6,
    12,
    9,
    16,
    24,
    27,
    30,
    32,
    18,
    15,
    10,
    29,
    3,
    26,
    11,
    4,
    25,
    13,
    20,
    2,
    19,
    8,
    7,
    17,
    31,
    1,
    21,
    14,
    33,
  ];

  const exSortsColL = (exSortsWorksheet.getColumn('L').width = 100);
  const exSortsExplan1 = exSortsWorksheet.getCell('L2');
  exSortsExplan1.value = 'Do not change the blue cells';
  exSortsExplan1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exSortsExplan3 = exSortsWorksheet.getCell('L3');
  exSortsExplan3.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exSortsExplan4 = exSortsWorksheet.getCell('L4');
  exSortsExplan4.value =
    '1) add all of your possible sort values from lowest to highest in column A';
  exSortsExplan4.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exSortsExplan5 = exSortsWorksheet.getCell('L5');
  exSortsExplan5.value = '2) add participant names in row 1';
  exSortsExplan5.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exSortsExplan6 = exSortsWorksheet.getCell('L6');
  exSortsExplan6.value = '3) add participant sorts in columns';
  exSortsExplan6.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };

  // EXAMPLE - statements
  const exStatementsWorksheet = workbook.addWorksheet('EXAMPLE-statements');
  const exStateNumColumn = exStatementsWorksheet.getColumn('A');
  const exStateA1 = exStatementsWorksheet.getCell('A1');
  exStateA1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  const exStateB1 = exStatementsWorksheet.getCell('B1');
  exStateB1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  exStateNumColumn.width = 20;
  exStateNumColumn.font = { name: 'Arial', size: 12, bold: false, color: { argb: '0000000' } };
  exStateNumColumn.alignment = { horizontal: 'center' };
  exStateNumColumn.values = [
    'Number',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
  ];
  const exStateRow1 = statementsWorksheet.getRow(1);
  exStateRow1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };

  const exStateColumn2 = exStatementsWorksheet.getColumn('B');
  exStateColumn2.width = 80;
  exStateColumn2.values = [
    'Statements',
    'We accept improvements in status and power of lower class',
    'All men expected to try to improve selves',
    'Success in life by a previously deprived person is resented',
    'Men can expect fair treatment according to merit',
    'Lower-class not revolutionary',
    'Political goals relatively moderate, even conservative',
    'Those born to high place in society should retain it',
    'Person with wealth deserves place in high society',
    'We try to eliminate privileged classes',
    'We accept aristocratic-type titles and other honors',
    'The government has its secrets,  this is generally accepted',
    'Emphasis on publicity in political matters: no secrets',
    'Encouraged to think of ourselves as competing for success',
    'Social status equated with manner of speech',
    'We take law into our own hands,  mob action and vigilantes',
    'Close ties to Mother Country,  as Britain still is for many',
    'We prefer companionship and helping hand',
    'Some disdain for acquiring wealth for its own sake',
    'High value placed on protecting and promoting underdog',
    'We like the idea of a welfare state',
    'We value the race for success',
    'Corrupt means of achieving success are accepted',
    'One law for the rich, another for the poor',
    'Lack of respect for the police, and law enforcement',
    'Trust in police has sunk deeply into our national character',
    'Worth of a man is judged by what he is, not by education',
    'Deep respect for the rich, the educated',
    "We are tolerant of popular opinion, don't like extremes",
    'Poor on earth will enjoy higher status in after-life',
    'Respect for civil liberties and minority rights',
    'Virtue tends to be its own reward',
    'Position of depressed classes must be raised',
    'Emphasis is on getting ahead',
  ];
  const exCell2 = exStatementsWorksheet.getCell('B1');
  exCell2.alignment = { horizontal: 'center' };
  const exCell3 = exStatementsWorksheet.getCell('D4');
  exCell3.value = '1) One statement per line';
  exCell3.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exCol1 = exStatementsWorksheet.getColumn('D');
  exCol1.width = 30;

  // EXAMPLE - Pattern
  const exPatternWorksheet = workbook.addWorksheet('EXAMPLE-pattern');
  const exPatternRow1 = exPatternWorksheet.getRow(1);
  for (let c = 1; c <= 20; c++) {
    const exCell = exPatternRow1.getCell(c);
    exCell.value = -7 + c;
    exCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd1e5f2' },
    };
    exCell.alignment = { horizontal: 'center' };
    exCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }
  const exPatternRow2 = exPatternWorksheet.getRow(2);
  exPatternRow2.alignment = { horizontal: 'center' };
  exPatternRow2.values = [0, 0, 2, 3, 4, 5, 5, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let d = 1; d <= 20; d++) {
    const exCell2 = exPatternRow2.getCell(d);
    exCell2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFEE8C' },
    };
    exCell2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }
  const exPatternCellB5 = exPatternWorksheet.getCell('B5');
  exPatternCellB5.value = 'Do not change the blue cells';
  exPatternCellB5.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exPatternCellB6 = exPatternWorksheet.getCell('B6');
  exPatternCellB6.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exPatternCellB7 = exPatternWorksheet.getCell('B7');
  exPatternCellB7.value = '1) add the number of statements in each column';
  exPatternCellB7.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const exPatternCellB8 = exPatternWorksheet.getCell('B8');
  exPatternCellB8.value = '2) input a zero if there are no statements in that column';
  exPatternCellB8.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };

  // VERSION
  const versionWorksheet = workbook.addWorksheet('version');
  const verCellA1 = versionWorksheet.getCell('A1');
  verCellA1.value = 'Version';
  verCellA1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  verCellA1.alignment = { horizontal: 'center' };
  const verCellA2 = versionWorksheet.getCell('A2');
  verCellA2.value = 2;
  verCellA2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  verCellA2.alignment = { horizontal: 'center' };
  verCellA1.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
  verCellA2.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
  const verCellA5 = versionWorksheet.getCell('A5');
  verCellA5.value = 'Do not change the version number';
  verCellA5.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const verCellA6 = versionWorksheet.getCell('A6');
  verCellA6.value = 'Do not delete this sheet';
  verCellA6.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };

  // TYPE
  const typeWorksheet = workbook.addWorksheet('type');
  const typeCellA1 = typeWorksheet.getCell('A1');
  typeCellA1.value = 'Type';
  typeCellA1.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  typeCellA1.alignment = { horizontal: 'center' };
  const typeCellA2 = typeWorksheet.getCell('A2');
  typeCellA2.value = 1;
  typeCellA2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  typeCellA2.alignment = { horizontal: 'center' };
  typeCellA1.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
  typeCellA2.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
  const typeCellA5 = typeWorksheet.getCell('A5');
  typeCellA5.value = 'Do not change the type number';
  typeCellA5.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };
  const typeCellA6 = typeWorksheet.getCell('A6');
  typeCellA6.value = 'Do not delete this sheet';
  typeCellA6.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ffa500' },
  };

  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let nameFile = `KADE_Excel_Import_Type1_Template_${timeStamp}.xlsx`;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: nameFile,
  });

  if (!canceled && filePath) {
    try {
      await workbook.xlsx.writeFile(filePath);
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
export default createConExcelFile;
