import evenRound from '../../../Utils/evenRound';
import i18n from 'i18next';
import factorState from '../../GlobalState/factorState';

const pushCumComMaxtrixToOutputArray = function (outputData, sheetNamesXlsx, colSizes) {
  sheetNamesXlsx.push(i18n.t('Cumul Comm Matrix'));

  // isolate data
  const cumulCommMatrix9 = factorState.getState().unrotatedFactorMatrixOutput;

  // set excel column widths
  const columns = [
    {
      wch: 12,
    },
  ];
  for (let ii = 0, iiLen = cumulCommMatrix9[0].length; ii < iiLen; ii++) {
    columns.push({
      wch: 8,
    });
  }
  colSizes.push(columns);

  // get rid of eigenvalue and exp var rows
  // let explnVarRow = cumulCommMatrix9.pop();
  // cumulCommMatrix9.pop();
  // cumulCommMatrix9.pop();
  const responderHeadersRow = cumulCommMatrix9.shift();

  // add respondent names and do rounding
  for (let i = 0; i < cumulCommMatrix9.length; i++) {
    // respondentName = cumulCommMatrix9[i].shift();
    for (let j = 2; j < cumulCommMatrix9[i].length; j++) {
      if (j === 2) {
        const temp1 = cumulCommMatrix9[i][j];
        cumulCommMatrix9[i][j] = evenRound(temp1 * temp1, 4);
      } else {
        const temp1 = cumulCommMatrix9[i][j];
        cumulCommMatrix9[i][j] = evenRound(temp1 * temp1 + cumulCommMatrix9[i][j - 1], 4);
      }
    }
    // cumulCommMatrix9[i].unshift(respondentName);
  }
  cumulCommMatrix9.unshift(responderHeadersRow);

  // getState - add cumulative explained variance
  const explnVarRow = factorState.getState().cumulEigenPerVar;
  explnVarRow.splice(1, 0, '');
  cumulCommMatrix9.push(['', ''], explnVarRow);

  // add to output
  // output.push(cumulCommMatrix9);

  // format for excel
  // cumulCommMatrix9[0][0] = "Participant";
  cumulCommMatrix9.unshift(
    ['cumulative', ''],
    ['', ''],
    [i18n.t('Cumulative Communalities Matrix')],
    ['', '']
  );
  outputData.push(cumulCommMatrix9);

  console.log('dispatch - 6 - pushCumComMatrix complete');
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushCumComMaxtrixToOutputArray;
