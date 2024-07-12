import coreState from '../../GlobalState/coreState';
import correlationState from '../../GlobalState/correlationState';
import i18n from 'i18next';

const pushCorrelationArray = function (outputData, sheetNamesXlsx, colSizes) {
  sheetNamesXlsx.push(i18n.t('Correlation Matrix'));
  // getState
  const correlationMatrix = correlationState.getState().correlationTableArray;
  const respondentNames = coreState.getState().respondentNames;

  // to add respondent names to matrix
  for (let i = 0, iLen = correlationMatrix.length; i < iLen; i++) {
    correlationMatrix[i].unshift(respondentNames[i]);
  }

  // to get max respondent name length
  let respondentNameMaxLength = 0;
  for (let j = 0, jLen = respondentNames.length; j < jLen; j++) {
    const temp1 = respondentNames[j].length;
    if (temp1 > respondentNameMaxLength) {
      respondentNameMaxLength = temp1;
    }
  }
  if (respondentNameMaxLength < 5) {
    respondentNameMaxLength = 5;
  }

  // to set up column spacing
  const columns = [];
  for (let j = 0, jLen = correlationMatrix[0].length + 1; j < jLen; j++) {
    columns.push({
      wch: respondentNameMaxLength,
    });
  }
  colSizes.push(columns);

  // to format table header correctly
  respondentNames.unshift(i18n.t('Participant'));

  // to add headers to table display
  correlationMatrix.unshift(
    ['correlations', ''],
    ['', ''],
    [i18n.t('Correlations between Q sorts')],
    ['', ''],
    respondentNames
  );
  outputData.push(correlationMatrix);

  console.log('dispatch - 4 - pushCorrelations complete');
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushCorrelationArray;
