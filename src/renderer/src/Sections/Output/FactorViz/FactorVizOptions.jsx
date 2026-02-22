import DownloadsPanel from './DownloadsPanel';
import CardSettingsPanel from './CardSettingsPanel';
import DistinguishingPanel from './DistinguishingPanel';
import GeneralOptionsPanel from './GeneralOptionsPanel';
import StatementsSettingsPanel from './StatementsSettingsPanel';
import outputState from '../../GlobalState/outputState';

const FactorVizOptions = () => {
  const shouldDisplayFactorVizOptions = outputState((state) => state.shouldDisplayFactorVizOptions);
  return (
    <div className={`${shouldDisplayFactorVizOptions ? 'visible' : 'hidden'}`}>
      <div className="FactorVizDiv w-[90%] max-w-[920px] h-[1100px] border-[2px] border-[#666] p-[20px] ml-[20px]!">
        <GeneralOptionsPanel />
        <CardSettingsPanel />
        <StatementsSettingsPanel />
        <DistinguishingPanel />
        <DownloadsPanel />
      </div>
    </div>
  );
};

export default FactorVizOptions;
