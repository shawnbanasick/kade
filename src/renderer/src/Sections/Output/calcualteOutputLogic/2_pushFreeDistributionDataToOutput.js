import calcState from '../../GlobalState/calcState';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';

const pushFreeDistributionDataToOutput = function (outputData, sheetNamesXlsx, colSizes) {
  sheetNamesXlsx.push(i18n.t('Free Dist'));

  const columns = [
    {
      wch: 10,
    },
    {
      wch: 20,
    },
    {
      wch: 10,
    },
    {
      wch: 10,
    },
  ];
  colSizes.push(columns);

  const freeDistributionArray = cloneDeep(calcState.getState().freeDistributionArray);

  freeDistributionArray.unshift(
    ['free', ''],
    ['', ''],
    [i18n.t('Free Distribution Data Results')],
    ['', '']
  );

  outputData.push(freeDistributionArray);

  console.log('dispatch - 8 - pushFreeDistributionData complete');
  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushFreeDistributionDataToOutput;
