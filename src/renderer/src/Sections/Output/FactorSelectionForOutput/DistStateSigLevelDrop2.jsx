import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import { view, store } from '@risingstack/react-easy-state';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const sigOptions = [
  {
    key: '99.95',
    value: 3.481,
    text: 'p < 0.0005', // text: "99.995%"
  },
  {
    key: '99.9',
    value: 3.291,
    text: 'p < 0.001', // text: "99.9%"
  },
  {
    key: '99.5',
    value: 2.807,
    text: 'p < 0.005', // text: "99.5%"
  },
  {
    key: '99',
    value: 2.575,
    text: 'p < 0.01', // text: "99%"
  },
  {
    key: '95',
    value: 1.96,
    text: 'p < 0.05', // text: "95%"
  },
  {
    key: '90',
    value: 1.645,
    text: 'p < 0.1', // text: "90%"
  },
  {
    key: '85',
    value: 1.44,
    text: 'p < 0.15', // text: "90%"
  },
  {
    key: '80',
    value: 1.28,
    text: 'p < 0.2', // text: "90%"
  },
];

const localStore = store({
  value: 1.96,
});

const SigLevelDropdown2 = () => {
  const { t } = useTranslation();

  const handleChange = (e, { value }) => {
    const btnId = getOutputState('outputButtonsArray');
    localStore.value = value;
    const lookupArray = [3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44, 1.28];
    const pValuesTextArray = [
      'P < 0.0005',
      'P < 0.001',
      'P < 0.005',
      'P < 0.01',
      'P < 0.05',
      'P < 0.1',
      'P < 0.15',
      'P < 0.2',
    ];
    const sliceValue = lookupArray.indexOf(value);
    const distStateLowerValueText = pValuesTextArray[sliceValue];

    // clear the select factor buttons on change
    for (let i = 0; i < btnId.length; i += 1) {
      outputState[`highlightfactor${btnId[i]}`] = false;
    }
    outputState.userSelectedFactors = [];
    outputState.showFactorCorrelationsTable = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.outputFactorSelectButtonsDisabled = false;
    outputState.showDocxOptions = false;
    // reset cache of factor viz data
    outputState.outputForDataViz2 = [];
    outputState.distStateLowerValueText = distStateLowerValueText;

    calcState.userSelectedDistStateSigLevel2 = value;
  };

  const value = localStore.value;
  const showOutputFactorSelection = getOutputState('showOutputFactorSelection');
  const sliceValueDistStateSigLevelDrop1 = outputState.sliceValueDistStateSigLevelDrop1;
  const sigOptionsSliced = sigOptions.slice(sliceValueDistStateSigLevelDrop1);

  if (showOutputFactorSelection) {
    return (
      <DropdownRow>
        <span>{`${t('Set distinguishing statements threshold 2')}:`}</span>
        <Dropdown
          style={{ border: '1px solid black', height: 36 }}
          onChange={handleChange}
          defaultValue={value}
          openOnFocus
          button
          simple
          item
          options={sigOptionsSliced}
        />
      </DropdownRow>
    );
  }
  return null;
};

export default SigLevelDropdown2;

const DropdownRow = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: baseline;

  span {
    font-size: 25px;
    margin-right: 5px;
  }
`;

/*
'Significance Threshold'
https://www.slideshare.net/zoubamohamed/table-values

99.99 = 3.891
99.9 = 3.291
99 = 2.575
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

98 = 2.33


  <Dropdown placeholder={ "?" } defaultValue={ 7 }  openOnFocus={ true } button simple item options={ options }

pqmethod = loading 'significant at p<.05'


.67	1.28	1.65	1.96	2.33	2.58	2.81	3.10	3.30	3.49	3.73	3.91

*/
