import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import { dialog } from 'electron';
import fs from 'fs';

const createCsvFile = async (dataContent) => {
  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  let nameFile = `KADE_results_${dataContent.projectName}_${timeStamp}.csv`;
  const data = dataContent.data;

  const files = await dialog.showSaveDialog({
    title: 'Save file as',
    defaultPath: `*/${nameFile}`,
    filters: [
      {
        name: 'CSV files',
        extensions: ['csv'],
      },
    ],
  });

  const filePath = files.filePath;

  // // catch dialog box cancel error
  if (filePath) {
    fs.writeFile(filePath, data, (err) => {
      if (err === undefined || err === null) {
        dialog.showMessageBoxSync({
          message: `The file has been saved to ${filePath}.`,
          buttons: ['OK'],
        });
      } else {
        console.log(err);
        dialog.showErrorBox('File Save Error', err.message);
      }
    });
  }
};

export default createCsvFile;
