import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import createResultsXlsxFile from '../excelLogic/createResultsXlsxFile';
import exportDocx from '../docxLogic/exportDocx';
import fs from 'fs';

let JSZip = require('jszip');

const createResultsZipFile = async (dataContent) => {
  const projectName = dataContent.projectName || 'myProject';
  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  const excelFileBuffer = await createResultsXlsxFile(dataContent?.excel, true); // Pass true to indicate that we want the buffer for zipping
  const docBuffer = await exportDocx(dataContent?.word, true); // Pass true to indicate that we want the buffer for zipping

  const textOutputFiles = dataContent?.text || {};

  // 3. Initialize JSZip and add the Excel buffer
  const zip = new JSZip();
  zip.file(`KADE_Results_${projectName}_${timeStamp}.xlsx`, excelFileBuffer, { binary: true });
  zip.file(`KADE_Results_${projectName}_${timeStamp}.docx`, docBuffer, { binary: true });
  zip.file('name.txt', textOutputFiles.name || 'myProject');
  zip.file('statements.txt', textOutputFiles.statements || '');
  zip.file('sorts.txt', textOutputFiles.sorts || '');
  zip.file('pattern.txt', textOutputFiles.pattern || '');
  zip.file(`KADE_Results_${projectName}_${timeStamp}.svg`, dataContent.screeSvg1 || '');
  if (dataContent.screePng1) {
    zip.file(`KADE_Results_${projectName}_${timeStamp}.png`, dataContent.screePng1, {
      base64: true,
    });
  }
  if (dataContent.screeDrawio1) {
    if (Array.isArray(dataContent.screeDrawio1)) {
      dataContent.screeDrawio1.forEach((item) => {
        zip.file(item.name, item.drawio || '');
      });
    }
  }
  // zip.file(`KADE_Results_${projectName}_${timeStamp}.png`, dataContent.screePng1 || '');

  // 4. Generate the zip file (e.g., as a Node.js Buffer or Uint8Array)
  let zipContent;
  if (JSZip.support.uint8array) {
    zipContent = await zip.generateAsync({ type: 'uint8array' });
  } else {
    zipContent = await zip.generateAsync({ type: 'string' });
  }
  //   const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  // File Download
  let nameFile = `KADE_Results_${projectName}_${timeStamp}.zip`;

  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: nameFile,
    });

    if (!canceled && filePath) {
      await fs.promises.writeFile(filePath, zipContent, { encoding: 'binary' });
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
