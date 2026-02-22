import { useTranslation } from 'react-i18next';
import HorstNumberInput from './HorstNumberInput';
import factorState from '../../GlobalState/factorState';

const InputHorstCutoffsNoLimit = () => {
  const { t } = useTranslation();

  const showHorstIterationLimit = factorState((state) => state.showHorstIterationLimit);
  const horstIterations = factorState((state) => state.horstIterations);

  if (!showHorstIterationLimit) return null;

  return (
    <div className="flex flex-row mt-[25px] ml-[70px] justify-start items-center">
      <span className="mr-[10px] w-[220px]">{`${t('Number of Iterations')}:  `}</span>
      <HorstNumberInput
        style={{ width: 100 }}
        name={'horstIterations'}
        value={horstIterations}
        lowerLimit={1}
        upperLimit={10000}
      />
    </div>
  );
};

export default InputHorstCutoffsNoLimit;
