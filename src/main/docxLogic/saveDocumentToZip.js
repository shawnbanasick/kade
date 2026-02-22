import fs from 'fs';
import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import { Packer } from 'docx';

let JSZip = require('jszip');

const saveZipToFile = async (
  doc,
  projectName = 'myProject',
  statements = [],
  sorts = [],
  multiplierArray = []
) => {
  // setup statements text output file
  let statementsTxt = '';
  for (let i = 0; i < statements.length; i++) {
    statementsTxt += statements[i].trim() + '\n';
  }

  // setup sorts text output file
  let sortsZipTxt = '';
  let sortsPartName;
  let sortsDisplayText;
  let mainDataObject = [...sorts];
  for (let i = 0; i < mainDataObject.length; i++) {
    sortsPartName = mainDataObject[i].name.trim();
    sortsDisplayText = mainDataObject[i].displaySort.trim();
    sortsZipTxt += sortsPartName + ',' + sortsDisplayText + '\n';
  }

  // naming information
  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  const shouldIncludeTimestamp = true;

  // for zipped docx file
  let nameDocx;
  if (shouldIncludeTimestamp === true) {
    nameDocx = `KADE_results_${projectName}_${timeStamp}.docx`;
  } else {
    nameDocx = `KADE_results_${projectName}.docx`;
  }

  let zipNameFile;
  if (shouldIncludeTimestamp === true) {
    zipNameFile = `KADE_results_${projectName}_${timeStamp}.zip`;
  } else {
    zipNameFile = `KADE_results_${projectName}.zip`;
  }

  let txtNameFile;
  if (shouldIncludeTimestamp === true) {
    txtNameFile = `(archive)_KADE_results_${projectName}_${timeStamp}.txt`;
  } else {
    txtNameFile = `(archive)_KADE_results_${projectName}.txt`;
  }

  // open dialog box to save file
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: zipNameFile,
    filters: [
      {
        name: 'zip',
        extensions: ['zip'],
      },
    ],
  });

  // error catch for dialog box cancel
  if (!canceled && filePath) {
    // blob all the things - to ensure utf-8 encoding for foreign languages
    let nameText = projectName.toString();

    (async () => {
      try {
        // Initialize the zip file
        const zip = new JSZip();

        // No BLOBS in Node.js
        const docBuffer = Packer.toBuffer(doc);

        // pack in the files
        zip.file('name.txt', nameText.toString().trim());
        zip.file('statements.txt', statementsTxt.toString().trim());
        zip.file('sorts.txt', sortsZipTxt.toString().trim());
        zip.file('pattern.txt', multiplierArray.toString().trim());
        zip.file(nameDocx, docBuffer, { binary: true });

        // Convert the zip file into a buffer
        let zipContent;
        if (JSZip.support.uint8array) {
          zipContent = await zip.generateAsync({ type: 'uint8array' });
        } else {
          zipContent = await zip.generateAsync({ type: 'string' });
        }

        // Save the zip file
        if (!canceled && filePath) {
          fs.writeFileSync(filePath, Buffer.from(zipContent));
          dialog.showMessageBoxSync({
            title: 'KADE',
            type: 'info',
            message: `File saved to:`,
            detail: `${filePath}`,
            buttons: ['OK'],
          });
        }
      } catch (err) {
        console.error('Error saving file:', err);
        dialog.showMessageBoxSync({
          title: 'KADE',
          type: 'error',
          message: 'Error saving file',
          detail: String(err),
          buttons: ['OK'],
        });
      }
    })().catch((err) => {
      console.error('Error saving file:', err);
      dialog.showMessageBoxSync({
        title: 'KADE',
        type: 'error',
        message: 'Error saving file',
        detail: String(err),
        buttons: ['OK'],
      });
    });
  }
};

export default saveZipToFile;
