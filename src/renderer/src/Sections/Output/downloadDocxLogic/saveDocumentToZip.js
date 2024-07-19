import { Packer } from 'docx';
import currentDate1 from '../../../Utils/currentDate1';
import currentTime1 from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';
import calcState from '../../GlobalState/calcState';

const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();
const { dialog } = require('electron').remote;
let fs = require('fs');
let JsZip = require('jszip');

const saveZipToFile = async (doc, fileName) => {
  // setup text output file
  const data = calcState.getState().outputData;
  const spacer = '\n\n\n';
  const newDataArray = [];
  for (let i = 0, iLen = data.length; i < iLen; i++) {
    for (let j = 0, jLen = data[i].length; j < jLen; j++) {
      newDataArray.push(data[i][j].toString() + '\n');
    }
    newDataArray.push(spacer, spacer, spacer, spacer, spacer, spacer);
  }
  newDataArray.shift();

  // setup statements text output file
  let statements = coreState.getState().statements;
  let statementsTxt = '';
  for (let i = 0; i < statements.length; i++) {
    statementsTxt += statements[i] + '\n';
  }

  // setup sorts text output file
  let sortsZipTxt = '';
  let sortsPartName;
  let sortsDisplayText;
  let mainDataObject = coreState.getState().mainDataObject;
  for (let i = 0; i < mainDataObject.length; i++) {
    sortsPartName = mainDataObject[i].name.trim();
    sortsDisplayText = mainDataObject[i].displaySort.trim();
    sortsZipTxt += sortsPartName + ',' + sortsDisplayText + '\n';
  }

  // naming information
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

  const path = await dialog.showSaveDialog(mainWindow, {
    title: 'Save file as',
    defaultPath: `*/${zipNameFile}`,
    filters: [
      {
        name: 'zip',
        extensions: ['zip'],
      },
    ],
  });

  const filePath = path.filePath;
  // error catch for dialog box cancel
  if (filePath) {
    // blob all the things - to ensure utf-8 encoding for foreign languages
    let zipBlob = Packer.toBlob(doc);
    let statementsBlob = new Blob([statementsTxt], {
      type: 'text/plain;charset=utf-8',
    });
    let nameBlob = new Blob([coreState.getState().projectName], {
      type: 'text/plain;charset=utf-8',
    });
    let sortsBlob = new Blob([sortsZipTxt], {
      type: 'text/plain;charset=utf-8',
    });
    let multiplierArrayTxt = coreState.getState().multiplierArray.toString();
    let textResultsBlob = new Blob([newDataArray], {
      type: 'text/plain;charset=utf-8',
    });

    (async () => {
      try {
        // Initialize the zip file
        const zip = new JsZip();

        // pack in the files
        nameFile = nameFile.toString();
        zip.file(nameFile, zipBlob);
        zip.file('name.txt', nameBlob);
        zip.file('statements.txt', statementsBlob);
        zip.file('sorts.txt', sortsBlob);
        zip.file('pattern.txt', multiplierArrayTxt);
        zip.file(txtNameFile, textResultsBlob);

        // Convert the zip file into a buffer
        const generatedZip = await zip.generateAsync({ type: 'nodebuffer' });

        // Save the zip file
        fs.writeFileSync(filePath, generatedZip, (err) => {
          if (err) throw err;
          console.log('Unexpected file save error!');
        });
      } catch (error) {
        console.log(error);
      }
    })();

    dialog.showMessageBox(mainWindow, {
      message: `File saved to:`,
      detail: `${filePath}`,
      buttons: ['OK'],
    });
  }
};

export default saveZipToFile;
