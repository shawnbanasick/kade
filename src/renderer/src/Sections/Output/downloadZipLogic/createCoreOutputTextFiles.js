const createCoreOutputTextFiles = (mainDataObject, statements, projectName, multiplierArray) => {
  // create statements text output file
  let statementsTxt = '';
  for (let i = 0; i < statements.length; i++) {
    statementsTxt += statements[i].trim() + '\n';
  }

  // create project name text output file
  let nameText = projectName?.toString()?.trim() || 'myProject';

  // create pattern text output file
  let multiplierArrayText = multiplierArray?.toString()?.trim() || '';

  // setup sorts text output file
  let sortsZipTxt = '';
  let sortsPartName;
  let sortsDisplayText;
  for (let i = 0; i < mainDataObject.length; i++) {
    sortsPartName = mainDataObject[i].name.trim();
    sortsDisplayText = mainDataObject[i].displaySort.trim();
    sortsZipTxt += sortsPartName + ',' + sortsDisplayText + '\n';
  }

  return {
    name: nameText,
    statements: statementsTxt,
    sorts: sortsZipTxt,
    pattern: multiplierArrayText,
  };
};

export default createCoreOutputTextFiles;
