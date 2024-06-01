import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import factorState from '../../GlobalState/factorState';

const CentroidSelectDropdown = () => {
  // getState

  const isDisabled = factorState((state) => state.disabledCentroidFactorButton);
  const numCentroidFactors = factorState((state) => state.numCentroidFactors);

  const updateNumCentroidFactors = factorState((state) => state.updateNumCentroidFactors);
  // const isDisabled = getFactorState('disabledCentroidFactorButton');
  // const numCentroidFactors = getFactorState('numCentroidFactors');

  const [localStore, setLocalStore] = useState({
    value: 7,
  });

  const saveDropdownValueToState = (event, data) => {
    updateNumCentroidFactors(data.value);
    setLocalStore({ value: data.value });
  };

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

  setLocalStore({ value: numCentroidFactors });

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          textAlign: 'center',
          marginRight: 10,
          height: 40,
          marginTop: 5,
          paddingTop: 6,
          fontSize: 22,
        }}
      >
        Extract
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }} color="black">
        <Dropdown
          id="centroidSelectDropdown"
          placeholder={'?'}
          defaultValue={localStore.value}
          onChange={saveDropdownValueToState}
          openOnFocus
          button
          simple
          disabled={isDisabled}
          size={'small'}
          item
          options={options}
          style={{
            border: '1px solid black',
            fontSize: 14,
            paddingBottom: 7,
            marginBottom: 5,
            height: 36,
          }}
        />
      </div>
    </div>
  );
};
export default CentroidSelectDropdown;
