import { Dropdown } from 'semantic-ui-react';
import rotationState from '../../GlobalState/rotationState';
import loadingState from '../../GlobalState/loadingState';
import { useTranslation } from 'react-i18next';

const InvertFactorDropdownSelect = () => {
  const { t } = useTranslation();
  const updateFactorToInvert = loadingState((state) => state.updateFactorToInvert);
  const numFactorsKeptForRot = rotationState((state) => state.numFactorsKeptForRot);

  const saveDropdownValueToState = (event, data) => {
    const factorToInvert = data.value;
    updateFactorToInvert(factorToInvert);
  };

  const getOptions = () => {
    const options = [
      {
        key: 'factor1',
        text: '1',
        value: 1,
      },
      {
        key: 'factor2',
        text: '2',
        value: 2,
      },
      {
        key: 'factor3',
        text: '3',
        value: 3,
      },
      {
        key: 'factor4',
        text: '4',
        value: 4,
      },
      {
        key: 'factor5',
        text: '5',
        value: 5,
      },
      {
        key: 'factor6',
        text: '6',
        value: 6,
      },
      {
        key: 'factor7',
        text: '7',
        value: 7,
      },
      {
        key: 'factor8',
        text: '8',
        value: 8,
      },
    ];
    // shorten options list if using centroid
    options.length = +numFactorsKeptForRot;
    return options;
  };

  const options = getOptions();
  return (
    <div>
      <span style={{ marginRight: 20, fontSize: 30 }}>
        {`${t('Select the factor to invert')}: `}
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
