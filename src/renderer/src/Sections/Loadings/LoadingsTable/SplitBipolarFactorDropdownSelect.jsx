import React from 'react';

import { Dropdown } from 'semantic-ui-react';
import loadingState from '../../GlobalState/loadingState';
import { useTranslation } from 'react-i18next';
import getLoadingState from '../../GlobalState/getLoadingState';

const saveDropdownValueToState = (event, data) => {
  if (data === null || data === undefined) {
    return;
  }
  const factorToSplit = data.value;
  loadingState.factorToSplit = factorToSplit;
};

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();

  const getOptions = () => {
    let splitFactorsArray = getLoadingState('splitFactorsArray');
    let bipolarFactorsArray = getLoadingState('bipolarFactorsArray');

    if (bipolarFactorsArray.length > 0) {
      bipolarFactorsArray.forEach((item, index) => {
        splitFactorsArray = splitFactorsArray.filter((object) => object.value !== item);
      });
    }
    return splitFactorsArray;
  };

  const options = getOptions();
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ marginRight: 20, fontSize: 30 }}>
        {`${t('Select the factor to split')}: `}
      </span>
      <Dropdown
        placeholder={'?'}
        onChange={saveDropdownValueToState}
        openOnFocus
        button
        simple
        item
        options={options}
      />
    </div>
  );
};

export default InvertFactorDropdownSelect;
