import { Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();
  let splitFactorsArray = loadingState((state) => state.splitFactorsArray);
  let bipolarFactorsArray = loadingState((state) => state.bipolarFactorsArray);
  const updateFactorToSplit = loadingState((state) => state.updateFactorToSplit);

  const saveDropdownValueToState = (event, data) => {
    if (data === null || data === undefined) {
      return;
    }
    const factorToSplit = data.value;
    updateFactorToSplit(factorToSplit);
  };

  const getOptions = () => {
    if (bipolarFactorsArray.length > 0) {
      bipolarFactorsArray.forEach((item) => {
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
