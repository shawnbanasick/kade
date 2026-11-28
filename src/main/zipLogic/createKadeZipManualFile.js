import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import fs from 'fs';

let JSZip = require('jszip');

const createKKadeZipManualFile = async (dataContent) => {
  const projectName = dataContent.data.name || 'myProject';
  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let multiplierArrayText = dataContent?.data?.columnCounts?.toString()?.trim() || '';

  let statementsText = '';
  if (dataContent?.data?.statements && Array.isArray(dataContent.data.statements)) {
    statementsText = dataContent.data.statements.join('\n');
  }

  let sortsText = '';
  if (dataContent?.data?.sortValues && Array.isArray(dataContent.data.sortValues)) {
    dataContent.data.sortValues.forEach((sort, index) => {
      sortsText += `${dataContent?.data?.participantNames[index] || `Participant ${index + 1}`}, ${sort.join(', ')}\n`;
    });
  }

  // 3. Initialize JSZip and add the Excel buffer
  const zip = new JSZip();

  // ** OUTPUT FILES ** //

  // ** BASE DATA ** //
  zip.file('name.txt', projectName || 'myProject');
  zip.file('statements.txt', statementsText || '');
  zip.file('sorts.txt', sortsText || '');
  zip.file('pattern.txt', multiplierArrayText || '');

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
  let nameFile = `KADE_Manual_Input_Data_${projectName}_${timeStamp}.zip`;

  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: nameFile,
    });

    // if (!canceled || !filePath) {
    //   return 'cancelled';
    // }

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

    // return 'success';
  } catch (err) {
    console.error('Error saving file:', err);
  }
};

export default createKKadeZipManualFile;
