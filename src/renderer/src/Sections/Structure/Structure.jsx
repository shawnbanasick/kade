import { useEffect } from 'react';
import StructViz from './StructViz';
import structureState from '../GlobalState/structureState';
import ForceGraph from '../Correlations/ForceDirectedGraph/ForceDirectedGraph';
import correlationState from '../GlobalState/correlationState';
import appState from '../GlobalState/appState';

const Structure = () => {
  const structureTabActive = structureState((state) => state.structureTabActive);
  const updateStructureTabActive = structureState((state) => state.updateStructureTabActive);
  const corelationDataPos = correlationState((state) => state.forcedGraphDataPos);
  const corelationDataNeg = correlationState((state) => state.forcedGraphDataNeg);
  const corelationDataAll = correlationState((state) => state.forcedGraphDataAll);
  const linkFilter = correlationState((state) => state.linkFilter);
  const correlationThreshold = correlationState((state) => state.correlationThreshold);
  const factorIndices = correlationState((state) => state.factorIndices);
  const updateIsStructureButtonGreen = appState((state) => state.updateIsStructureButtonGreen);

  let forcedGraphData;
  if (linkFilter === 'positive') {
    forcedGraphData = corelationDataPos;
  } else if (linkFilter === 'negative') {
    forcedGraphData = corelationDataNeg;
  } else {
    forcedGraphData = corelationDataAll;
  }

  useEffect(() => {
    updateIsStructureButtonGreen(true);
  }, []);

  const tabs = [
    {
      title: 'Heirarchy',
      content: <StructViz />,
    },
    {
      title: 'Network',
      content: (
        <ForceGraph
          data={forcedGraphData}
          correlationThreshold={correlationThreshold}
          factorIndices={factorIndices}
        />
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
        text-black
      `}
    >
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100%] rounded-none">
        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] ${structureTabActive === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => updateStructureTabActive('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-4">{tabs[1].content}</div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] text-[clamp(1rem,1.5vw,1.1rem)] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] ${structureTabActive === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => updateStructureTabActive('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-4 pb-0">
          {tabs[0].content}
        </div>
      </div>
    </div>
  );
};

export default Structure;
