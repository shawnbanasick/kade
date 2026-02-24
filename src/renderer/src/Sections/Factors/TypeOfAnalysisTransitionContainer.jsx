import ResetAnalysisButton from './ResetAnalysisButton';
import PcaButton from './factorSelection/ExtractPrinCompButton';
import RevealCentroidTypeSelectionButton from './RevealCentroidTypeSelectionButton';

const TypeOfAnalysisTransitionContainer = () => {
  return (
    <div className="flex flex-col max-w-[90%] justify-start ml-[70px]  h-[150px]">
      <div className="flex flex-row mb-5">
        <RevealCentroidTypeSelectionButton />
        <PcaButton />
        <ResetAnalysisButton />
      </div>
      <div className="border-b-2 border-grey-button w-full h-[1px]" />
    </div>
  );
};

export default TypeOfAnalysisTransitionContainer;
