import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StructViz from './StructViz';
import styled from 'styled-components';
import './react-tabs.css';
import structureState from '../GlobalState/structureState';
import ForceGraph from '../Correlations/ForceDirectedGraph/ForceDirectedGraph';
import correlationState from '../GlobalState/correlationState';

const Structure = () => {
  // const [activeTab, setActiveTab] = useState(0);
  const structureTabActive = structureState((state) => state.structureTabActive);
  const updateStructureTabActive = structureState((state) => state.updateStructureTabActive);
  const corelationDataPos = correlationState((state) => state.forcedGraphDataPos);
  const corelationDataNeg = correlationState((state) => state.forcedGraphDataNeg);
  const corelationDataAll = correlationState((state) => state.forcedGraphDataAll);
  const linkFilter = correlationState((state) => state.linkFilter);
  const correlationThreshold = correlationState((state) => state.correlationThreshold);
  const factorIndices = correlationState((state) => state.factorIndices);

  let forcedGraphData;
  if (linkFilter === 'positive') {
    forcedGraphData = corelationDataPos;
  } else if (linkFilter === 'negative') {
    forcedGraphData = corelationDataNeg;
  } else {
    forcedGraphData = corelationDataAll;
  }

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
    {
      title: 'Factor Characteristics',
      content: <h2>Some Correlations</h2>,
    },
    {
      title: 'Influencers',
      content: <h2>Some influencers data</h2>,
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
      <div className="tabs tabs-box flex bg-[#d6dbe0] h-[100%] rounded-none">
        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${structureTabActive === 'tab1' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[0].title}
          onClick={() => updateStructureTabActive('tab1')}
        />

        <div className="tab-content bg-base-100 border-base-300 p-4">{tabs[0].content}</div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${structureTabActive === 'tab2' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[1].title}
          onClick={() => updateStructureTabActive('tab2')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[1].content}
        </div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${structureTabActive === 'tab3' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[2].title}
          onClick={() => updateStructureTabActive('tab3')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[2].content}
        </div>

        <input
          type="radio"
          name="my_tabs_Corr"
          className={`tab basis-[12vw] hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${structureTabActive === 'tab4' ? 'tab-active bg-[#a5d6a7]' : 'bg-[#d6dbe0]'}`}
          aria-label={tabs[3].title}
          onClick={() => updateStructureTabActive('tab4')}
        />

        <div className="tab-content box-border overflow-auto bg-base-100 border-base-300 p-6">
          {tabs[3].content}
        </div>
      </div>
    </div>
  );
};

export default Structure;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d6dbe0;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 5px;
  background-color: #d6dbe0;
`;
