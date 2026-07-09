import ResetAnalysisButton from './ResetAnalysisButton';
import PcaButton from './factorSelection/ExtractPrinCompButton';
import RevealCentroidTypeSelectionButton from './RevealCentroidTypeSelectionButton';

const TypeOfAnalysisTransitionContainer = () => {
  return (
    <div className="flex flex-col max-w-[98%] justify-start  h-25">
      <div className="flex flex-row mb-4 ml-5">
        <RevealCentroidTypeSelectionButton />
        <PcaButton />
        <ResetAnalysisButton />
      </div>
      <div className="border-b-2 border-grey-button w-full h-px" />
    </div>
  );
};

export default TypeOfAnalysisTransitionContainer;
