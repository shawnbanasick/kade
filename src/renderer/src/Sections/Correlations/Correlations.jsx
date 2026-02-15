import CorrelationTable from './CorrelationTable/CorrelationTable';
import CalculateCorrelationsButton from './CalculateCorrelationsButton';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import { useTranslation } from 'react-i18next';
import correlationState from '../GlobalState/correlationState';
import appState from '../GlobalState/appState';
import coreState from '../GlobalState/coreState';
import HeatmapMain from './HeatmapMain';
import ForceGraph from './ForceDirectedGraph/ForceDirectedGraph';
import ForceGraphDataSelectRadio from './ForceDirectedGraph/ForceGraphDataSelectRadio';
import DebouncedNumberInput from './ForceDirectedGraph/ForceGraphCorrLimitInput';
import PcaScenarios from './ForceDirectedGraph/PcaScenarios';

const Correlations = () => {
  const { t } = useTranslation();

  // const qSortPattern = coreState((state) => state.qSortPattern);
  const showCorrelationMatrix = correlationState((state) => state.showCorrelationMatrix);
  const hasDataBeenConfirmed = appState((state) => state.hasDataBeenConfirmed);
  const correlationTabActive = correlationState((state) => state.correlationTabActive);
  const updateCorrelationTabActive = correlationState((state) => state.updateCorrelationTabActive);
  const numQsorts = coreState((state) => state.numQsorts);
  const corelationDataPos = correlationState((state) => state.forcedGraphDataPos);
  const corelationDataNeg = correlationState((state) => state.forcedGraphDataNeg);
  const corelationDataAll = correlationState((state) => state.forcedGraphDataAll);
  const linkFilter = correlationState((state) => state.linkFilter);
  const correlationThreshold = correlationState((state) => state.correlationThreshold);
  const factorIndices = correlationState((state) => state.factorIndices);
  let pcaFilter = correlationState((state) => state.pcaFilter) || 0;

  // Handler for tab clicks
  const handleTabClick = (tabId) => {
    updateCorrelationTabActive(tabId);
  };

  let forcedGraphData;
  if (linkFilter === 'positive') {
    forcedGraphData = corelationDataPos;
  } else if (linkFilter === 'negative') {
    forcedGraphData = corelationDataNeg;
  } else {
    forcedGraphData = corelationDataAll;
  }

  // ${props.view ? 'animate-fade-out' : 'animate-fade-in'}

  const MainContent = () => {
    return (
      <div
        className={`grid grid-cols-1 grid-rows-[70px_1fr] pl-5 justify-items-start items-center bg-white   overflow-auto select-none transition-all duration-500 linear `}
        style={{
          gridTemplateAreas: `'header header header' 'main main main' 'footer footer footer'`,
        }}
      >
        <div className="justify-self-start" style={{ gridArea: 'header' }}>
          {hasDataBeenConfirmed ? (
            <CalculateCorrelationsButton />
          ) : (
            <div className="mt-[50px] ml-5 text-[22px] pt-[60px]">
              {t("Verify Q sorts in section '2. Data'")}
            </div>
          )}
        </div>
        <div className="justify-self-start" style={{ gridArea: 'main' }}>
          {showCorrelationMatrix ? (
            <CorrelationTable />
          ) : (
            <div className="mt-[50px] ml-5 text-[22px] pt-[60px]">
              {t('No correlations calculated')}
            </div>
          )}
        </div>
        <ErrorNotification />
      </div>
    );
  };

  const tabs = [
    {
      title: t('Matrix'),
      content: (
        <div>
          <MainContent />,
        </div>
      ),
    },
    {
      title: t('Heatmap'),
      content: (
        <div>
          <div className="flex w-[500px] ml-[150px] text-4xl">{`${t('Correlation Heatmap')}`}</div>
          <HeatmapMain
            width={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
            height={numQsorts < 20 ? numQsorts * 60 : numQsorts * 40}
          />
        </div>
      ),
    },
    {
      title: t('Network'),
      content: (
        <div>
          <div className="flex w-[calc(85vw-30px)]  text-basis h-[70px]">
            <DebouncedNumberInput
              value={correlationThreshold}
              label="Correlation Threshold"
              min={0}
              max={1}
              step={0.01}
              debounceMs={500}
            />
            <ForceGraphDataSelectRadio />
            <PcaScenarios />
          </div>
          <ForceGraph
            data={forcedGraphData}
            correlationThreshold={correlationThreshold}
            factorIndices={factorIndices}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`
        bg-white
        w-full
        box-border
        overflow-auto
        h-full
        transition-[visibility,opacity]
        duration-500
      `}
    >
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100%] rounded-tl-none">
        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${correlationTabActive === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => handleTabClick('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${correlationTabActive === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => handleTabClick('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[1].content}
        </div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${correlationTabActive === 'tab3' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[2].title}
          onClick={() => handleTabClick('tab3')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[2].content}
        </div>
      </div>
    </div>
  );
};

export default Correlations;
