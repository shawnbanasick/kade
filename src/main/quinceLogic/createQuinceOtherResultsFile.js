import generateExcelFile from './generateExcelFile';

const createQuinceOtherResultsFile = (dataContent) => {
  // Placeholder function for creating Quince other results file
  console.log('Data received for Quince other results file:', JSON.stringify(dataContent.data));
  console.log('Creating Quince other results file...');

  generateExcelFile(dataContent);

  //  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  //   let nameFile = `KADE_results_${dataContent.projectName}_${timeStamp}.csv`;
  //   const data = dataContent.data;

  //   const files = await dialog.showSaveDialog({
  //     title: 'Save file as',
  //     defaultPath: `*/${nameFile}`,
  //     filters: [
  //       {
  //         name: 'CSV files',
  //         extensions: ['csv'],
  //       },
  //     ],
  //   });

  //   const filePath = files.filePath;

  //   // // catch dialog box cancel error
  //   if (filePath) {
  //     fs.writeFile(filePath, data, (err) => {
  //       if (err === undefined || err === null) {
  //         dialog.showMessageBoxSync({
  //           message: `The file has been saved to ${filePath}.`,
  //           buttons: ['OK'],
  //         });
  //       } else {
  //         console.log(err);
  //         dialog.showErrorBox('File Save Error', err.message);
  //       }
  //     });
  //   }
  // };
};

export default createQuinceOtherResultsFile;
