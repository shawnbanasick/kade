import { Packer } from 'docx';
// import { saveAs } from "file-saver";
import currentDate1 from '../../../Utils/currentDate1';
import currentTime1 from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';
import calcState from '../../GlobalState/calcState';

// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();
// const { dialog } = require('electron').remote;
// let fs = require('fs');

const saveDocumentToFile = async (doc, fileName) => {
  // Create new instance of Packer for the docx module

  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  const projectName = coreState.getState().projectName;

  // to create option for no timestamp - useful for automated testing
  const shouldIncludeTimestamp = calcState.getState().shouldIncludeTimestamp;

  let nameFile;
  if (shouldIncludeTimestamp === true) {
    nameFile = `KADE_results_${projectName}_${timeStamp}.docx`;
  } else {
    nameFile = `KADE_results_${projectName}.docx`;
  }

  // const path = await dialog.showSaveDialog(mainWindow, {
  //   title: 'Save file as',
  //   defaultPath: `*/${nameFile}`,
  //   filters: [
  //     {
  //       name: 'docx',
  //       extensions: ['docx'],
  //     },
  //   ],
  // });

  // error catch for dialog box cancel
  // const filePath = path.filePath;
  const defaultPath = `${nameFile}.docx`;
  const filepath = await window.electronAPI.showSaveDialog(defaultPath);
  if (!filepath) {
    alert('Save operation was canceled.');
    return;
  } else {
    /*
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      */

    try {
      Packer.toBuffer(doc).then((doc) => {
        window.electronAPI.saveSVG(doc, filepath);

        // const docblob = blob.slice(0, blob.size, mimeType);
        // Save the file using saveAs from the file-saver package
        // fs.writeFileSync(filePath, doc, (err) => {
        //   if (err) throw err;
        //   console.log('Unexpected file save error!');
        // });
      });
    } catch (error) {
      console.error('Failed to save file:', error);
    } finally {
      // dialog.showMessageBox(mainWindow, {
      //   message: `File saved to:`,
      //   detail: `${filePath}`,
      //   buttons: ['OK'],
      // });
    }
    /*
  // Create a mime type that will associate the new file with Microsoft Word
  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  // Create a Blob containing the Document instance and the mimeType
  Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    // Save the file using saveAs from the file-saver package
    saveAs(docblob, fileName);
  });
  */
  }
};

export default saveDocumentToFile;
