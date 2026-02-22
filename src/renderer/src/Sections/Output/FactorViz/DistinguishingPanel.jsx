import { useState } from 'react';
import UserNumberInput from './UserNumberInput';
import ColorSelector from './ColorSelector2';
import UserSelectionSwitch from './UserSelectionSwitch';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';

const radioOptions = [
  { label: 'Symbol', value: 'symbol' },
  { label: null, value: 'distinguishingColor' }, // label set dynamically below
];

const DistinguishingPanel = () => {
  const { t } = useTranslation();
  const colorTrans = `${t('Color')} - 05:`;
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );

  const [showDistinguishingAs, setShowDistinguishingAs] = useState('symbol');

  const handleChange = (value) => {
    setShowDistinguishingAs(value);
    factorVizOptionsHolder.showDistinguishingAs = value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('bg-[orange]');
  };

  const radioOptions = [
    { label: t('Symbol'), value: 'symbol' },
    { label: colorTrans, value: 'distinguishingColor' },
  ];

  return (
    <div className="mt-[30px]">
      <span className="text-[22px] select-none">
        {t('Distinguishing and Consensus Statements')}
      </span>
      <hr className="w-full mb-[5px]" />

      {/* Row 13 */}
      <div className="flex items-center mb-3 pl-[10px]">
        <div className="text-[16px] select-none">{`13. ${t('Indicate distinguishing')}?`}</div>
        <UserSelectionSwitch
          name="willIndicateDistinguishing"
          value="willIndicateDistinguishing"
          toggle
        />
        <div className="flex mt-[15px] mr-[5px] text-[16px] select-none text-center items-center">
          <span>{t('with')}</span>
          {radioOptions.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 ml-4 cursor-pointer text-[16px]">
              <input
                type="radio"
                name="radioGroup1"
                value={value}
                checked={showDistinguishingAs === value}
                onChange={() => handleChange(value)}
                className="radio radio-sm"
              />
              <span className="pt-[3px]">{label}</span>
            </label>
          ))}
        </div>
        <ColorSelector
          id="distinguishingIndicator05"
          className="ml-[5px]"
          defaultColor={'#ededed'}
        />
        <div className="text-[16px] select-none ml-[5px] mr-[5px]">01:</div>
        <ColorSelector
          id="distinguishingIndicator01"
          className="ml-[5px]"
          defaultColor={'#bdbdbd'}
        />
      </div>

      {/* Row 14 sub */}
      <div className="flex items-center mb-3 pl-[10px]">
        <div className="text-[16px] select-none pl-[10px]">
          {`-- ${t('Adjust distinguishing statement indicator size')}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustDistIndicatorSize"
          value="willAdjustDistIndicatorSize"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={'willAdjustDistIndicatorSizeBy'}
            lowerLimit={1}
            upperLimit={200}
            value={12}
            step={0.5}
          />
        </div>
      </div>

      {/* Row 14 */}
      <div className="flex items-center mb-3 pl-[10px]">
        <div className="text-[16px] select-none">
          {`14. ${t('Display consensus statement indicator color')}?`}
        </div>
        <UserSelectionSwitch
          name="willDisplayConsensusStates"
          value="willDisplayConsensusStates"
          toggle={false}
        />
        <div className="text-[16px] select-none mr-[10px]">{`${t('Color')}: `}</div>
        <ColorSelector id="consensusIndicator" defaultColor={'#d9effe'} />
      </div>
    </div>
  );
};

export default DistinguishingPanel;
