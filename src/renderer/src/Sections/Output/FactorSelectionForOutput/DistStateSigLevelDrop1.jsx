import styled from 'styled-components';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import { useTranslation } from 'react-i18next';
import resetSection6 from '../../../Utils/resetSection6';

const SigLevelDropdown = () => {
  const { t } = useTranslation();
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const updateSliceValueDistStateSigLevelDrop1 = outputState(
    (state) => state.updateSliceValueDistStateSigLevelDrop1
  );
  const updateDistStateUpperValueText = outputState((state) => state.updateDistStateUpperValueText);
  const updateUserSelectedDistStateSigLevel1 = calcState(
    (state) => state.updateUserSelectedDistStateSigLevel1
  );
  const updateHighlightFactor1 = outputState((state) => state.updateHighlightFactor1);
  const updateHighlightFactor2 = outputState((state) => state.updateHighlightFactor2);
  const updateHighlightFactor3 = outputState((state) => state.updateHighlightFactor3);
  const updateHighlightFactor4 = outputState((state) => state.updateHighlightFactor4);
  const updateHighlightFactor5 = outputState((state) => state.updateHighlightFactor5);
  const updateHighlightFactor6 = outputState((state) => state.updateHighlightFactor6);
  const updateHighlightFactor7 = outputState((state) => state.updateHighlightFactor7);
  const updateHighlightFactor8 = outputState((state) => state.updateHighlightFactor8);
  const showOutputFactorSelection = outputState((state) => state.showOutputFactorSelection);
  const sigDropdownValue1 = outputState((state) => state.sigDropdownValue1);
  const updateSigDropdownValue1 = outputState((state) => state.updateSigDropdownValue1);

  const handleChange = (e) => {
    console.log('SigLevelDropdown handleChange value:', e.target.value);
    updateSigDropdownValue1(e.target.value);
    const lookupArray = [3.891, 3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44];
    const pValuesTextArray = [
      'P < 0.0001',
      'P < 0.0005',
      'P < 0.001',
      'P < 0.005',
      'P < 0.01',
      'P < 0.05',
      'P < 0.1',
      'P < 0.15',
    ];
    const sliceValue = lookupArray.indexOf(+e.target.value);
    const distStateUpperValueText = pValuesTextArray[sliceValue];

    updateHighlightFactor1(false);
    updateHighlightFactor2(false);
    updateHighlightFactor3(false);
    updateHighlightFactor4(false);
    updateHighlightFactor5(false);
    updateHighlightFactor6(false);
    updateHighlightFactor7(false);
    updateHighlightFactor8(false);

    resetSection6('output');
    // reset cache of factor viz data
    updateOutputForDataViz2([]);
    updateSliceValueDistStateSigLevelDrop1(sliceValue);
    updateDistStateUpperValueText(distStateUpperValueText);
    updateUserSelectedDistStateSigLevel1(+e.target.value);
  };

  if (showOutputFactorSelection) {
    return (
      <DropdownRow>
        <span>{`${t('Set distinguishing statements threshold 1')}:`}</span>
        <select onChange={handleChange} defaultValue={sigDropdownValue1}>
          <option value="3.891">P &lt; 0.0001</option>
          <option value="3.481">P &lt; 0.0005</option>
          <option value="3.291">P &lt; 0.001</option>
          <option value="2.807">P &lt; 0.005</option>
          <option value="2.575">P &lt; 0.01</option>
          <option value="1.96">P &lt; 0.05</option>
          <option value="1.645">P &lt; 0.1</option>
          <option value="1.44">P &lt; 0.15</option>
        </select>
      </DropdownRow>
    );
  }
  return null;
};

export default SigLevelDropdown;

const DropdownRow = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: baseline;

  span {
    font-size: 25px;
    margin-right: 5px;
  }

  select {
    font-size: 24px;
    height: 36px;
    width: 160px;
    border: 1px solid #d6dbe0;
    padding-left: 15px;
    background-color: #d6dbe0;
    border-radius: 4px;
  }
`;

/*

 <Dropdown
          style={{ border: '1px solid black', height: 36 }}
          onChange={handleChange}
          defaultValue={value}
          openOnFocus
          button
          simple
          item
          options={sigOptions}
        />

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

[3.891, 3.291, 2.575, 1.96, 1.645, 1.44]
80 = 1.28


*/
