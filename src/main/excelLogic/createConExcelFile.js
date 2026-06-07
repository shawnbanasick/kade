import { dialog } from 'electron';
import ExcelJS from 'exceljs';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';

const createConExcelFile = async (dataContent) => {
  console.log('createConExcelFile dataContent:', dataContent);

  var datenum = function (v, date1904) {
    if (date1904) {
      v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  };

  const projectName = dataContent.projectName;
  // const data = [...dataContent.dataXlsx];

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Content');
  worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
  ];

  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let nameFile = `KADE_Consensus_Statements_${projectName}_${timeStamp}.xlsx`;

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
