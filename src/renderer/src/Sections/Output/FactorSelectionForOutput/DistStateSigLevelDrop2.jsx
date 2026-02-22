import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import { useTranslation } from 'react-i18next';
import resetSection6 from '../../../Utils/resetSection6';

const SigLevelDropdown2 = () => {
  const { t } = useTranslation();
  const sigDropdownValue2 = outputState((state) => state.sigDropdownValue2);
  const updateSigDropdownValue2 = outputState((state) => state.updateSigDropdownValue2);
  const updateHighlightFactor1 = outputState((state) => state.updateHighlightFactor1);
  const updateHighlightFactor2 = outputState((state) => state.updateHighlightFactor2);
  const updateHighlightFactor3 = outputState((state) => state.updateHighlightFactor3);
  const updateHighlightFactor4 = outputState((state) => state.updateHighlightFactor4);
  const updateHighlightFactor5 = outputState((state) => state.updateHighlightFactor5);
  const updateHighlightFactor6 = outputState((state) => state.updateHighlightFactor6);
  const updateHighlightFactor7 = outputState((state) => state.updateHighlightFactor7);
  const updateHighlightFactor8 = outputState((state) => state.updateHighlightFactor8);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const updateDistStateLowerValueText = outputState((state) => state.updateDistStateLowerValueText);
  const updateUserSelectedDistStateSigLevel2 = calcState(
    (state) => state.updateUserSelectedDistStateSigLevel2
  );
  const showOutputFactorSelection = outputState((state) => state.showOutputFactorSelection);
  const sliceValueDistStateSigLevelDrop1 = outputState(
    (state) => state.sliceValueDistStateSigLevelDrop1
  );

  const sigOptions = [
    <option key="3.891" value="3.891">
      P &lt; 0.0001
    </option>,
    <option key="3.481" value="3.481">
      P &lt; 0.0005
    </option>,
    <option key="3.291" value="3.291">
      P &lt; 0.001
    </option>,
    <option key="2.807" value="2.807">
      P &lt; 0.005
    </option>,
    <option key="2.575" value="2.575">
      P &lt; 0.01
    </option>,
    <option key="1.96" value="1.96">
      P &lt; 0.05
    </option>,
    <option key="1.645" value="1.645">
      P &lt; 0.1
    </option>,
    <option key="1.44" value="1.44">
      P &lt; 0.15
    </option>,
    <option key="1.28" value="1.28">
      P &lt; 0.2
    </option>,
  ];

  const handleChange = (e) => {
    updateSigDropdownValue2(e.target.value);
    const value = +e.target.value;
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

    updateHighlightFactor1(false);
    updateHighlightFactor2(false);
    updateHighlightFactor3(false);
    updateHighlightFactor4(false);
    updateHighlightFactor5(false);
    updateHighlightFactor6(false);
    updateHighlightFactor7(false);
    updateHighlightFactor8(false);

    resetSection6('output');
    updateOutputForDataViz2([]);
    updateDistStateLowerValueText(distStateLowerValueText);
    updateUserSelectedDistStateSigLevel2(value);
  };

  const sigOptionsSliced = sigOptions.slice(sliceValueDistStateSigLevelDrop1);

  if (!showOutputFactorSelection) return null;

  return (
    <div className="flex items-baseline mt-[10px]">
      <span className="text-[25px] mr-[5px]">
        {`${t('Set distinguishing statements threshold 2')}:`}
      </span>
      <select
        onChange={handleChange}
        defaultValue={sigDropdownValue2}
        className="text-[24px] h-[36px] w-[160px] border border-[#d6dbe0] pl-[15px] bg-[#d6dbe0] rounded-[4px]"
      >
        {sigOptionsSliced}
      </select>
    </div>
  );
};

export default SigLevelDropdown2;

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
