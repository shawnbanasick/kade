import ResetAnalysisButton from './ResetAnalysisButton';
import PcaButton from './factorSelection/ExtractPrinCompButton';
import RevealCentroidTypeSelectionButton from './RevealCentroidTypeSelectionButton';

const TypeOfAnalysisTransitionContainer = () => {
  return (
    <div className="flex max-w-[1125px] justify-start ml-[70px]">
      <RevealCentroidTypeSelectionButton />
      <PcaButton />
      <ResetAnalysisButton />
    </div>
  );
};

export default TypeOfAnalysisTransitionContainer;
