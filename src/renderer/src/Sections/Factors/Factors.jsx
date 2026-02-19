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
// import ResetAnalysisButton from './ResetAnalysisButton';
// import PcaButton from './factorSelection/ExtractPrinCompButton';
// import RevealCentroidTypeSelectionButton from './RevealCentroidTypeSelectionButton';

const Factors = () => {
  const { t } = useTranslation();

  const showCentroidError = factorState((state) => state.showCentroidError);
  const showCorrelationMatrix = correlationState((state) => state.showCorrelationMatrix);

  // const tabs = [
  //   { title: t('Centroid Factors'), content: (
  //   <CentroidSelection />
  //   <UseHorstAutoStop />
  //   <InputHorstCutoffsNoLimit />
  //   <SelectNumberOfCentroidFactorsButtons />
  //   <InputHorstCutoffs />
  //   <HeywoodCaseNotification />
  //   <UnrotatedFactorsTransitionContainer />) },
  //   { title: t('Correlation Matrix'), content: <CorrelationMatrix /> },
  // ];

  return (
    <div className="flex flex-col overflow-auto p-[5px] pt-[15px] px-[15px] font-[Helvetica,sans-serif] text-[18px] bg-white box-border select-none animate-fadeIn">
      {showCorrelationMatrix ? (
        <TypeOfAnalysisTransitionContainer style={{ gridArea: 'row1' }} />
      ) : (
        <div className="text-[22px]">{t('Calculate correlations first')}</div>
      )}
      <CentroidSelection />
      <UseHorstAutoStop />
      <InputHorstCutoffsNoLimit />
      <SelectNumberOfCentroidFactorsButtons />
      <InputHorstCutoffs />
      <HeywoodCaseNotification />
      <UnrotatedFactorsTransitionContainer />
      {showCentroidError ? <ErrorNotification /> : null}
    </div>
  );
};

export default Factors;
