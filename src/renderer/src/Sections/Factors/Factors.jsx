import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import TypeOfAnalysisTransitionContainer from './TypeOfAnalysisTransitionContainer';
import UnrotatedFactorsTransitionContainer from './UnrotatedFactorsTransitionContainer';
import CentroidSelection from './CentroidSelection';
import SelectNumberOfCentroidFactorsButtons from './SelectNumberOfCentroidFactorsButtons';
import UseHorstAutoStop from './factorSelection/UseHorstAutoStop';
import { useTranslation } from 'react-i18next';
import InputHorstCutoffs from './factorSelection/InputHorstCutoffs';
import HeywoodCaseNotification from './factorSelection/HeywoodCaseNotification';
import InputHorstCutoffsNoLimit from './factorSelection/InputHorstCutoffsNoLimit';
import correlationState from '../GlobalState/correlationState';
import factorState from '../GlobalState/factorState';

const Factors = () => {
  const { t } = useTranslation();

  const showCentroidError = factorState((state) => state.showCentroidError);

  return (
    <div className="flex flex-col  border-5 border-t-18 border-grey-button w-full h-full text-black  p-[5px] pt-[15px] px-[15px] font-[Helvetica,sans-serif] text-[18px] bg-white box-border select-none animate-fadeIn">
      <TypeOfAnalysisTransitionContainer />
      <div className="flex flex-col overflow-auto">
        <CentroidSelection />
        <UseHorstAutoStop />
        <InputHorstCutoffsNoLimit />
        <SelectNumberOfCentroidFactorsButtons />
        <InputHorstCutoffs />
        <HeywoodCaseNotification />
        <UnrotatedFactorsTransitionContainer />
        {showCentroidError ? <ErrorNotification /> : null}
      </div>
    </div>
  );
};

export default Factors;
