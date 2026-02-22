import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';
import JSZip from 'jszip';

async function openZipFile() {
  const options = {
    properties: ['openFile'],
    title: 'Open ZIP File',
    filters: [
      {
        name: 'Zip',
        extensions: ['zip', 'ZIP'],
      },
    ],
  };

  // Capture the window reference BEFORE the dialog opens
  const window = BrowserWindow.getFocusedWindow();

  if (!window) {
    console.error('No focused window found');
    return;
  }

  dialog
    .showOpenDialog(window, options)
    .then(async (result) => {
      if (!result.canceled) {
        try {
          const fileBuffer = Buffer.from(fs.readFileSync(result.filePaths[0]));
          const zip = await JSZip.loadAsync(fileBuffer);

          const files = {};
          for (const name of Object.keys(zip.files)) {
            const entry = zip.files[name];

            if (entry.dir) continue;
            // exclude binary files like DOCX
            if (!name.endsWith('.txt')) continue;

            files[name] = await entry.async('string');
          }
          window.webContents.send('zipData', files);
        } catch (err) {
          console.error('Error processing zip file:', err);
        }
      }
    })
    .catch((err) => {
      console.error('Dialog error:', err);
    });
}

export default openZipFile;
