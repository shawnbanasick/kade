const transformExcelType2Ver2Statements = (statementsArray) => {
  let newStatementsArray = [];
  statementsArray[0].forEach((item) => {
    if (typeof item.Statements !== 'undefined') {
      let text = item.Statements.trim();
      newStatementsArray.push(text);
    }
  });
  return newStatementsArray;
};

export default transformExcelType2Ver2Statements;
