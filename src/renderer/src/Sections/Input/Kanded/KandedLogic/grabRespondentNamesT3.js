function grabRespondentNamesT3(data) {
  const qavRespondentNames2 = [];
  for (let jj = 1, jjLen = data.length; jj < jjLen; jj += 1) {
    const temp1 = data[jj][0];
    if (temp1 !== '') {
      qavRespondentNames2.push(temp1);
    }
  }
  const qavRespondentNames = qavRespondentNames2.slice(2);
  return qavRespondentNames;
}

export default grabRespondentNamesT3;
