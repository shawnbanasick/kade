import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import createResultsXlsxFile from '../excelLogic/createResultsXlsxFile';
import fs from 'fs';

let JSZip = require('jszip');

const createResultsZipFile = async (dataContent) => {
  //   const { data, projectName, userSelectedFactors, powerSetDiffsNumber, textObject } = dataContent;
  //   console.log('createResultsZipFile called with dataContent:', dataContent.type);
  const projectName = dataContent.projectName || 'myProject';
  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  const excelFileBuffer = createResultsXlsxFile(dataContent.excel, true); // Pass true to indicate that we want the buffer for zipping

  // 3. Initialize JSZip and add the Excel buffer
  const zip = new JSZip();
  zip.file(`KADE_Results_${projectName}_${timeStamp}.xlsx`, excelFileBuffer, { binary: true });

  // 4. Generate the zip file (e.g., as a Node.js Buffer or Uint8Array)
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  // File Download

  let nameFile = `KADE_Results_${projectName}_${timeStamp}.zip`;

  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: nameFile,
    });

    if (!canceled && filePath) {
      //   await workbook.xlsx.writeFile(filePath);
      await fs.promises.writeFile(filePath, zipBuffer, { encoding: 'binary' });
      dialog.showMessageBoxSync({
        title: 'KADE Zip Results Export',
        type: 'info',
        message: `File saved to:`,
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    }
  } catch (err) {
    console.error('Error saving file:', err);
  }
};

export default createResultsZipFile;
